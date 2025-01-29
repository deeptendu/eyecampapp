import React from 'react';
import { Link } from 'react-router-dom';

const Patient = (props) => {
  let handleSearchClick = (e) => {
    props.findPatient(props.patientNo)

  }
  return (
    <Link id={props.patientNo} to="/patientupdateform" onClick={handleSearchClick} className="list-group-item border rounded border-secondary mb-1  list-group-item-action" aria-current="true" >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">Patient No {props.patientNo}</h5>
        <small>Age {props.age} years</small>
      </div>
      <p className="mb-1">{props.patientName}</p>
      <small>Husband Name : {props.husbandName}</small>
    </Link>
  );
}

export default Patient;