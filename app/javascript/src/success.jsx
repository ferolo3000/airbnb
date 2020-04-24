import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class Success extends React.Component {

  render() {

    return (
      <Layout>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
                <p>Thank you for booking with Airbnb</p>
                <h4>Reservation Successful</h4>
                <a className="btn btn-sm btn-success" href="/">Home</a>
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
