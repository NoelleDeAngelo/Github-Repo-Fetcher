import React, {useState} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Commit from './Commit.jsx'



let RepoListItem = ({item})=>{

  const [commits, setCommits]= useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);


  let handleRepoClick =(owner, name)=> {
    axios.get('/commits', {params:{owner:owner, name:name}})
    .then((res)=>{setCommits(res.data); setModalIsOpen(true)} )
    .catch((err)=>{console.log(err)})
  }

    return (
    <div className = 'repo-list-item'>
      <div className = 'flex-column' onClick ={()=>handleRepoClick(item.owner, item.name)}>
      <div  className='flex-row repo-row1'>
        <h3 className = 'repo-name'>{item.name}</h3>
        <span className = 'language'>{item.language}</span>
      </div>
      <p className = 'repo-description repo-row2'>{item.description}</p>
      <div className='flex-row repo-row3'>
        <span className = 'star-count'>star count: {item.starCount}</span>
        <span className = 'forks-count'>forks: {item.forkCount}</span>
        <span className ='date-created'>Created: {item.dateCreated}</span>
      </div>

      </div>
      <Modal
        isOpen ={modalIsOpen}
        contentLabel = 'Recent Commits'
        onRequestClose= {()=> setModalIsOpen(false)}
        appElement={document.getElementById('app')}
        style={{
          'overlay': {'background':'grey'},
          'content': {'color':'black', 'width': '600px', 'margin':'auto'} }}>
        <span style={{'float': 'right', 'fontSize': '150%'}} onClick= {()=> setModalIsOpen(false)}>&#10006;</span>
        <h2>Recent Commits for {item.name}</h2>
        {commits.map((commit, i)=> <Commit key= {i} commit= {commit}/>)}
        </Modal>
    </div>
    )

}

export default RepoListItem;


