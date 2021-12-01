
import React from 'react';

function registrationElement({ reg }) {

  return (
    <li className="list-group-item d-flex justify-content-between">
      <span>
        <span className="fs-6"> ticket: {reg.ticket}</span>
        <span > date: {reg.date}</span>
      </span>
      <button type="button" className="btn btn-danger btn-sm">
        <i className="bi bi-trash"></i>
      </button>
    </li>
  );
}



export default registrationElement;
