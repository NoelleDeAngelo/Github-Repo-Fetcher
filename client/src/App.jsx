import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';



class App extends React.Component {
  constructor(props) {
    super(props);

  }

  handleSearch () {
    axios.get('/repos')
    .then((res)=>{console.log(res.data)})
    .catch((err)=>{console.log(err)})
  }

  render () {
    return (<div>
      <h1>Github Repo Fetcher</h1>
      <label>Look at Repos for:<input  name= 'org-name' type = 'text'></input></label>
      <button onClick= {()=>{this.handleSearch()}}>Search</button>
    </div>)
  }
}


ReactDOM.render(<App />, document.getElementById('app'));