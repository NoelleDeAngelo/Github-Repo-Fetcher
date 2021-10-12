import React from 'react';
import RepoListItem from './RepoListItem.jsx'

let RepoList = ({repos, org})=>{

    return (
    <div>
      <h1>RepoList</h1>
      {repos.length? <p>{org} has {repos.length} repositories. </p>: <p>No repositories found.</p>}
      <div>{repos.map((repo)=> <RepoListItem item ={repo}/>)}</div>
    </div>
    )

}

export default RepoList;
