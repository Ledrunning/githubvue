# Vue.js Web Client for GitHub Repositories

This web client is built using Vue.js to display information about GitHub repositories, including repository details and recent commits.

## Features

- **Repository Information:** View details about each GitHub repository, including language, name, and description.

- **Commit History:** Explore the recent commits made to the repositories.

## Technologies Used

- **Vue.js:** The front-end of the web client is built using Vue.js, a progressive JavaScript framework.

- **GitHub API:** Repository information and commit history are fetched using the GitHub API.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

  ## UI Layouts
  
  ![](githubVue.gif)

## Configure URLs

Change the following lines in the **/public/config.json** file for your or needed URLs:  

```
{
    "repository": "https://api.github.com/users/ledrunning/repos",
    "commits": "https://api.github.com/repos/Ledrunning"
}
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
