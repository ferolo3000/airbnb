// PropertyUser.jsx
import React from 'react';
import Form from './form';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';



class PropertyUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current_user: '',
      userProperties: [],
      show_form: true,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value });
  }

  componentDidMount() {
    fetch(`/api/properties?page=1`)
      .then(response => response.json())
      .then(data => this.setState({ userProperties: data.properties }));
    this.currentUser();
  }

  currentUser = () => {
    fetch('/api/authenticated')
      .then(response => response.json())
      .then(data => this.setState({ current_user: data.username }));
  }

  toggle = () => {
    this.setState({
      show_form: !this.state.show_form,
    })
  }

  render() {
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
              <button className="btn btn-sm btn-success mt-1">Edit</button>
            </div>
            )
          })}
        </div>
      </div>
      </React.Fragment>
    )
  }

}

export default PropertyUser;
