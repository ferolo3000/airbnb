// userProperties.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';
import Form from "./form";


class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      properties: [],
      current_user: '',
      show_form: false,
    }

    // this.handleChange = this.handleChange.bind(this);
  }

  // handleChange = (e) => {
  //   this.setState({ message: e.target.value });
  // }

  // componentDidMount() {
  //   fetch('/api/properties')
  //     .then(response => response.json())
  //     .then(data => this.setState({ properties: data.properties }));
  //   this.currentUser();
  // }
  //
  // toggle = () => {
  //   this.setState({
  //     show_form: !this.state.show_form,
  //   })
  // }
  //
  // currentUser = () => {
  //   fetch('/api/authenticated')
  //     .then(response => response.json())
  //     .then(data => this.setState({ current_user: data.username }));
  // }

  render() {
    return (
      <Layout>
      <div className="user-btn-group">
        <div className="btn-group" role="group" aria-label="Basic example">
          <button type="button" className="btn user-btn" id="btn-property">My Properties</button>
          <button type="button" className="btn user-btn" id="btn-booking">My Bookings</button>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
          </div>
        </div>
      </div>
    </Layout>
    )
  }

}

export default User;
