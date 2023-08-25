<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>URL</th>
            <th>Language</th>
            <th>Description</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="repo in repos" v-bind:key="repo.id">
            <td>{{ repo.id }}</td>
            <td>{{ repo.name }}</td>
            <td>
              <a v-bind:href="repo.html_url">{{ repo.html_url }} </a>
            </td>
            <td>{{ repo.language }}</td>
            <td>{{ repo.description }}</td>
            <td>{{ repo.owner.login }}</td>
            <td>
              <v-btn small @click="emitShowCommits(repo.name)"> Commits </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import "@/styles/repository.css";
import axios from "axios";
import { loadConfig } from "@/services/ConfigLoader.js";

export default {
  name: "Repository",
  data() {
    return {
      repos: [],
      currentRepoName: null,
      config: null,
    };
  },
  watch: {
    repoName: "fetchData",
    currentBranch: "fetchData",
  },
  async created() {
    this.config = await loadConfig();
    console.log(this.config?.repository);
    axios.get(this.config?.repository).then((response) => {
      this.repos = response.data;
    });
  },
  methods: {
    emitShowCommits(repoName) {
      this.$emit("showCommits", repoName);
    },
  },
};
</script>
