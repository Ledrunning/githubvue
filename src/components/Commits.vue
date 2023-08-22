<template>
  <div>
    <div v-for="branch in branches" :key="branch">
      <input
        type="radio"
        :id="branch"
        :value="branch"
        name="branch"
        v-model="currentBranch"
      />
      <label :for="branch">{{ branch }}</label>
    </div>

    <p>{{ repo }}@{{ currentBranch }}</p>
    <ul>
      <li v-for="record in commits" :key="record.sha">
        <a :href="record.html_url" target="_blank" class="commit">
          {{ record.sha.slice(0, 7) }}
        </a>
        - <span class="message">{{ record.commit.message | truncate }}</span
        ><br />
        <span class="author">
          <a :href="record.author.html_url" target="_blank">{{
            record.commit.author.name
          }}</a>
        </span>
        <span class="date">{{ record.commit.author.date | formatDate }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Commits",
  props: ["repoName"],
  data() {
    return {
      branches: ["master", "dev"],
      currentBranch: "master",
      commits: null,
      repo: "default-repo-name",
    };
  },
  created: function () {
    console.log("Commits component created");
    this.fetchData();
  },
  watch: {
    repoName(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchData();
      }
    },
    currentBranch: "fetchData",
  },
  filters: {
    truncate: function (v) {
      var newline = v.indexOf("\n");
      return newline > 0 ? v.slice(0, newline) : v;
    },
    formatDate: function (v) {
      return v.replace(/T|Z/g, " ");
    },
  },
  methods: {
    fetchData: function () {
      var apiURL = `https://api.github.com/repos/Ledrunning/${this.repoName}/commits`;
      console.log("Fetching commits from URL:", apiURL);
      axios
        .get(apiURL)
        .then((response) => {
          this.commits = response.data;
        })
        .catch((error) => {
          console.error("Error fetching commits:", error);
        });
    },
  },
};
</script>
