<template>
  <div id="app">
    <Repository
      v-if="currentPage === 'repository'"
      @showCommits="showCommits"
    />
    <Commits
      v-else-if="currentPage === 'commits'"
      :repoName="currentRepoName"
      @showRepository="showRepository"
    />
  </div>
</template>

<script>
import "./styles/globalstyle.css";
import Repository from "./components/Repository.vue";
import Commits from "./components/Commits.vue";

export default {
  name: "App",
  components: {
    Repository,
    Commits,
  },
  data() {
    return {
      currentPage: "repository",
      currentRepoName: null,
    };
  },
  methods: {
    showCommits(repoName) {
      this.currentRepoName = repoName;
      this.currentPage = "commits";
    },
    showRepository() {
      this.currentPage = "repository";
    },
  },
};
</script>
