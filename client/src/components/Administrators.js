import React from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import Button from 'react-bootstrap/Button';

class Administrator extends React.Component{

  state = {
    ENDPOINT: 'https://scavenger1.herokuapp.com/',
    username: '', 
    password: '',
    notifications_data:[],
    afterLogin:false,
    showInvalid:false,
    shownotifications:false
  };
  
  showNotifications = () => {
    this.setState({
      shownotifications: true,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password} = this.state;
    const credentials = {
      username,
      password,
    };

    axios.post('/admin',credentials).then( (res) => {
      if(res.data[0].status=='Success'){
        this.setState({
          notifications_data:res.data[0].CData.reverse(),
          afterLogin:true
        })
        const socket = socketIOClient(this.state.ENDPOINT);
        console.log(socket);
        socket.on('message', data => { 
                let x=this.state.notifications_data;
                x.unshift(data[0]);
                this.setState({           
                   notifications_data:x,
                });
            });
      }
         else{
        this.setState({
          afterLogin:false,
          showInvalid:true,
        })
      }
    })
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
            <h3>Hi Administrator</h3>
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
                return <li className="notificationsList" key={i}>A customer was searching for a branch in {obj.pincode} on {obj.date}.You can contact him in this number-{obj.contact}</li>;
              })}
            </div>
          ) : null}
        </>
          );
          
        }
        
      }
}

export default Administrator