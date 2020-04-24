// BookingUser.jsx
import React from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import "./user.scss"

class BookingUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current_user: '',
      current_user_id:'',
      booking_id:'',
      userBookings: [],
      authenticated: false
    }
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(response => response.json())
      .then(data => {this.setState({
        authenticated: data.authenticated,
        current_user: data.username,
        current_user_id: data.user_id })
        return fetch(`/api/users/${this.state.current_user_id}/bookings`)
        })
        .then(response => response.json())
        .then(data => this.setState({ userBookings: data.trips }))
        .then(data => {
        })
  }

  handleClick(id){
   console.log(id);
   this.setState(
    { booking_id: id}
   )
}

  initiateStripeCheckout = (booking_id) => {
    return fetch(`/api/charges?booking_id=${booking_id}&cancel_url=${window.location.pathname}`, safeCredentials({
      method: 'POST',
    }))
      .then(handleErrors)
      .then(response => {
        const stripe = Stripe(process.env.STRIPE_PUBLISHABLE_KEY);

        stripe.redirectToCheckout({
          // Make the id field from the Checkout Session creation API response
          // available to this file, so you can provide it as parameter here
          // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
          sessionId: response.charge.checkout_session_id,
        }).then((result) => {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
  console.log(this.state.booking_id)
  if (this.state.userBookings.length > 0) {
    return (
      <React.Fragment>
      <div>
        <h5 className="text-secondary text-center mb-3">My Bookings</h5>
        <div className="row">
        {this.state.userBookings.map(booking => {
          return (
            <div key={booking.id} className="col-6 col-lg-4 mb-4 property">
              <a href={`/property/${booking.id}`} className="text-body text-decoration-none">
                <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${booking.image_url})`, height: 200 }} />
              </a>
                <p className="text-uppercase mb-0 text-secondary"><small><b>{booking.city}</b></small></p>
                <h6 className="mb-0">{booking.title}</h6>
                <p className="mb-0">Dates Booked: {booking.start_date} to {booking.end_date}</p>
                <p className="mb-0">City: {booking.city}</p>
                <p className="mb-0">Country: {booking.country}</p>
               {(booking.complete !== 0 ?
                  <p className="mb-0">Status: <span className="text-success">Paid</span></p> :
                   <p className="mb-0">Status: <span className="text-danger">Pending</span></p>
                )}
                {(booking.complete !== 0 ?
                   null :
                    <button className="btn btn-sm btn-primary mt-1" onClick={() => this.initiateStripeCheckout(booking.id)}>Pay</button>
                 )}
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
