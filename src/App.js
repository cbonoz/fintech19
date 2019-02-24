import React, { Component } from 'react';
import Home from './components/Home'
import Welcome from './components/Welcome'
import { Nav, Navbar } from 'react-bootstrap'

import './App.css';

import logo from './assets/logo2.png'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'



// const TITLE = 'Insurlytics'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {' Insurlytics'}
          </Navbar.Brand>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/upload">Upload</Nav.Link>
        </Navbar>

        <Router>
          <div className='gradient-background'>
            <Route exact path="/" component={Welcome} />
            <Route path="/upload" component={Home} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
