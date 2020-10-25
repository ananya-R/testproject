import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {Link,Route} from 'react-router-dom';
import Customer from './components/customers';
import BranchManager from './components/BranchManager';
import Administrator from './components/Administrators';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
    <Navbar bg="primary" variant="dark">
    <Nav className="mr-auto">
      <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
      <Nav.Link as={Link} to="/branchmanager">Branch Managers</Nav.Link>
      <Nav.Link as={Link} to="/administrator">Administrators</Nav.Link>
    </Nav>
  </Navbar>
     {/* <ul className="ul">
     <li><Link to="/customers">Customers</Link></li>
     <li><Link to="/branchmanager">Branch Managers</Link></li>
     <li>Administrators</li>
     </ul> */}

     <Route path="/customers" component={Customer}></Route>
     <Route path="/branchmanager" component={BranchManager}></Route>
     <Route path="/administrator" component={Administrator}></Route>
    </div>
  );
}

export default App;
