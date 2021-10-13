const axios = require('axios');
const config = require('../config.js');

let repoList;
let commitList;


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

  let anotherPage = true;

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
  repoList.sort((a,b)=> b.starCount - a.starCount)
  return repoList;
};


let addToRepoList = (item) => {
  let repo = {
    name:item.name,
    language: item.language,
    description: item.description,
    starCount: item.stargazers_count,
    forkCount: item.forks_count,
    dateCreated: new Date(item.created_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }),
    owner:item.owner.login
  };
  repoList.push(repo)
};


let getCommitsByRepo = async (owner, name)=>{
  commitList=[];

  let options = {
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
    },
    params:{
      'per_page':25,
    }
  };

  let anotherPage = true;

  await axios.get(`https://api.github.com/repos/${owner}/${name}/commits`, options)
    .then((res)=> {
        res.data.forEach((item)=>addToCommitList(item));
      })
      .catch((err)=> console.log(err));
  return commitList;
};


let addToCommitList = (item) => {
  let commit = {
    title:item.commit.message,
    committer:item.commit.author.name,
    dateCreated:  new Date(item.commit.author.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric' }),
    commitHash:item.sha

  };
  commitList.push(commit);
};



module.exports = {
  getReposByOrg:getReposByOrg,
  getCommitsByRepo:getCommitsByRepo
}