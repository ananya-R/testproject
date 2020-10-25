import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import socketIOClient from 'socket.io-client'; 

class Customer extends React.Component {
  state = {
    branchData: [],
    data: false,
    ENDPOINT: 'http://localhost:3010',
    current: '',
    pincode: '',
    showInvalidMessage:false
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { contact, pincode } = this.state;
    var dt=new Date();   
    var date = dt.getDate();
    var month = dt.getMonth();
    var year = dt.getFullYear();
    var dateString = year + "-" +(month + 1) + "-" + date;
    const time=dt.getHours() + ":"+dt.getMinutes()
    const customer = {
      contact,
      pincode,
    };
    const socket = socketIOClient(this.state.ENDPOINT);
    axios.post('/getData', customer).then((res) => {
        console.log(res);
    if(res.data.length==0){
        this.setState({
            showInvalidMessage:true
        })
        socket.emit('notification', {'customer':customer,'date':dateString});
    }
    else{
        this.setState({
            branchData: res.data,
            data: true,
          });
            socket.emit('notification', {'customer':customer,'date':dateString});
    }
    });
  };

  inputValueHandler = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { contact, pincode } = this.state;
    if (!this.state.data) {
      return (
          <>
        <div className='customer'>
          <form onSubmit={this.handleSubmit}>
            <label>
              Contact Number
              <input
                type='text'
                value={contact}
                onChange={this.inputValueHandler}
                name='contact'
              />
            </label>
            <label id='pincode'>
              Pincode
              <input
                type='text'
                value={pincode}
                onChange={this.inputValueHandler}
                name='pincode'
              />
            </label>
            <div className='submit'>
              <input id='submit ' type='submit' value='SUBMIT' />
            </div>
          </form>
        </div>
        {this.state.showInvalidMessage ? (
            <div className="">
              Bad Bad luck, No Donut for you!!
            </div>
          ) : null}
        </>
      );
    } else if (this.state.data) {
      return (
        <div>
          <Table striped bordered hover>
          <thead>
                <tr>
                <th>Branch Name</th>
                <th>Address</th>
                <th>City</th>
                <th>Branch Incharge</th>
                <th>Contact Number</th> 
                </tr>
            </thead>
            <tbody>
              {this.state.branchData.map((obj, i) => (
                <tr key={i}>
                    <td>{obj.Branch_Name}</td>
                    <td>{obj.Address}</td>
                    <td>{obj.City}</td>
                    <td>{obj.Branch_Incharge}</td>
                    <td>{obj.Contact_Number}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    }
  }
}

export default Customer;