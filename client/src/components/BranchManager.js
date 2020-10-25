import React from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import Button from 'react-bootstrap/Button';

class BranchManager extends React.Component{

  state = {
    ENDPOINT: 'https://scavenger1.herokuapp.com/',
    username: '', 
    password: '',
    notifications_data:[],
    afterLogin:false,
    showInvalid:false,
    shownotifications:false,
    notifications_action_data:{},
    action:false
  };
  
  showNotifications = () => {
    this.setState({
      shownotifications: true,
    });
  };

  notificationAction = (obj) => {
    this.setState({
      notifications_action_data:obj,
      action:true
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password} = this.state;
    const credentials = {
      username,
      password,
    };
    axios.post('/verify', credentials).then((res) => {
      if(res.data[0].status=='Success'){ 
        this.setState({
          notifications_data:res.data[0].CData.reverse(),
          afterLogin:true
        })
        const socket = socketIOClient(this.state.ENDPOINT);
        socket.on('message', data => { 
        if(data[0].pincode==res.data[0].Pincode || res.data[0].Pincode_Covered.includes(data.pincode)){
          let x=this.state.notifications_data;
          x.unshift(data[0]);
          this.setState({           
            notifications_data:x
         });
        }
      });
      }
      else{
        this.setState({
          afterLogin:false,
          showInvalid:true,
        })
      }
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
        if(!this.state.afterLogin){
          return(
            <>
            <div className="BranchManager">
                <form onSubmit={this.handleSubmit}>
                            <label>Username<input
                            type='text'
                            value={username}
                            onChange={this.inputValueHandler}
                            name='username'
                            /></label>
                             <label id="password">Password<input
                            type='password'
                            value={password}
                            onChange={this.inputValueHandler}
                            name='password'
                            /></label>
                             <div className="submit">
                            <input id="submit " type="submit" value="SUBMIT" />
                            </div>
                        </form>
            </div>
            {this.state.showInvalid ? (
            <div className="">
              Invalid Credentials! Please try again.
            </div>
          ) : null}
            </>
            );
        }
        else if(this.state.afterLogin){
          return(
            <>
          <div className='mainBranch'>
            <h3>Hi Branch Manager</h3>
            <div className='notifications'><Button
              variant='primary'
              onClick={this.showNotifications}
            >
              Notifications
            </Button></div>
          </div>
          {this.state.shownotifications ? (
            <div className="notifications notificationsmain">
              {this.state.notifications_data.map((obj, i) => {
                return <li className="notificationsList" onClick={() => this.notificationAction(obj)} key={i}>A customer was searching for your branch on {obj.date}.You can contact him in this number-{obj.contact}</li>;
              })}
            </div>
          ) : null}
           {this.state.action ? (
            <div className="notificationaction">
              You can call the customer in the given number and provide more details.
            </div>
          ) : null}
        </>
          );
          
        }
        
      }
}

export default BranchManager