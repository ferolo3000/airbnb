// BookingUser.jsx
import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class BookingUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current_user: '',
      current_user_id:'',
      userBookings: [],
    }
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(response => response.json())
      .then(data => {this.setState({
        current_user: data.username,
        current_user_id: data.user_id, })
        return fetch(`/api/users/${this.state.current_user_id}/bookings`)
        })
        .then(response => response.json())
        .then(data => this.setState({ userBookings: data.user_bookings }))
  }

  render() {
  console.log(this.state.current_user_id)
  if (this.state.userBookings.length > 0) {
    return (
      <React.Fragment>
      <div>
        <div className="row">
        {this.state.userBookings.map(property => {
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
              <button className="btn btn-sm btn-primary mt-1">Pay</button>
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
