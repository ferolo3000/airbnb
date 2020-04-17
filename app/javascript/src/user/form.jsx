import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import "./user.scss"

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      city: '',
      country: '',
      property_type: '',
      price_per_night: '',
      max_guests: '',
      bedrooms: '',
      beds: '',
      baths: '',
      current_user: '',
      image_url:'',
      error:''
    }
    this.createProperty = this.createProperty.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  createProperty = (e) => {
    e.preventDefault();
    const data = {
      title: this.state.title,
      description: this.state.description,
      city: this.state.city,
      country: this.state.country,
      property_type: this.state.property_type,
      price_per_night: this.state.price_per_night,
      max_guests: this.state.max_guests,
      bedrooms: this.state.bedrooms,
      beds: this.state.beds,
      baths: this.state.baths,
    };

    fetch('/api/properties', safeCredentials({
      method: 'POST',
      body: JSON.stringify(data),
    }))
      .then(handleErrors)
      .then(data => {
        console.log(data.success)
        if (data.success) {
          this.setState({
            title: '',
            description: '',
            city: '',
            country: '',
            property_type: '',
            image_url: '',
            price_per_night: '',
            max_guests: '',
            bedrooms: '',
            beds: '',
            baths: ''
          })
        }
      })
      .catch(error => {
        this.setState({
          error: 'Could not add property.',
        })
      })
  }

  render() {
    return (
  <div className="new-property">
    <h5 className="text-secondary text-center mb-3">Add New Property</h5>
      <form onSubmit={this.createProperty}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-1">
              <label className="label-form">Title</label>
              <input name="title" type="text" onChange={this.handleChange} value={this.state.title} className="form-control" placeholder="e.g. Cozy Bright Room" required/>
            </div>
            <div className="form-group mb-1">
              <label className="label-form">Description</label>
              <input name="description" type="text" onChange={this.handleChange} value={this.state.description} className="form-control" placeholder="Property Description" required/>
            </div>
            <div className="form-group mb-1">
              <label className="label-form">City</label>
                <input name="city" type="text" onChange={this.handleChange} value={this.state.city} className="form-control" placeholder="New York" required/>
            </div>
            <div className="form-group mb-1">
              <label className="label-form">Country</label>
                <input name="country" type="text" onChange={this.handleChange} value={this.state.country} className="form-control" placeholder="Denmark" required/>
            </div>
            <div className="form-group mb-1">
              <label className="label-form">Property Type</label>
                <input name="property_type" type="text" onChange={this.handleChange} value={this.state.property_type} className="form-control" placeholder="Apartment" required/>
            </div>
            <div className="form-group mb-1">
              <label className="label-form">Attach Images</label>
              <input name="image_url" type="file"  onChange={this.handleChange} value={this.state.image_url} className="form-control-file" id="img-add" required/>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group mb-1">
              <label className="label-form">Price per night</label>
                <input min="0" name="price_per_night" type="number" onChange={this.handleChange} value={this.state.price_per_night} className="form-control" placeholder="27" required/>
            </div>
            <div className="form-group mb-1">
              <label className="label-form">Max. Number of Guests</label>
              <input min="0" name="max_guests" type="number" onChange={this.handleChange} value={this.state.max_guests} className="form-control" placeholder="7" required/>
            </div>
            <div className="form-group mb-1">
              <label className="label-form">Bedrooms</label>
              <input min="0" name="bedrooms" type="number" onChange={this.handleChange} value={this.state.bedrooms} className="form-control" placeholder="5" required/>
            </div>
            <div className="form-group mb-1">
              <label className="label-form">Beds</label>
              <input min="0" name="beds" type="number" onChange={this.handleChange} value={this.state.beds} className="form-control" placeholder="4" required/>
            </div>
            <div className="form-group">
              <label className="label-form">Baths</label>
              <input min="0" name="baths" type="number" onChange={this.handleChange} value={this.state.baths} className="form-control" placeholder="3" required/>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </form>
  </div>
    )
  }

}

export default Form;
