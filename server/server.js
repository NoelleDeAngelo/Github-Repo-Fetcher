const express = require('express');
const axios = require('axios');
let app = express();
let port = 3000;
const github = require('../helpers/github.js')

app.use(express.static(__dirname + '/../client/dist'));

app.get('/repos', (req,res)=>{
  github.getReposByOrg('NetFlix')
  res.send('a list of repos')
})


app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

