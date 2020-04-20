// PropertyUser.jsx
import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import "./user.scss"

class Financials extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current_user: '',
      current_user_id:'',
      userFinancials: [],
    }
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(response => response.json())
      .then(data => {this.setState({
        current_user: data.username,
        current_user_id: data.user_id, })
        return fetch(`/api/users/${this.state.current_user_id}/financials`)
        })
        .then(response => response.json())
        .then(data => this.setState({ userFinancials: data.user_financials }))
  }

  renderTableData() {
      return this.state.userFinancials.map((property, index) => {
         const { city, title, booking_id, country, amount, start_date, complete, end_date, user_id } = property //destructuring
         return (
            <tr key={booking_id}>
               <td>{title}</td>
               <td>{city}</td>
               <td>{country}</td>
               <td>{amount}</td>
               {(complete !== 0 ?
                <td>Paid</td> :
                <td>Pending</td>
                )}
               <td>{start_date}</td>
               <td>{end_date}</td>
            </tr>
         )
      })
   }

   // renderTableHeader() {
   //    let header = Object.keys(this.state.userFinancials[0])
   //    return header.map((key, index) => {
   //       return <th id="header" key={index}>{key.toUpperCase()}</th>
   //    })
   // }

  render() {
    const missingPayments = this.state.userFinancials.filter(payment => payment.complete < 1)
    const count = missingPayments.length
  if (this.state.userFinancials.length > 0) {
    return (
      <React.Fragment>
          <div>
            <h5 className="text-secondary text-center mb-3">My Financials</h5>
            <div className="container">
              <div className="card-deck">
                <div className="card card-inverse stats mb-5">
                  <div className="card-body text-center bg-success">
                    <h6 className="text-uppercase">Expected Revenue</h6>
                    <p className="display-3">${this.state.userFinancials.reduce((accum, value) => accum + parseInt(value.amount, 10), 0)}</p>
                  </div>
                </div>
                <div className="card card-inverse stats mb-5">
                  <div className="card-body text-center bg-warning">
                    <h6 className="text-uppercase">Total Bookings</h6>
                    <p className="display-3">{this.state.userFinancials.length}</p>
                  </div>
                </div>
                <div className="card card-inverse stats mb-5">
                  <div className="card-body text-center bg-info">
                    <h6 className="text-uppercase">Pending Payments</h6>
                    <p className="display-3">{count}</p>
                  </div>
                </div>
              </div>
            </div>
            <table id='payments' className="table table-hover">
               <tbody>
                <tr id="header">
                  <th>TITLE</th>
                  <th>CITY</th>
                  <th>COUNTRY</th>
                  <th>AMOUNT</th>
                  <th>PAYMENT</th>
                  <th>START DATE</th>
                  <th>END DATE</th>
                </tr>
                  {this.renderTableData()}
               </tbody>
            </table>
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

export default Financials;
