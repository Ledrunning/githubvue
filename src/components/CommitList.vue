<script setup>
import { ref, watch } from "vue";
import { gh, ago, USER } from "../api.js";

const props = defineProps({ name: { type: String, required: true } });

const repo = ref(null);
const branches = ref([]);
const branch = ref("");
const commits = ref([]);
const loading = ref(true);
const error = ref("");

async function loadRepo() {
  loading.value = true;
  error.value = "";
  commits.value = [];
  try {
    const base = `/repos/${USER}/${encodeURIComponent(props.name)}`;
    const [r, b] = await Promise.all([gh(base), gh(`${base}/branches?per_page=100`)]);
    repo.value = r;
    branches.value = b.map((x) => x.name);
    // Use the repo's real default branch instead of a hard-coded "master"
    if (branch.value === r.default_branch) await loadCommits();
    else branch.value = r.default_branch;
  } catch (e) {
    error.value = e.message;
    loading.value = false;
  }
}

async function loadCommits() {
  if (!branch.value) return;
  loading.value = true;
  error.value = "";
  try {
    const url = `/repos/${USER}/${encodeURIComponent(props.name)}/commits?sha=${encodeURIComponent(branch.value)}&per_page=30`;
    commits.value = await gh(url);
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}

const firstLine = (m) => m.split("\n")[0];

watch(() => props.name, () => { branch.value = ""; loadRepo(); }, { immediate: true });
watch(branch, loadCommits);
</script>

<template>
  <a class="back" href="#/">← All repositories</a>
  <h1>{{ name }}</h1>
  <p v-if="repo?.description" class="desc lead">{{ repo.description }}</p>

  <div class="tools" v-if="branches.length">
    <label class="check">Branch
      <select v-model="branch" aria-label="Branch">
        <option v-for="b in branches" :key="b" :value="b">{{ b }}</option>
      </select>
    </label>
    <a v-if="repo" class="ext" :href="repo.html_url" target="_blank" rel="noopener">Open on GitHub ↗</a>
  </div>

  <p v-if="loading" class="state">Loading commits…</p>
  <p v-else-if="error" class="state err">{{ error }}</p>

  <ol v-else class="commits">
    <li v-for="c in commits" :key="c.sha">
      <div class="msg">{{ firstLine(c.commit.message) }}</div>
      <div class="meta">
        <a :href="c.html_url" target="_blank" rel="noopener" class="sha">{{ c.sha.slice(0, 7) }}</a>
        <!-- c.author is null when the commit email isn't linked to a GitHub account -->
        <a v-if="c.author" :href="c.author.html_url" target="_blank" rel="noopener">{{ c.commit.author.name }}</a>
        <span v-else>{{ c.commit.author.name }}</span>
        <span>{{ ago(c.commit.author.date) }}</span>
      </div>
    </li>
  </ol>
</template>
