<template>
  <div id="app">
      <Repository msg="My GitHub repositories" />
  </div>
</template>

<script>
import Repository from "./components/Repository.vue";
import Commits from "./components/Commits.vue";

export default {
  name: "App",
  components: {
    Repository
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
footer {
  text-align: center;
  padding: 3px;
  background-color: rgb(29, 28, 28);
  color: white;
  height: 50px;
  width: 100%;
}
.leftpic {
  float: left;
  margin: 0 0 5px 5px;
}
</style>
