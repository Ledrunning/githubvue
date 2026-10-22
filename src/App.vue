<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import RepoList from "./components/RepoList.vue";
import CommitList from "./components/CommitList.vue";
import logo from "./assets/logo.png";
import { USER } from "./api.js";

// Minimal hash routing: "#/r/<repo>" shows commits, anything else the list.
// The browser's back button works without pulling in vue-router.
const hash = ref(location.hash);
const onHash = () => (hash.value = location.hash);
onMounted(() => addEventListener("hashchange", onHash));
onBeforeUnmount(() => removeEventListener("hashchange", onHash));
const repoName = computed(() =>
  hash.value.startsWith("#/r/") ? decodeURIComponent(hash.value.slice(4)) : null
);

const theme = ref(document.documentElement.dataset.theme === "light" ? "light" : "dark");
function toggleTheme() {
  theme.value = theme.value === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = theme.value;
  try { localStorage.setItem("theme", theme.value); } catch { }
}
document.documentElement.dataset.theme = theme.value;
</script>

<template>
  <header class="bar">
    <div class="wrap bar-in">
      <a class="brand" href="#/"><img :src="logo" alt="" width="28" height="28" /><span>repos</span></a>
      <a class="user" :href="`https://github.com/${USER}`" target="_blank" rel="noopener">@{{ USER }}</a>
      <button class="btn" type="button" @click="toggleTheme"
        :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'">
        {{ theme === "dark" ? "☀ Light" : "☾ Dark" }}
      </button>
    </div>
  </header>
  <main class="wrap">
    <CommitList v-if="repoName" :name="repoName" />
    <RepoList v-else />
  </main>
</template>
