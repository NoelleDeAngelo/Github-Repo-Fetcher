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


  let handleGetRepos = (inputOrg) => {
    setPossibleOrgs([]);
    setSearchFor('');
    setLoading(true);
    axios.get('/repos', {params:{org:inputOrg}})
    .then((res)=>{
      setRepos(res.data);
      setLoading(false);
    })
    .catch((err)=>{console.log(err)})
  }

  let handleSearchInput = (e)=> {
    let value= e.target.value
    setSearchFor(value)
    if (value.length > 1) {
       axios.get('/orgs', {params:{orgName:value}})
        .then((res)=> {
          setPossibleOrgs(res.data);
        })
        .catch((err)=> console.log(err));
    } else{
      setPossibleOrgs([])
    }
  }

  let handleKeyPress = (e)=>{
    if (e.key === 'Enter'){
      handleGetRepos(searchFor)
    }
  }



    return (
    <div className= 'app'>
      <h1 className= 'title'>Github Repo Fetcher</h1>
      <p className= 'tag-line'>Easily find and view Repositories from all of your favorite Github Orginizations</p>
      <div className= 'search-container'>
        <input placeholder= 'Find Repositories For...' id= 'search' className='search-input' onKeyPress= {handleKeyPress} type = 'text' value = {searchFor} onChange = {(e)=>{handleSearchInput(e)}}></input>
        <i onClick= {()=>{handleGetRepos(searchFor); setOrg(searchFor)}}className="fa fa-search" aria-hidden="true"></i>
      </div>
      <div className='poss-orgs-container'>
        {possibleOrgs.map((possOrg, i)=> (<p className='poss-orgs' key= {i} onClick={()=> { handleGetRepos(possOrg); setOrg(possOrg)}}>{possOrg}</p>))}
      </div>
      {loading ? <PropagateLoader color = '#5dcfb4' loading= {loading} size= {30} css= {css`display: block; margin: auto;`}/> : <RepoList org= {org} repos= {repos}/>}
    </div>
    )

}


ReactDOM.render(<App />, document.getElementById('app'));