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
      <div  className ='flex-row repo-row1'>
        <h3 className = 'repo-name'>{item.name}</h3>
        <span className = 'language'>{item.language}</span>
      </div>
      <p className = 'repo-description repo-row2'>{item.description}</p>
      <div className ='flex-row repo-row3'>
        <span className = 'star-count'><i className ="fa fa-star" aria-hidden = "true"></i> {item.starCount}</span>
        <span className = 'forks-count'><i className = "fa fa-code-branch" aria-hidden= "true"></i> {item.forkCount}</span>
        <span className = 'date-created'>Created: {item.dateCreated}</span>
      </div>

      </div>
      <Modal
        isOpen = {modalIsOpen}
        contentLabel = 'Recent Commits'
        onRequestClose = {()=> setModalIsOpen(false)}
        appElement = {document.getElementById('app')}
        style = {{
          'overlay': {'background':'#a1a1a1'},
          'content': {'box-shadow': '0 4px 20px rgb(0 0 0 / 30%)', 'overflow': 'hidden', 'border': 'none', 'padding': '0', 'color':'black', 'width': '600px', 'font-family': 'Manrope', 'margin':'auto'} }}>
        <div className='modal-top'>
          <span className = 'close-icon' onClick= {()=> setModalIsOpen(false)}><i className = "far fa-times-circle"></i></span>
          <h2 className = 'modal-name'>Recent Commits for {item.name}</h2>
        </div>
        <div className = 'commit-list'>
          {commits.map((commit, i)=> <Commit key= {i} commit= {commit}/>)}
        </div>


        </Modal>
    </div>
    )

}

export default RepoListItem;


