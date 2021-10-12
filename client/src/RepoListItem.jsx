import React from 'react';

let RepoListItem = ({item})=>{
    return (
    <div className = 'repo-list-item'>
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


