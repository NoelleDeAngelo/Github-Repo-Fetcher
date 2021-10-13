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


let getReposByOrg = async (org) => {

  repoList=[];

  let options = {
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
    },
    params:{
      'per_page':100,
       'page': 1
    }
  };

  let anotherPage=true;

  while(anotherPage){
    await axios.get(`https://api.github.com/orgs/${org}/repos`, options)
      .then((res)=> {
        if(res.headers.link){
        res.data.forEach((item)=>addToRepoList(item));
        if (res.headers.link.indexOf('>; rel="next"')===-1){
        anotherPage=false;
        }
        options.params.page++
        } else {
          res.data.forEach((item)=>addToRepoList(item));
          anotherPage= false;
        }


      })
    .catch((err)=> console.log(err));

  }

  return repoList;
}

module.exports.getReposByOrg = getReposByOrg;