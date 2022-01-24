<template>
  <div class="mb-6">
    <section class="hero is-medium is-primary is-bold mb-6">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">My GitHub Repositories</h1>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="table-container">
        <table class="table is-bordered is-stripped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>URL</th>
              <th>Language</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="repo in repos" v-bind:key="repo.id">
              <td>{{ repo.id }}</td>
              <td>{{ repo.name }}</td>
              <td>{{ repo.html_url }}</td>
              <td>{{ repo.language }}</td>
              <td>{{ repo.owner.login }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
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
