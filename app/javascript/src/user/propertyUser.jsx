// PropertyUser.jsx
import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import "./user.scss"

class PropertyUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current_user: '',
      current_user_id:'',
      userProperties: [],
      editModeEnabled: false,
      title: '',
      city: '',
      country: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(response => response.json())
      .then(data => {this.setState({
        current_user: data.username,
        current_user_id: data.user_id, })
        return fetch(`/api/users/${this.state.current_user_id}/properties`)
        })
        .then(response => response.json())
        .then(data => this.setState({ userProperties: data.user_properties }))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleEditClick() {
    this.setState({ editModeEnabled: !this.state.editModeEnabled });
  }

  updateProperty = (e) => {
    e.preventDefault()
    let id = e.target.id;
    console.log(id);
    const data = {
      title: '',
      city: '',
      country: ''
    };
    fetch(`/api/properties/${id}`, safeCredentials({
      method: 'PUT',
      body: JSON.stringify(data)
    }))
    .then((response) => response.json())
    .then((responseJson) => {
      alert(responseJson)
    })
    .catch((error) => {
      console.error(error)
  })
}

  render() {
  if (this.state.userProperties.length > 0) {
    return (
      <React.Fragment>
      <div>
      <h5 className="text-secondary text-center mb-3">My Properties</h5>
        <div className="row">
        {this.state.userProperties.map(property => {
          return (
            <div key={property.id} className="col-6 col-lg-4 mb-4 property">
              <a href={`/property/${property.id}`} className="text-body text-decoration-none">
                <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.image_url})`, height: 200 }} />
              </a>
              <form className="form-horizontal">
                <div className="form-group prop-data">
                  <label className="content">Title: </label>
                  <input disabled={!this.state.editModeEnabled} name="title" type="text" defaultValue={property.title} onChange={this.handleChange} className="form-control-plaintext"/>
                </div>
                <div className="form-group prop-data">
                  <label className="content">City: </label>
                  <input disabled={!this.state.editModeEnabled} name="city" type="text" defaultValue={property.city} onChange={this.handleChange} className="form-control-plaintext"/>
                </div>
                <div className="form-group prop-data mb-0">
                  <label className="content">Country: </label>
                  <input disabled={!this.state.editModeEnabled} name="country" type="text" defaultValue={property.country} onChange={this.handleChange} className="form-control-plaintext"/>
                </div>
              </form>
              <button className="btn btn-sm btn-success mt-1" onClick={this.handleEditClick.bind(this)} id={property.id}>Edit</button>
              <button className="btn btn-sm btn-primary mt-1 ml-2" onClick={this.updateProperty} id={property.id}>Save</button>
            </div>
            )
          })}
        </div>
      </div>
      </React.Fragment>
    )
  }

  return (
      <React.Fragment>
        <h3 className="text-center">Sorry {this.state.current_user}, you don't have any property</h3>
      </React.Fragment>
    )

  }

}

export default PropertyUser;
