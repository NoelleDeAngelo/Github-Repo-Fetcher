import React, {useState} from 'react';
import axios from 'axios';



let RepoListItem = ({item})=>{

  const [commits, setCommits]= useState([])


  let handleRepoClick =(owner, name)=> {
    axios.get('/commits', {params:{owner:owner, name:name}})
    .then((res)=>{setCommits(res.data); console.log(res.data)})
    .catch((err)=>{console.log(err)})
  }

    return (
    <div onClick ={()=>handleRepoClick(item.owner, item.name)}className = 'repo-list-item'>
      <p className = 'repo-name'>{item.name}</p>
      <span className = 'language'>{item.language}</span>
      <p className = 'repo-description'>{item.description}</p>
      <span className = 'star-count'>star count: {item.starCount}</span>
      <span className = 'forks-count'>forks: {item.forkCount}</span>
      <span className ='date-created'>Created: {item.dateCreated}</span>
    </div>
    )

}

export default RepoListItem;


