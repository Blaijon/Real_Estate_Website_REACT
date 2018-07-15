import React, { Component } from 'react';
import '../css/App.css';

export default class Header extends Component {
  constructor(){
    super()
    this.state = {
      name:'Jow'
    }
  }
  render() {
    return (
    <header>
      <div className="logo">  </div>

      <nav>
      <a href="/">Create Ads</a>
      <a href="/">About Us</a>
      <a href="/">Login In</a>
      <a href="/" className="register-btn">
      Register
      </a>
      </nav>
    </header>);
  }
}
