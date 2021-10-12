const axios = require('axios');
const config = require('../config.js');

let repoList=[];

let addToRepoList = (item) => {
  let repo = {
    name:item.name,
    language: item.language,
    description: item.description,
    starCount: item.stargazers_count,
    forkCount: item.forks_count,
    dateCreated: item.created_at
  };
  repoList.push(repo)
}

let getReposByOrg = (org) => {


  let options = {
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

 return axios.get(`https://api.github.com/orgs/${org}/repos`, options)
  .then((res)=> {
    repoList =[];
    res.data.forEach((item)=>addToRepoList(item));
    return repoList;
    })
  .catch((err)=> console.log(err));
}

module.exports.getReposByOrg = getReposByOrg;