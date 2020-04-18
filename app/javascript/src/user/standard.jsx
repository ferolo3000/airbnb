import React from "react";

class Standard extends React.Component {

  render() {
    return (
      <div className="container">
        <h3 className="text-center mb-2">Lorem ipsum dolor sit amet</h3>
        <div className="row">
          <div className="col-6">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          <div className="col-6">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          </div>
        </div>
        <div className="card-deck mt-3">
          <div className="card">
            <img src="https://photo-cdn.icons8.com/assets/previews/107/5dd4413a-641d-4f11-8d0d-2d51d29fe2b32x.jpg" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Lorem ipsum</h5>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
          <div className="card">
            <img src="https://photo-cdn.icons8.com/assets/previews/245/2d7eca9b-5d47-4585-a6ed-ba0cd226d697thumb-2x.jpg" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Lorem ipsum</h5>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
          <div className="card">
            <img src="https://photo-cdn.icons8.com/assets/previews/538/c1e19a80-a5a3-43b6-ad08-b0968463c9332x.jpg" className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">Lorem ipsum</h5>
              <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Standard;
