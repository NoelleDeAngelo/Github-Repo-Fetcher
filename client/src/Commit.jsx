import React from 'react';

let Commit = ({commit})=>{

  return (
    <div className = 'commit-list-item flex-column'>
      <h3 className = 'commit-title'>{commit.title}</h3>
      <div className = ' commit-row2 flex-row'>
        <span>By: {commit.committer}</span>
        <span>{commit.dateCreated}</span>
      </div>
      <span className = 'hash'>Commit: {commit.commitHash}</span>
    </div>
  )
}

export default Commit;