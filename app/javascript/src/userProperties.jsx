// userProperties.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';


class UserProperties extends React.Component {

}

export default UserProperties;

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <UserProperties />,
    document.body.appendChild(document.createElement('div')),
  )
})
