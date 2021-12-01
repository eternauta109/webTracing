import React from 'react';
import RegistrationElement from './registrationElement';

export const Table = ({ registration }) => {
  /* import { useSelector } from "react-redux"; */
  console.log(registration)
  return (
    <ul className="list-group list-group-flush">
      {registration.map((reg, key) => (
        <RegistrationElement reg={reg} key={key} />
      ))}
    </ul>
  );
};

export default Table;
