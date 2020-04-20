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
      property: []
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

  handleEdit = (e) => {
    e.preventDefault();
    let id = e.target.id
    const data = {
      title: property.title,
      city: property.city,
      country: property.country,
    };

    fetch(`/api/properties/${id}/edit`, safeCredentials({
      method: 'PUT',
      body: JSON.stringify(data),
    }))
      .then(handleErrors)
      .then(data => {
        console.log(data.success)
        if (data.success) {
          this.setState({
            title: '',
            city: '',
            country: '',
          })
        }
      })
      .catch(error => {
        this.setState({
          error: 'Could not save.',
        })
      })
  }

  enableEdit(i){
    this.setState({
      [e.target.name]: e.target.value.editing=true,
    })
};

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
                  <input readOnly name="title" type="text" value={property.title} onChange={this.handleChange} className="form-control-plaintext"/>
                </div>
                <div className="form-group prop-data">
                  <label className="content">City: </label>
                  <input readOnly name="city" type="text" value={property.city} onChange={this.handleChange} className="form-control-plaintext"/>
                </div>
                <div className="form-group prop-data mb-0">
                  <label className="content">Country: </label>
                  <input readOnly name="country" type="text" value={property.country} onChange={this.handleChange} className="form-control-plaintext"/>
                </div>
              </form>
              <button className="btn btn-sm btn-primary mt-1" onClick={this.handleEdit} id={property.id}>Edit</button>
              <button className="btn btn-sm btn-success mt-1 ml-2" onClick={this.handleEdit}>Save</button>
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
