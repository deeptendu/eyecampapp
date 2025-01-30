import Login from './component/Login';
import NavBar from './component/NavBar';
import PatientForm from './component/PatientForm';
import PatientList from './component/PatientList';
import PatientUpdateForm from './component/PatientUpdateForm';
import Register from './component/Register';
import { useState } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route, Navigate
} from "react-router-dom";

function App() {
  const [patientNoSearched, setPatientNoSearched] = useState();
  const [userLoggedIn, setUserLoggedIn] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes >
        <Route path="/patientform" element={
          isAuthenticated ?
            <div >
              <NavBar findPatient={setPatientNoSearched} user={userLoggedIn} />
              <div className='container-fluid'>
                <div className='row my-3'>
                  <div className='col-md-8'>
                    <PatientForm user={userLoggedIn} />
                  </div>
                  <div className='col-md-4'>
                    <PatientList findPatient={setPatientNoSearched} />
                  </div>

                </div>
              </div>
            </div> : <Navigate to="/" />} />
        <Route path="/patientupdateform" element={
          isAuthenticated ?
            < >
              <NavBar findPatient={setPatientNoSearched} user={userLoggedIn} />
              <div className='container-fluid'>
                <div className='row my-3'>
                  <div className='col-md-8'>
                    <PatientUpdateForm user={userLoggedIn} patientNoSearched={patientNoSearched} />
                  </div>
                  <div className='col-md-4'>
                    <PatientList findPatient={setPatientNoSearched} />
                  </div>
                </div>
              </div>
            </> : <Navigate to="/" />
        } />
        <Route path="/login" element={<Login setAuthenticated={setIsAuthenticated}
          setUser={setUserLoggedIn} />} />
        <Route path="/" element={<Login setAuthenticated={setIsAuthenticated}
          setUser={setUserLoggedIn} />} />
        <Route path="/register" element={<Register />} />
      </Routes >


    </Router>
  );
}

export default App;
