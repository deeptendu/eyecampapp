import Login from './component/Login';
import NavBar from './component/NavBar';
import PatientForm from './component/PatientForm';
import PatientList from './component/PatientList';
import PatientUpdateForm from './component/PatientUpdateForm';
import Register from './component/Register';
import { useState, useEffect } from 'react';
import { getPatientList, findPatient } from './ApiUrls'
import fetchWithAlert from "./utils/FetchWrapper";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Spinner from './component/Spinner';
import ForgotPassword from './component/ForgotPassword';
import VerifyOTP from './component/VerifyOTP';
import ResetPassword from './component/ResetPassword';


const App = () => {
  const [patientNoSearched, setPatientNoSearched] = useState();
  const [userLoggedIn, setUserLoggedIn] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [patientList, setPatientList] = useState([]);
  const [newPatientCreated, setNewPatientCreated] = useState(false);
  const [currentPatient, setCurrentPatient] = useState({});
  const [patientSearched, setPatientSearched] = useState(false);
  const [resetOTPValid,setResetOTPValid] = useState(false);
  //const navigate = useNavigate();

  useEffect(() => {
    //const href=window.location.href;
    //console.log("href>>>"+href);
    // if(href.endsWith("/login")||href.endsWith("/#")||href.endsWith("#/")||href.endsWith("eyecampapp/"))
    //   return;
    localStorage.setItem("resetEmail", null);
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // Required for showing the browser warning
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const listSize = 500;
  // find search patient
  useEffect(() => {
    if (!isAuthenticated) return;
    setPatientSearched(true);
    const headers = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      }
    };
    fetchWithAlert(findPatient + patientNoSearched, headers)

      .then(res => {
        //console.log('response' + JSON.stringify(res));
        setCurrentPatient(res);

      }).catch(err => {
        //navigate('/patientform');
        setCurrentPatient({});
        const errorDetails = JSON.parse(err.message);
        // console.error("Error Status:", errorDetails.status);
        // console.error("Error Message:", errorDetails.message);
        // console.error("Error Body:", errorDetails.body);
        // console.log('error response' + err);
        if (errorDetails?.body?.error && Array.isArray(errorDetails.body.error)) {
          let validationMsg = "";
          errorDetails.body.error.forEach(element => {
            validationMsg = validationMsg + "\n" + element.msg;
          });
          alert(validationMsg);
        }
      }).finally(() => setPatientSearched(false))
  }, [patientNoSearched]);

  // to get patient List
  useEffect(() => {
    if (!isAuthenticated) return;
    const headers = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      }
    };
    fetchWithAlert(getPatientList + listSize, headers)
      .then(res => {
        //console.log('response' + JSON.stringify(res.token));
        setPatientList(res);
      }).catch(err => {
        const errorDetails = JSON.parse(err.message);
        // console.error("Error Status:", errorDetails.status);
        // console.error("Error Message:", errorDetails.message);
        // console.error("Error Body:", errorDetails.body);
        // console.log('error response' + err);
        if (errorDetails?.body?.error && Array.isArray(errorDetails.body.error)) {
          let validationMsg = "";
          errorDetails.body.error.forEach(element => {
            validationMsg = validationMsg + "\n" + element.msg;
          });
          alert(validationMsg);
        }
      })
  }, [newPatientCreated, isAuthenticated]);
  return (
    <Router>
      <Routes >
        <Route path="/patientform" element={
          isAuthenticated ?
            < >
              <NavBar findPatient={setPatientNoSearched} user={userLoggedIn} />
              <div className='container-fluid'>
                <div className='row my-3'>
                  <div className='col-md-8'>
                    <PatientForm setNewPatientCreated={setNewPatientCreated} user={userLoggedIn} />
                  </div>
                  <div className='col-md-4'>
                    <PatientList patientList={patientList} findPatient={setPatientNoSearched} />
                  </div>

                </div>
              </div>
            </> : <Navigate to="/" />} />
        <Route path="/patientupdateform" element={
          isAuthenticated ?
            < >
              <NavBar findPatient={setPatientNoSearched} user={userLoggedIn} />
              <div className='container-fluid'>
                <div className='row my-3'>
                  <div className='col-md-8'>
                    {currentPatient?.PatientNumber && !patientSearched ? <PatientUpdateForm user={userLoggedIn} currentPatient={currentPatient} />
                      : patientSearched ? <Spinner /> : <></>}
                  </div>
                  <div className='col-md-4'>
                    <PatientList patientList={patientList} findPatient={setPatientNoSearched} />
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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP setResetOTPValid={setResetOTPValid}/>} />
        <Route path="/reset-password" element={resetOTPValid?<ResetPassword />: <Navigate to="/" />} />
      </Routes >


    </Router>
  );
}

export default App;
