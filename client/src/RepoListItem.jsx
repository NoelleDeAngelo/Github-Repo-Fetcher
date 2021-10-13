import React, {useState} from 'react';
import axios from 'axios';
import Modal from 'react-modal';



let RepoListItem = ({item})=>{

  const [commits, setCommits]= useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);


  let handleRepoClick =(owner, name)=> {
    console.log('clicked')
    axios.get('/commits', {params:{owner:owner, name:name}})
    .then((res)=>{setCommits(res.data); console.log(res.data); setModalIsOpen(true)} )
    .catch((err)=>{console.log(err)})
  }

    return (
    <div>
      <div onClick ={()=>handleRepoClick(item.owner, item.name)}className = 'repo-list-item'>
        <p className = 'repo-name'>{item.name}</p>
        <span className = 'language'>{item.language}</span>
        <p className = 'repo-description'>{item.description}</p>
        <span className = 'star-count'>star count: {item.starCount}</span>
        <span className = 'forks-count'>forks: {item.forkCount}</span>
        <span className ='date-created'>Created: {item.dateCreated}</span>
      </div>
      <Modal isOpen ={modalIsOpen}
        onRequestClose= {()=> setModalIsOpen(false)}
        style={{
          'overlay': {'background':'grey'},
          'content': {'color':'black', 'width': '450px', 'margin':'auto'} }}>
        <span style={{'float': 'right', 'fontSize': '150%'}} onClick= {()=> setModalIsOpen(false)}>&#10006;</span>
        </Modal>
    </div>
    )

}

export default RepoListItem;


