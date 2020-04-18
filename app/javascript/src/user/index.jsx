import React from 'react'
import ReactDOM from 'react-dom'
import User from './user';

// document.addEventListener('DOMContentLoaded', () => {
//   ReactDOM.render(
//     <User />,
//     document.body.appendChild(document.createElement('div')),
//   )
// })

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('params');
  const data = JSON.parse(node.getAttribute('data-params'));
  console.log(data);
  ReactDOM.render(
    <User username_id={data.username_id} />,
    document.body.appendChild(document.createElement('div')),
  )
})
