// layout.js
import React from 'react';

const Layout = (props) => {

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand sticky-top navbar-light bg-light">
        <a href="/login"><span className="navbar-brand mb-0 h1 text-danger">Airbnb</span></a>
        <div className="collapse navbar-collapse">
        </div>
      </nav>
      {props.children}
      <footer className="p-3 bg-light">
        <div>
          <p className="mr-3 mb-0 text-secondary">Airbnb Clone</p>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Layout;
