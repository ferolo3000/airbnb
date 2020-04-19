// PropertyUser.jsx
import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class PropertyUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current_user: '',
      current_user_id:'',
      userProperties: [],
    }
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

  handleEdit = (e) => {
    e.preventDefault()
    let id = e.target.parentNode.id

    fetch(`/api/properties/${id}`)
      .then(handleErrors)
      .then(data => {
        this.setState({
            userProperties: data.properties
          })
      })
  }

  handleEdit = (e) => {
    e.preventDefault()
    const data = { username: 'example' };
    fetch(`/api/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  render() {
  console.log(this.state.current_user_id)
  if (this.state.userProperties.length > 0) {
    return (
      <React.Fragment>
      <div>
        <div className="row">
        {this.state.userProperties.map(property => {
          return (
            <div key={property.id} className="col-6 col-lg-4 mb-4 property">
              <a href={`/property/${property.id}`} className="text-body text-decoration-none">
                <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.image_url})` }} />
              </a>
                <p className="text-uppercase mb-0 text-secondary"><small><b>{property.city}</b></small></p>
                <h6 className="mb-0">{property.title}</h6>
                <p className="mb-0">Booked by: </p>
                <p className="mb-0">Dates Booked: </p>
                <p className="mb-0">Booking Status: </p>
              <button className="btn btn-sm btn-success mt-1" onClick={this.handleEdit}>Edit</button>
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
        <p className="text-center">Sorry {this.state.current_user}, you don't have any property</p>
      </React.Fragment>
    )

  }

}

export default PropertyUser;
