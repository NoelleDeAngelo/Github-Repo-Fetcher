const express = require('express');
const axios = require('axios');
let app = express();
let port = 3000;

app.use(express.static(__dirname + '/../client/dist'));

app.get('/repos', (req,res)=>{
  res.send('a list of repos')
})


app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

