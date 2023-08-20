<template>
  <div>
    <input
      type="radio"
      :id="branch"
      :value="branch"
      name="branch"
      v-model="currentBranch"
    />
    <label :for="branch">{{ branch }}</label>
    <p>vuejs/vue-router@{{ currentBranch }}</p>
    <ul>
      <li v-for="record in commits" :key="record.sha">
        <a :href="record.html_url" target="_blank" class="commit">
          {{ record.sha.slice(0, 7) }}
        </a>
        - <span class="message">{{ record.commit.message | truncate }}</span
        ><br />
        by
        <span class="author">
          <a :href="record.author.html_url" target="_blank">{{
            record.commit.author.name
          }}</a>
        </span>
        at
        <span class="date">{{ record.commit.author.date | formatDate }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

var apiURL =
  "https://api.github.com/repos/vuejs/vue-router/commits?per_page=3&sha=";

export default {
  name: "Commits",
  data() {
    return {
      branches: ["master", "dev"],
      currentBranch: "master",
      commits: null,
    };
  },

  created: function () {
    this.fetchData();
  },

  watch: {
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
      axios
        .get(apiURL + this.currentBranch)
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
