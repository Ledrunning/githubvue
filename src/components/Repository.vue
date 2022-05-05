<template>
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
            <router-link>
              <v-btn small> Commits </v-btn>
            </router-link>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import axios from "axios";

export default {
  name: "Repository",
  data() {
    return {
      repos: null,
    };
  },
  created: function () {
    axios
      .get("https://api.github.com/users/ledrunning/repos")
      .then((response) => {
        this.repos = response.data;
      });
  },
};
</script>

<style>
body {
  font: 14px/1.8 "Poppins", sans-serif !important;
}
.table td,
.table th {
  padding: 20px !important;
}
</style>
