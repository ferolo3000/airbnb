// PropertyUser.jsx
import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class PropertyUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current_user: '',
      userProperties: [],
    }
  }

  componentDidMount() {
    fetch(`/api/users/${this.props.username_id}/properties`)
      .then(response => response.json())
      .then(data => this.setState({ userProperties: data.properties }));
  }

  currentUser = () => {
    fetch('/api/authenticated')
      .then(response => response.json())
      .then(data => this.setState({ current_user: data.username }));
  }

  getProperty = (data) => {
    this.setState({
      userProperties: data.properties
    })
  }

  handleEdit = (e) => {
    e.preventDefault()
    let id = e.target.parentNode.id

    fetch(`/api/properties/${id}/edit`)
      .then(handleErrors)
      .then(data => {
        this.getProperty(data);
      })
  }

  render() {

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
