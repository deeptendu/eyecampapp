
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { updatePatient } from "../ApiUrls";
import fetchWithAlert from "../utils/FetchWrapper";
import Spinner from "./Spinner";

const PatientUpdateForm = (props) => {
    const [showDate, setShowDate] = useState(false);
    const [operationDate, setOperationDate] = useState("");
    const [isDateInvalid, setIsDateInvalid] = useState(false);
    const [dateUpdatedInDB, setDateUpdatedInDB] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsDateInvalid(false);
        setOperationDate("");
        setDateUpdatedInDB(false);
    }, [props.currentPatient, navigate]);

    let handleDateClick = (event) => {
        setShowDate(!showDate);
    }
    let handleDateInput = (event) => {
        const dateStr = event.target.value
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        dateStr.length >= 10 && !dateRegex.test(dateStr) ? setIsDateInvalid(true) : setOperationDate(dateStr);

    }
    let handleOnSubmit = (e) => {
        //console.log(operationDate);
        setShowDate(false);
        setIsLoading(true);
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({
                PatientNumber: props.currentPatient.PatientNumber,
                email: props.user.email,
                operationDate: operationDate
            })
        };
        fetchWithAlert(updatePatient, options)
            .then(res => {
                setDateUpdatedInDB(true)
                console.log('response' + JSON.stringify(res));
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
            }).finally(() => { setIsLoading(false) });

    }
    if (props.currentPatient?.PatientNumber) {
        return (
            <React.Fragment>
                <div className='container border rounded border-primary my-3' >
                    <div className='row my-3'>
                        <div className='col-md-2'>
                            <label htmlFor="inputName" className="col-form-label">Patient Number</label>
                        </div>
                        <div className='col-md-4'>
                            <label htmlFor="inputName" className="col-form-label">{props.currentPatient.PatientNumber}</label>
                        </div>
                        <div className='col-md-2'>
                            <label htmlFor="inputName" className="col-form-label">Name</label>
                        </div>
                        <div className='col-md-4'>
                            <label htmlFor="inputName" className="col-form-label">{props.currentPatient.PatientName}</label>
                        </div>
                    </div>

                    <div className='row my-3'>
                        <div className='col-md-2'>
                            <label htmlFor="inputName" className="col-form-label">Age</label>
                        </div>
                        <div className='col-md-4'>
                            <label htmlFor="inputName" className="col-form-label">{props.currentPatient.Age} years </label>
                        </div>
                        <div className='col-md-2'>
                            <label htmlFor="inputName" className="col-form-label">Husband Name</label>
                        </div>
                        <div className='col-md-4'>
                            <label htmlFor="inputName" className="col-form-label">{props.currentPatient.HusbandName}</label>
                        </div>
                    </div>

                    <div className='row my-3'>
                        <div className='col-md-2'>
                            <label htmlFor="inputName" className="col-form-label">Aadhar Number</label>
                        </div>
                        <div className='col-md-4'>
                            <label htmlFor="inputName" className="col-form-label">{props.currentPatient.AadharNumber}</label>
                        </div>
                        <div className='col-md-2'>
                            <label htmlFor="inputName" className="col-form-label">State</label>
                        </div>
                        <div className='col-md-4'>
                            <label htmlFor="inputName" className="col-form-label">{props.currentPatient.State}</label>
                        </div>
                    </div>

                    {props.currentPatient.operationDate ? <div style={{ 'color': 'red' }} className='row my-3'>
                        <div className='col-md-3'>
                        </div>
                        <div className='col-md-2'>
                            <label htmlFor="inputName" className="col-form-label">Operation Date</label>
                        </div>
                        <div className='col-md-4'>
                            <label htmlFor="inputName" className="col-form-label">{props.currentPatient.operationDate}</label>
                        </div>
                    </div> : <></>}

                </div>
                <br />
                <br />
                {!dateUpdatedInDB ?
                    <div className='container border rounded border-secondary my-3'>
                        {isLoading ? <Spinner /> : <div className='row my-3'>
                            <div className='col-md-4'>
                            </div>
                            <div className='col-md-8'>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" value={showDate} onChange={handleDateClick} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Set Operation Date</label>
                                </div>
                            </div>
                        </div>}
                    </div> :
                    <div className='container border rounded border-secondary my-3'>
                        <div className='row my-3'>
                            <div className='col-md-6'>
                                Operation Date
                            </div>
                            <div className='col-md-6'>
                                <div className="form-check form-switch">
                                    <label className="form-check-label" >{operationDate}</label>
                                </div>
                            </div>
                        </div>
                        <div className="alert alert-success" role="alert">
                            Operation Date Successfully updated for the Patient  <Link to="/patientform" className="alert-link">Go Back to HOME</Link>
                        </div>
                    </div>
                }

                <br />
                {
                    !showDate ? <></> :
                        <div className='container border rounded border-success my-3'>
                            <div className='row my-3'>
                                <div className='col-md-2'>

                                </div>
                                <div className='col-md-8'>
                                    <div className="input-group has-validation">
                                        <div className={isDateInvalid ? "form-floating is-invalid" : "form-floating"}>
                                            <input type="text" value={operationDate} onChange={handleDateInput} className={isDateInvalid ? "form-control is-invalid" : "form-control"} id="floatingInputGroup2" placeholder="DD/MM/YYYY eg. 20/09/2025" required />
                                            <label htmlFor="floatingInputGroup2">DD/MM/YYYY eg. 20/09/2025</label>
                                        </div>
                                        {isDateInvalid ? <div className="invalid-feedback">
                                            Please choose a valid date.
                                        </div> : <></>}

                                    </div>
                                </div>
                            </div>
                            <div className='row my-3'>
                                <div className="col-md-2">

                                </div>
                                <div className="col-md-8">
                                    <div className="col-md-12 d-grid gap-6">
                                        <button type="button" onClick={handleOnSubmit} className="btn btn-outline-success">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </React.Fragment>
        );
    }
    else {
        <Spinner />
    }
}

export default PatientUpdateForm;