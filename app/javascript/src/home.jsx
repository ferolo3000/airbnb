// home.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';

import './home.scss';

class Home extends React.Component {
  state = {
    properties: [],
    total_pages: null,
    next_page: null,
    loading: true,
    current_user:''
  }

  componentDidMount() {
    fetch('/api/properties?page=1')
      .then(handleErrors)
      .then(data => {
        this.setState({
          properties: data.properties,
          total_pages: data.total_pages,
          next_page: data.next_page,
          loading: false,
        })
      })
      this.currentUser();
  }

  loadMore = () => {
    if (this.state.next_page === null) {
      return;
    }
    this.setState({ loading: true });
    fetch(`/api/properties?page=${this.state.next_page}`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          properties: this.state.properties.concat(data.properties),
          total_pages: data.total_pages,
          next_page: data.next_page,
          loading: false,
          authenticated: false
        })
      })
  }

  currentUser = () => {
    fetch('/api/authenticated')
      .then(response => response.json())
      .then(data => this.setState({ current_user: data.username, authenticated: data.authenticated }));
  }

  handleLogout() {
    fetch('/api/sessions', safeCredentials({
      method: 'DELETE',
    }))
    .then(response => {
      window.location = "/";
    })
    .catch(error => console.log(error))
  }

  render () {
    const { authenticated } = this.state;
    if (authenticated) {
      const { properties, next_page, loading } = this.state;
      return (
        <React.Fragment>
          <nav className="navbar navbar-expand sticky-top navbar-light bg-light">
            <a href="/"><span className="navbar-brand mb-0 h1 text-danger">Airbnb</span></a>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href={`/users/${this.state.current_user}`}>User</a>
                </li>
              </ul>
            </div>
          </nav>
          <div className="container pt-4">
            <h4 className="mb-1">Top-rated places to stay</h4>
            <p className="text-secondary mb-3">Explore some of the best-reviewed stays in the world</p>
            <div className="row">
              {properties.map(property => {
                return (
                  <div key={property.id} className="col-6 col-lg-4 mb-4 property">
                    <a href={`/property/${property.id}`} className="text-body text-decoration-none">
                      <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.image_url})` }} />
                      <p className="text-uppercase mb-0 text-secondary"><small><b>{property.city}</b></small></p>
                      <h6 className="mb-0">{property.title}</h6>
                      <p className="mb-0"><small>${property.price_per_night} USD/night</small></p>
                    </a>
                  </div>
                )
              })}
            </div>
            {loading && <p>loading...</p>}
            {(loading || next_page === null) ||
              <div className="text-center">
                <button
                  className="btn btn-light mb-4"
                  onClick={this.loadMore}
                >load more</button>
              </div>
            }
          </div>
          <footer className="p-3 bg-light">
            <div>
              <p className="mr-3 mb-0 text-secondary">Airbnb Clone</p>
            </div>
          </footer>
        </React.Fragment>
      )
    } else {
      const { properties, next_page, loading } = this.state;
      return (
        <React.Fragment>
          <nav className="navbar navbar-expand sticky-top navbar-light bg-light">
            <a href="/"><span className="navbar-brand mb-0 h1 text-danger">Airbnb</span></a>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">Log In</a>
                </li>
              </ul>
            </div>
          </nav>
          <div className="container pt-4">
            <h4 className="mb-1">Top-rated places to stay</h4>
            <p className="text-secondary mb-3">Explore some of the best-reviewed stays in the world</p>
            <div className="row">
              {properties.map(property => {
                return (
                  <div key={property.id} className="col-6 col-lg-4 mb-4 property">
                    <a href={`/property/${property.id}`} className="text-body text-decoration-none">
                      <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.image_url})` }} />
                      <p className="text-uppercase mb-0 text-secondary"><small><b>{property.city}</b></small></p>
                      <h6 className="mb-0">{property.title}</h6>
                      <p className="mb-0"><small>${property.price_per_night} USD/night</small></p>
                    </a>
                  </div>
                )
              })}
            </div>
            {loading && <p>loading...</p>}
            {(loading || next_page === null) ||
              <div className="text-center">
                <button
                  className="btn btn-light mb-4"
                  onClick={this.loadMore}
                >load more</button>
              </div>
            }
          </div>
          <footer className="p-3 bg-light">
            <div>
              <p className="mr-3 mb-0 text-secondary">Airbnb Clone</p>
            </div>
          </footer>
        </React.Fragment>
      )
    }


  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
