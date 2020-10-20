import React from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
// import {useState,useEffect} from 'react';

class BranchManager extends React.Component{

  state = {
    ENDPOINT: 'http://localhost:3010',
    username: '',
    password: '',
  };
  
  componentDidMount(){
    console.log("here");
    const socket = socketIOClient(this.state.ENDPOINT);
    console.log("here",socket);
    socket.on('createmessage',(data)=>{
      console.log("here",data);
    });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password} = this.state;
    const credentials = {
      username,
      password,
    };
    const socket = socketIOClient(this.state.ENDPOINT);
    axios.post('http://localhost:3010/verify', credentials).then((res) => {
      
    });
  };

  inputValueHandler = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
      render(){
        const { username,password } = this.state;
        return(
            <div className="BranchManager">
                <form onSubmit={this.handleSubmit}>
                            <label>Username<input
                            type='text'
                            value={username}
                            onChange={this.inputValueHandler}
                            name='username'
                            /></label>
                             <label id="password">Password<input
                            type='text'
                            value={password}
                            onChange={this.inputValueHandler}
                            name='password'
                            /></label>
                             <div className="submit">
                            <input id="submit " type="submit" value="SUBMIT" />
                            </div>
                        </form>
            </div>
            );
      }
}

export default BranchManager