// PropertyUser.jsx
import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import "./user.scss"

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

//   updateProperty = (e) => {
//     e.preventDefault()
//     let id = e.target.id;
//     console.log(id);
//     const data = {
//       title: '',
//       city: '',
//       country: ''
//     };
//     fetch(`/api/properties/${id}`, safeCredentials({
//       method: 'PUT',
//       body: JSON.stringify(data)
//     }))
//     .then((response) => response.json())
//     .then((responseJson) => {
//       alert(responseJson)
//     })
//     .catch((error) => {
//       console.error(error)
//   })
// }

edit = (userProperties) => { 
    // Do whatever you want
}

renderTableData() {
    return this.state.userProperties.map((property, index) => {
       const { id, title, city, country } = property //destructuring
       return (
          <tr key={id}>
             <td>{title}</td>
             <td>{city}</td>
             <td>{country}</td>
             <td>
              <button onClick={() => this.edit(property)} className="btn btn-link">
                <svg className="edit-btn bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z" clip-rule="evenodd"/>
                </svg>
              </button>
             </td>
             <td>
               <button onClick={() => this.edit(property)} className="btn btn-link">
                <svg className="edit-btn bi bi-folder-check" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M9.828 4H2.19a1 1 0 00-.996 1.09l.637 7a1 1 0 00.995.91H9v1H2.826a2 2 0 01-1.991-1.819l-.637-7a1.99 1.99 0 01.342-1.31L.5 3a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 009.828 3h3.982a2 2 0 011.992 2.181L15.546 8H14.54l.265-2.91A1 1 0 0013.81 4H9.828zm-2.95-1.707L7.587 3H2.19c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 011-.98h3.672a1 1 0 01.707.293z" clip-rule="evenodd"/>
                  <path fill-rule="evenodd" d="M15.854 10.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 01.708-.708l1.146 1.147 2.646-2.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>
                </svg>
              </button>
             </td>
          </tr>
       )
    })
 }

  render() {
  if (this.state.userProperties.length > 0) {
    return (
      <React.Fragment>
      <div>
      <h5 className="text-secondary text-center mb-3">My Properties</h5>
        <div className="container">
          <table id='payments' className="table table-hover">
             <tbody>
              <tr id="header">
                <th>TITLE</th>
                <th>CITY</th>
                <th>COUNTRY</th>
                <th>EDIT</th>
                <th>SAVE</th>
              </tr>
                {this.renderTableData()}
             </tbody>
          </table>
        </div>
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

export default PropertyUser;
