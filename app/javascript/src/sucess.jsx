import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class Success extends React.Component {
  state = {
    property: {},
  }
  componentDidMount() {
    fetch(`/api/properties/${this.props.property_id}`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          property: data.property,
          loading: false,
        })
      })
  }

  render() {
      const { property } = this.state;


    return (
      <Layout>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
              <p>Thank you for booking with Airbnb</p>
              <h4>Reservation Successful</h4>
               <div>
                <p>Title</p>
                <p>Description</p>
                <p>Check in</p>
                <p>Check out</p>
                <p>Day 1</p>
                <p>Day 2</p>
                <p>Day 3</p>
                <p>Grand Total</p>
                <p>{property}</p>
               </div>
              </div>
            </div>
          </div>
        </Layout>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Success />,
    document.body.appendChild(document.createElement('div')),
  )
})
