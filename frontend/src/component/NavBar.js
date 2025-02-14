
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
  const [patientNo, setPatientNo] = useState("");
  let handleSearchChange = (e) => {
    setPatientNo(e.target.value);
  }
  let handleSearchClick = (e) => {
    //setPatientNo(e.target.value);
    props.findPatient(patientNo)
    //console.log(patientNo);
    setPatientNo("");

  }
  return (
    <nav className="navbar navbar-expand-sm  sticky-top bg-body-tertiary border border-2 rounded border-secondary">
      <div className="container-fluid ">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav  me-auto  mb-2 mb-lg-1">
            <li className="nav-item border rounded border-secondary mx-1 d-flex justify-content-center align-items-center text-center">
              <Link className="nav-link active" aria-current="page" to="/patientform">Home</Link>
            </li>
            <li className="nav-item border rounded border-secondary mx-1 d-flex justify-content-center align-items-center text-center">
              <Link className="nav-link active" to="/patientform">Patient Regitration</Link>
            </li>
            <li className="nav-item dropdown active border rounded border-secondary mx-1 d-flex justify-content-center align-items-center text-center">
              <Link className="nav-link dropdown-toggle active" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {props.user?.name ? props.user.name.toUpperCase() : 'username'}
              </Link>
              <ul className="dropdown-menu border rounded border-secondary mx-1">
                <li><Link className="dropdown-item mx-1 d-flex justify-content-center align-items-center text-center " to="/" onClick={() => { localStorage.clear(); }} >Log out</Link></li>
              </ul>
            </li>
          </ul>
          <form className="d-flex flex-grow-1 ms-2" role="search">
            <input className="form-control me-2 w-100" value={patientNo} onChange={handleSearchChange} type="search" placeholder="Search by Patient Number" aria-label="Search" />
            <Link to="/patientupdateform">
              <button className="btn btn-outline-success" onClick={handleSearchClick} type="submit">Search</button>
            </Link>
          </form>

        </div>
      </div>
    </nav>
  );
}

export default NavBar;