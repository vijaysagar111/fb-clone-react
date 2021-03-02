import React, { Component } from 'react'
import './Home.css'
import Register from './Register';
import Login from './Login';

class Home extends Component {
  render () {
    return (
      <div>
        <div className="container-fluid">
        <h2>Facebook</h2>
        <div className="row">
        <Register className />
        <Login />
</div>
          </div>
        
      </div>
    )
  }
}

export default Home;