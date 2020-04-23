// PropertyUser.jsx
import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import Property from "./property"

import "./user.scss"


class PropertyUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current_user: '',
      current_user_id:'',
      properties: []
    }

    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateProperty = this.updateProperty.bind(this)
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
        .then(data => this.setState({ properties: data.user_properties }))
  }

  handleUpdate(property){
    fetch(`/api/properties/${property.id}`,
    {
      method: 'PUT',
      body: JSON.stringify({property: property}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
        this.updateProperty(property)
      })
      console.log(property.id)
  }

  updateProperty(property){
    let newProperties = this.state.properties.filter((f) => f.id !== property.id)
    newProperties.push(property)
    this.setState({
      properties: newProperties
    })
  }

  render() {
      const AllProperties = (props) => {

        var properties = this.state.properties.map((property, index) => {
          return(
            <div className="col-4" key={property.id}>
             <Property property={property} handleUpdate={props.handleUpdate}/>
            </div>
          )
        })

        return(
            <React.Fragment>
              {properties}
            </React.Fragment>
          )
      }

  // if (this.state.property.properties > 0) {
    return (
      <React.Fragment>
      <div>
      <h5 className="text-secondary text-center mb-3">My Properties</h5>
        <div className="container">
          <div className="row">
            <AllProperties properties={this.state.properties} handleUpdate={this.handleUpdate}/>
          </div>
        </div>
      </div>
      </React.Fragment>
    )
  // }
  //
  // return (
  //     <React.Fragment>
  //       <h3 className="text-center">Sorry {this.state.current_user}, you don't have any property</h3>
  //     </React.Fragment>
  //   )

  }

}

export default PropertyUser;
