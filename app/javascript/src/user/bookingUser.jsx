// PropertyUser.jsx
import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class BookingUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current_user: '',
      userProperties: [],
    }
  }

  componentDidMount() {
    this.currentUser();
    fetch(`/api/users/${this.state.current_user}/bookings`)
      .then(response => response.json())
      .then(data => this.setState({ userProperties: data.properties }));
  }

  currentUser = () => {
    fetch('/api/authenticated')
      .then(response => response.json())
      .then(data => this.setState({ current_user: data.username }));
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
                <p className="mb-0">Dates Booked: </p>
                <p className="mb-0">Booking Status: </p>
              <button className="btn btn-sm btn-primary mt-1" onSubmit={this.props.submitBooking}>Go to Payments</button>
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
        <p className="text-center">Sorry {this.state.current_user}, you haven't book anything yet</p>
      </React.Fragment>
    )

  }

}

export default BookingUser;
