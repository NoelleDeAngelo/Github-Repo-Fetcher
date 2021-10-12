const axios = require('axios');
const config = require('../config.js');

let createRepoList = (repo) => {
console.log(repo.full_name)
}

let getReposByOrg = (org) => {


  let options = {
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  axios.get(`https://api.github.com/orgs/${org}/repos`, options)
  .then((res)=> {res.data.forEach((repo)=>createRepoList(repo))})
  .catch((err)=> console.log(err));
}

module.exports.getReposByOrg = getReposByOrg;