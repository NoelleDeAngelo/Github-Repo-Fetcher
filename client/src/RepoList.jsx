import React from 'react';
import RepoListItem from './RepoListItem.jsx'




let RepoList = ({repos, org})=>{



    return (
    <div className= 'repo-section'>
      {repos.length? <h2 id= 'repo-num'>{org} has {repos.length} repositories. </h2>: null}
      {repos.map((repo, i)=> <RepoListItem  key= {i} item ={repo}/>)}
    </div>
    )

}

export default RepoList;
