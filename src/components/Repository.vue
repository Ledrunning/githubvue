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
              <v-btn small @click="showCommits(repo.name)"> Commits </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <Commits v-if="currentRepoName" :repo-name="currentRepoName" />
  </div>
</template>

<script>
import Commits from "@/components/Commits.vue";
import "@/styles/repository.css";
import axios from "axios";

export default {
  name: "Repository",
  components: {
    Commits,
  },
  data() {
    return {
      repos: null,
      currentRepoName: null,
    };
  },
  created: function () {
    axios
      .get("https://api.github.com/users/ledrunning/repos")
      .then((response) => {
        this.repos = response.data;
      });
  },
  methods: {
    showCommits(repoName) {
      console.log("showCommits method called with repoName:", repoName);
      this.currentRepoName = repoName;
    },
  },
};
</script>
