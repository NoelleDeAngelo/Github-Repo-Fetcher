const express = require('express');
const axios = require('axios');
let app = express();
let port = 3000;
const github = require('../helpers/github.js')

app.use(express.static(__dirname + '/../client/dist'));

app.get('/repos', async (req,res)=>{
  let repos= await github.getReposByOrg('7seasllc')
  res.send(repos)
})

app.get('/commits', async (req,res)=>{
  let commits= await github.getCommitsByRepo(req.query.owner, req.query.name)
  res.send(commits)
})


app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

