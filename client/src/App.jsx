import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import RepoList from './RepoList.jsx'



let App = ()=>{
  const [org, setOrg]= useState('');
  const [repos, setRepos]= useState([]);
  const [searchFor, setSearchFor]= useState('');
  const [possibleOrgs, setPossibleOrgs]= useState([]);


  let handleGetRepos = () => {
    setPossibleOrgs([]);
    setSearchFor('');
    axios.get('/repos', {params:{org:org}})
    .then((res)=>{setRepos(res.data)})
    .catch((err)=>{console.log(err)})
  }

  let handleSearchInput = (e)=> {
    setSearchFor(e.target.value)
    setOrg(e.target.value)
    axios.get('/orgs', {params:{orgName:e.target.value}})
    .then((res)=> {
        setPossibleOrgs(res.data);
      })
      .catch((err)=> console.log(err));

  }


    return (
    <div>
      <h1>Github Repo Fetcher</h1>
      <label>Fetch Repositories for:<input  id = 'org-name' type = 'text' value = {searchFor} onChange = {(e)=>{handleSearchInput(e)}}></input></label>
      <button onClick= {handleGetRepos}>Get Repositories</button>
      <button onClick = {()=> console.log(org)}>check</button>
      {possibleOrgs.map(possOrg=> (<span onClick={()=> {setSearchFor(possOrg); setOrg(possOrg)}}>{possOrg}</span>))}
      <RepoList  org = {org} repos= {repos}/>
    </div>
    )

}


ReactDOM.render(<App />, document.getElementById('app'));