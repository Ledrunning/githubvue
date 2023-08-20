<template>
  <div id="app">
    <Repository msg="My GitHub repositories" />
    <Commits msg="My commits" />
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
};
</script>
