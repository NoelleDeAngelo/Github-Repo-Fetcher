import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/react";
import RepoList from './RepoList.jsx'




let App = ()=>{
  const [org, setOrg]= useState('');
  const [repos, setRepos]= useState([]);
  const [searchFor, setSearchFor]= useState('');
  const [possibleOrgs, setPossibleOrgs]= useState([]);
  const [loading, setLoading]= useState(false);


  let handleGetRepos = () => {
    setPossibleOrgs([]);
    setSearchFor('');
    setLoading(true);
    axios.get('/repos', {params:{org:org}})
    .then((res)=>{setRepos(res.data), setLoading(false)})
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
      {possibleOrgs.map((possOrg, i)=> (<span key= {i} onClick={()=> {setSearchFor(possOrg); setOrg(possOrg)}}>{possOrg}</span>))}
      {loading ? <PropagateLoader color = '#5dcfb4' loading={loading} size={30} css={css`display: block; margin: 20px 200px;`}/> : <RepoList  org = {org} repos= {repos}/>}

    </div>
    )

}


ReactDOM.render(<App />, document.getElementById('app'));