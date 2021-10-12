import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RepoList from './RepoList.jsx'



let App = ()=>{
  const [org, setOrg]= useState('NetFlix');
  const [repos, setRepos]= useState([])


  let handleSearch = () => {
    axios.get('/repos')
    .then((res)=>{setRepos(res.data)})
    .catch((err)=>{console.log(err)})
  }


    return (
    <div>
      <h1>Github Repo Fetcher</h1>
      <label>Look at Repos for:<input  id = 'org-name' type = 'text' value= 'NetFlix'></input></label>
      <button onClick= {handleSearch}>Search</button>
      <button onClick = {()=> console.log(repos)}>check</button>
      <RepoList  org = {org} repos= {repos}/>
    </div>
    )

}


ReactDOM.render(<App />, document.getElementById('app'));