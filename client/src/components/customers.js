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
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { contact, pincode } = this.state;
    const customer = {
      contact,
      pincode,
    };
    const socket = socketIOClient(this.state.ENDPOINT);
    axios.post('http://localhost:3010/getData', customer).then((res) => {
      this.setState({
        branchData: res.data,
        data: true,
      });

    //   socket.send('connect', () => {
        socket.emit('message', customer);
    //   });
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
      );
    } else if (this.state.data) {
      return (
        <div>
          <Table striped bordered hover>
            {/* <tbody>
              {this.state.branchData.map((obj, i) => (
                <td key={i}>
                  {obj &&
                    Object.keys(obj).map((ob, j) => <tr key={j}>{ob}</tr>)}
                  {obj &&
                    Object.values(obj).map((o, k) => <tr key={k}>{o}</tr>)}
                </td>
              ))}
            </tbody> */}
          </Table>
        </div>
      );
    }
  }
}

export default Customer;