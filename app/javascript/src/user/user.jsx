// userProperties.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import PropertyUser from "./propertyUser";
import BookingUser from "./bookingUser";
import Form from "./form";
import Financials from "./financials"
import Standard from "./standard"

import "./user.scss"


class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current_user: '',
      render:''
    }
  }

  componentDidMount()   {
    console.log(this.props.username_id)
    fetch('/api/authenticated')
      .then(response => response.json())
      .then(data => this.setState({ current_user: data.username }));
  }

  handleClick(compName, e){
        console.log(compName);
        this.setState({render:compName});
      }
  _renderSubComp(){
      switch(this.state.render){
        case 'bookings': return <BookingUser/>
        case 'properties' : return <PropertyUser/>
        case 'add_property': return <Form/>
        case 'financials': return <Financials/>
        case 'standard': return <Standard/>
      }
  }

 handleLogout() {
   fetch('/api/sessions', safeCredentials({
     method: 'DELETE',
   }))
   .then(response => {
     window.location = "/login";
   })
   .catch(error => console.log(error))
 }

  render() {
    return (
      <React.Fragment>
      <nav className="navbar navbar-expand sticky-top navbar-light bg-light">
        <a href="/"><span className="navbar-brand mb-0 h1 text-danger">Airbnb</span></a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={`/users/${this.state.current_user}`}>User</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login" onClick={this.handleLogout}>Log Out</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <div className="vertical-nav" id="sidebar">
          <div className="py-4 px-3 mb-4 bg-light">
            <div className="media d-flex align-items-center">
              <img src="https://img.icons8.com/ultraviolet/80/000000/user.png" width="65" className="mr-3 rounded-circle img-thumbnail shadow-sm" />
              <div className="media-body">
                <h5>Hello {this.state.current_user}</h5>
              </div>
            </div>
          </div>
          <h5 className="text-white font-weight-bold text-uppercase px-3 pb-2 mb-0">Main</h5>
          <ul className="nav flex-column mb-0">
            <li className="nav-item">
              <a href="#" className="nav-link text-link" name="bookings" onClick={this.handleClick.bind(this, 'bookings')}>
                Bookings
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-link" name="properties" onClick={this.handleClick.bind(this, 'properties')}>
                Properties
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-link" name="add_property" onClick={this.handleClick.bind(this, 'add_property')}>
                Add Property
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-link" name="financials" onClick={this.handleClick.bind(this, 'financials')}>
                Financials
              </a>
            </li>
          </ul>
          <h5 className="text-white font-weight-bold text-uppercase px-3 pb-2 mt-2">Settings</h5>
          <ul className="nav flex-column mb-0">
            <li className="nav-item">
              <a href="#" className="nav-link text-link" name="standard" onClick={this.handleClick.bind(this, 'standard')}>
                Global Preferences
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-link" name="standard" onClick={this.handleClick.bind(this, 'standard')}>
                Notifications
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-link" name="standard" onClick={this.handleClick.bind(this, 'standard')}>
                Login & Security
              </a>
            </li>
            </ul>
        </div>
      </div>
      <div className="page-content p-3" id="content">
      {this._renderSubComp()}
      </div>
    </React.Fragment>
    )
  }

}

export default User;
