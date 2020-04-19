// BookingUser.jsx
import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import "./user.scss"

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
        .then(data => this.setState({ userBookings: data.trips }))
  }

  render() {
  console.log(this.state.current_user_id)
  if (this.state.userBookings.length > 0) {
    return (
      <React.Fragment>
      <div>
        <h5 className="text-secondary text-center mb-3">My Bookings</h5>
        <div className="row">
        {this.state.userBookings.map(property => {
          return (
            <div key={property.id} className="col-6 col-lg-4 mb-4 property">
              <a href={`/property/${property.id}`} className="text-body text-decoration-none">
                <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.image_url})`, height: 200 }} />
              </a>
                <p className="text-uppercase mb-0 text-secondary"><small><b>{property.city}</b></small></p>
                <h6 className="mb-0">{property.title}</h6>
                <p className="mb-0">Dates Booked: {property.start_date} to {property.end_date}</p>
                <p className="mb-0">City: {property.city}</p>
                <p className="mb-0">Country: {property.country}</p>
               {(property.complete !== 0 ?
                  <p className="mb-0">Status: Paid</p> :
                   <p className="mb-0">Status: Missing Payment</p>
                )}
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
        <h3 className="text-center">Sorry {this.state.current_user}, you haven't book anything yet</h3>
      </React.Fragment>
    )

  }

}

export default BookingUser;
