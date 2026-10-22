<script setup>
import { ref, computed, onMounted } from "vue";
import { gh, ago, USER } from "../api.js";

const repos = ref([]);
const loading = ref(true);
const error = ref("");
const query = ref("");
const lang = ref("All");
const sort = ref("updated");
const showForks = ref(false);

onMounted(async () => {
  try {
    repos.value = await gh(`/users/${USER}/repos?per_page=100&sort=updated`);
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});

const visible = computed(() => repos.value.filter((r) => showForks.value || !r.fork));
const languages = computed(() => {
  const counts = {};
  visible.value.forEach((r) => r.language && (counts[r.language] = (counts[r.language] || 0) + 1));
  return ["All", ...Object.keys(counts).sort((a, b) => counts[b] - counts[a])];
});

const sorters = {
  updated: (a, b) => new Date(b.pushed_at) - new Date(a.pushed_at),
  stars: (a, b) => b.stargazers_count - a.stargazers_count,
  name: (a, b) => a.name.localeCompare(b.name),
};
const list = computed(() => {
  const q = query.value.trim().toLowerCase();
  return visible.value
    .filter((r) => lang.value === "All" || r.language === lang.value)
    .filter((r) => !q || `${r.name} ${r.description || ""}`.toLowerCase().includes(q))
    .sort(sorters[sort.value]);
});
</script>

<template>
  <h1>Repositories <small v-if="!loading && !error">{{ list.length }}</small></h1>

  <p v-if="loading" class="state">Loading repositories…</p>
  <p v-else-if="error" class="state err">{{ error }}</p>

  <template v-else>
    <div class="tools">
      <input v-model="query" type="search" placeholder="Search by name or description…"
        aria-label="Search repositories" />
      <select v-model="sort" aria-label="Sort by">
        <option value="updated">Recently updated</option>
        <option value="stars">Most stars</option>
        <option value="name">Name</option>
      </select>
      <label class="check"><input v-model="showForks" type="checkbox" /> Show forks</label>
    </div>

    <div class="chips">
      <button v-for="l in languages" :key="l" class="chip" :aria-pressed="lang === l" @click="lang = l">{{ l }}</button>
    </div>

    <p v-if="!list.length" class="state">Nothing found.</p>
    <div class="grid">
      <article v-for="r in list" :key="r.id" class="card">
        <a class="title" :href="`#/r/${encodeURIComponent(r.name)}`">{{ r.name }}</a>
        <p class="desc">{{ r.description || "No description" }}</p>
        <div class="meta">
          <span v-if="r.language" class="lang"><i class="dot"></i>{{ r.language }}</span>
          <span v-if="r.stargazers_count">★ {{ r.stargazers_count }}</span>
          <span>updated {{ ago(r.pushed_at) }}</span>
        </div>
        <div class="actions">
          <a :href="`#/r/${encodeURIComponent(r.name)}`">Commits →</a>
          <a :href="r.html_url" target="_blank" rel="noopener">GitHub ↗</a>
        </div>
      </article>
    </div>
  </template>
</template>
