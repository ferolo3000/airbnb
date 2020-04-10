// userProperties.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';
import PropertyUser from "./propertyUser";

import "./user.scss"


class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current_user: '',
      showComponent: false,
    }
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  componentDidMount = () => {
    fetch('/api/authenticated')
      .then(response => response.json())
      .then(data => this.setState({ current_user: data.username }));
  }

  _onButtonClick() {
   this.setState({
     showComponent: true,
   });
 }

  render() {
    console.log(this.state.current_user)
    return (
      <Layout>
      <div className="container">
        <div className="vertical-nav" id="sidebar">
          <div className="py-4 px-3 mb-4 bg-light">
            <div className="media d-flex align-items-center">
              <img src="https://img.icons8.com/ultraviolet/80/000000/user.png" width="65" className="mr-3 rounded-circle img-thumbnail shadow-sm" />
              <div className="media-body">
                <h4>{this.state.current_user}</h4>
              </div>
            </div>
          </div>
          <h5 className="text-white font-weight-bold text-uppercase px-3 pb-2 mb-0">Main</h5>
          <ul className="nav flex-column mb-0">
            <li className="nav-item">
              <a href="#" className="nav-link text-link" onClick={this._onButtonClick}>
                Properties
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-link"onClick={this._onButtonClick}>
                Bookings
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-link"onClick={this._onButtonClick}>
                Add Property
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-link"onClick={this._onButtonClick}>
                Payments
              </a>
            </li>
          </ul>
          <h5 className="text-white font-weight-bold text-uppercase px-3 pb-2 mt-2">Settings</h5>
          <ul className="nav flex-column mb-0">
            <li className="nav-item">
              <a href="#" className="nav-link text-link" onClick={this._onButtonClick}>
                Global Preferences
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-link" onClick={this._onButtonClick}>
                Notifications
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link text-link" onClick={this._onButtonClick}>
                Login & Security
              </a>
            </li>
            </ul>
        </div>
      </div>
      <div className="page-content p-5" id="content">
      {this.state.showComponent ?
           <PropertyUser /> :
           null
        }
      </div>
    </Layout>
    )
  }

}

export default User;
