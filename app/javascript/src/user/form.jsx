// userProperties.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';


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
      current_user: ''
    }
    this.createProperty = this.createTweets.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value });
  }

  createProperty = (e) => {
    e.preventDefault();
    const data = { message: this.state.message };

    fetch('/api/properties', safeCredentials({
      method: 'POST',
      body: JSON.stringify(data),
    }))
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

  currentUser = () => {
    fetch('/api/authenticated')
      .then(response => response.json())
      .then(data => this.setState({ current_user: data.username }));
  }

  render() {
    return (
      <div className="new-property">
      <form>
        <div className="form-group">
          <label for="exampleFormControlInput1">Title</label>
          <input type="text" onChange={this.handleChange} value={this.state.title} className="form-control" id="exampleFormControlInput1" placeholder="title" />
        </div>
        <div className="form-group">
          <label for="exampleFormControlInput1">Description</label>
          <input type="text" onChange={this.handleChange} value={this.state.description} className="form-control" id="exampleFormControlInput1" placeholder="description"/>
        </div>
        <div className="form-group">
          <label for="exampleFormControlInput1">City</label>
          <input type="text" onChange={this.handleChange} value={this.state.city} className="form-control" id="exampleFormControlInput1" placeholder="city"/>
        </div>
        <div className="form-group">
          <label for="exampleFormControlInput1">Country</label>
          <input type="text" onChange={this.handleChange} value={this.state.country} className="form-control" id="exampleFormControlInput1" placeholder="country"/>
        </div>
        <div className="form-group">
          <label for="exampleFormControlInput1">Property Type</label>
          <input type="text" onChange={this.handleChange} value={this.state.property_type} className="form-control" id="exampleFormControlInput1" placeholder="property type"/>
        </div>
        <div className="form-group">
          <label for="exampleFormControlInput1">Price per night</label>
          <input type="number" onChange={this.handleChange} value={this.state.price_per_night} className="form-control" id="exampleFormControlInput1" placeholder="price per night"/>
        </div>
        <div className="form-group">
          <label for="exampleFormControlInput1">Max. Number of Guests</label>
          <input type="number" onChange={this.handleChange} value={this.state.max_guests} className="form-control" id="exampleFormControlInput1" placeholder="M"/>
        </div>
        <div className="form-group">
          <label for="exampleFormControlInput1">bedrooms</label>
          <input type="number" onChange={this.handleChange} value={this.state.bedrooms} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
        </div>
        <div className="form-group">
          <label for="exampleFormControlInput1">beds</label>
          <input type="number" onChange={this.handleChange} value={this.state.beds} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
        </div>
        <div className="form-group">
          <label for="exampleFormControlInput1">baths</label>
          <input type="number" onChange={this.handleChange} value={this.state.baths} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
        </div>
        <div className="form-group">
          <label for="exampleFormControlFile1">Attach Images</label>
          <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
        </div>
        </form>
        <button type="submit" onSubmit={this.createTweets} className="btn btn-primary">Save</button>
        <button type="submit" className="btn btn-primary">Cancel</button>
      </div>
    )
  }

}

export default Form;
