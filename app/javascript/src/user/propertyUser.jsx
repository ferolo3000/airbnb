// PropertyUser.jsx
import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import Fruit from "./property"

import "./user.scss"


class PropertyUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current_user: '',
      current_user_id:'',
      fruits: []
    }

    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateFruit = this.updateFruit.bind(this)
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
        .then(data => this.setState({ fruits: data.user_properties }))
  }

  handleUpdate(fruit){
    fetch(`/api/properties/${fruit.id}`,
    {
      method: 'PUT',
      body: JSON.stringify({fruit: fruit}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
        this.updateFruit(fruit)
      })
  }
  updateFruit(fruit){
    let newFruits = this.state.fruits.filter((f) => f.id !== fruit.id)
    newFruits.push(fruit)
    this.setState({
      fruits: newFruits
    })
  }

  render() {
      const AllFruits = (props) => {

        var fruits = this.state.fruits.map((fruit) => {
          return(
            <div key={fruit.id}>
             <Fruit fruit={fruit} handleUpdate={props.handleUpdate}/>
            </div>
          )
        })

        return(
            <React.Fragment>
              {fruits}
            </React.Fragment>
          )
      }

  // if (this.state.property.fruits > 0) {
    return (
      <React.Fragment>
      <div>
      <h5 className="text-secondary text-center mb-3">My Properties</h5>
        <div className="container">
         <AllFruits fruits={this.state.fruits} handleUpdate={this.handleUpdate}/>
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
