// PropertyUser.jsx
import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import "./user.scss"

class Payments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current_user: '',
      current_user_id:'',
      userPayments: [],
    }
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(response => response.json())
      .then(data => {this.setState({
        current_user: data.username,
        current_user_id: data.user_id, })
        return fetch(`/api/users/${this.state.current_user_id}/payments`)
        })
        .then(response => response.json())
        .then(data => this.setState({ userPayments: data.user_payments }))
  }

  renderTableData() {
      return this.state.userPayments.map((property, index) => {
         const { id, city, title, country, start_date, end_date, user_id } = property //destructuring
         return (
            <tr key={id}>
               <td>{id}</td>
               <td>{title}</td>
               <td>{city}</td>
               <td>{country}</td>
               <td>{start_date}</td>
               <td>{end_date}</td>
            </tr>
         )
      })
   }

   renderTableHeader() {
      let header = Object.keys(this.state.userPayments[0])
      return header.map((key, index) => {
         return <th id="header" key={index}>{key.toUpperCase()}</th>
      })
   }

  render() {
  console.log(this.state.current_user_id)
  if (this.state.userPayments.length > 0) {
    return (
      <React.Fragment>
          <div>
            <h5 className="text-secondary text-center mb-3">My Payments</h5>
            <table id='payments' className="table table-hover">
               <tbody>
                <tr>{this.renderTableHeader()}</tr>
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

export default Payments;
