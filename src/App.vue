<template>
  <div id="app">
    <Repository msg="My GitHub repositories" />
  </div>
</template>

<script>
import "./styles/globalstyle.css";
import Repository from "./components/Repository.vue";

export default {
  name: "App",
  components: {
    Repository,
  },
};
</script>
