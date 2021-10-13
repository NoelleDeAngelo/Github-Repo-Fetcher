import React from 'react';

let Commit = ({commit})=>{

  return (
    <div>
      <h3>{commit.title}</h3>
      <p>By: {commit.committer}</p>
      <span>{commit.dateCreated}</span>
      <span>{commit.commitHash}</span>
    </div>
  )
}

export default Commit;