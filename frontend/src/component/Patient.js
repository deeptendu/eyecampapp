import React from 'react';
import { Link } from 'react-router-dom';
import {useState} from 'react';

const Patient = (props) => {
  const [color, setColor] = useState("#5693f5");

  let handleSearchClick = (e) => {
    props.findPatient(props.patientDetails.PatientNumber)

  }
  return (
    <Link id={props.patientDetails.PatientNumber}  onMouseEnter={() => setColor("black")}  
    onMouseLeave={() => setColor("#5693f5")}
     style={{ color:color}} to="/patientupdateform" 
     onClick={handleSearchClick} 
     className="list-group-item border rounded border-secondary mb-1  list-group-item-action" 
     aria-current="true" >
      <h6 className="mb-1">Patient Number {props.patientDetails.PatientNumber}</h6>

      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{props.patientDetails.PatientName}</h5>

        <small>Age {props.patientDetails.Age} years</small>
      </div>
      <div className="d-flex w-100 justify-content-between">
        {props.patientDetails.HusbandName ? <small>Husband Name : {props.patientDetails.HusbandName}</small> : props.patientDetails.FatherName ? <small>Father Name : {props.patientDetails.FatherName}</small> : <></>}
        {props.patientDetails.operationDate ? <small>Operation Date : {props.patientDetails.operationDate}</small> : <></>}

      </div>
    </Link>
  );
}

export default Patient;