
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { updatePatient, editPatient } from "../ApiUrls";
import fetchWithAlert from "../utils/FetchWrapper";
import Spinner from "./Spinner";
import SearchableDropdown from "./SearchableDropdown";

const PatientUpdateForm = (props) => {
    const [showDate, setShowDate] = useState(false);
    const [operationDate, setOperationDate] = useState("");
    //const [isDateInvalid, setIsDateInvalid] = useState(false);
    const [dateUpdatedInDB, setDateUpdatedInDB] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    //const navigate = useNavigate();
    const [currentPatient, setCurrentPatient] = useState(props.currentPatient);
    const [error, setError] = useState({});
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const [editCompleted, setEditCompleted] = useState(false);


    const dateOptions = [
        { value: "", label: "Select Patient State" },
        { value: "23/02/2025", label: "23 FEB 2025" },
        { value: "24/02/2025", label: "24 FEB 2025" },
        { value: "25/02/2025", label: "25 FEB 2025" },
        { value: "26/02/2025", label: "26 FEB 2025" },
        { value: "27/02/2025", label: "27 FEB 2025" },
        { value: "28/02/2025", label: "28 FEB 2025" },
        { value: "01/03/2025", label: "01 MAR 2025" },
        { value: "02/03/2025", label: "02 MAR 2025" },
        { value: "03/03/2025", label: "03 MAR 2025" },
        { value: "04/03/2025", label: "04 MAR 2025" },
        { value: "05/03/2025", label: "05 MAR 2025" },
        { value: "06/03/2025", label: "06 MAR 2025" },
        { value: "07/03/2025", label: "07 MAR 2025" },
        { value: "08/03/2025", label: "08 MAR 2025" },
        { value: "09/03/2025", label: "09 MAR 2025" },
        { value: "10/03/2025", label: "10 MAR 2025" }
    ]

    useEffect(() => {
        setOperationDate("");
        setDateUpdatedInDB(false);
        setEditCompleted(false);
        setCurrentPatient(props.currentPatient);
    }, [props.currentPatient]);

    let handleDateClick = (event) => {
        setShowDate(event.target.checked);
    }
    let handleDateInput = (value) => {
        setOperationDate(value?.value);
    }
    const onChangeName = (event) => {
        if (/^[A-Za-z ]{3,}$/.test(event.target.value)) {
            setError({ ...error, name: "" }); // valid number input
        } else {
            setError({ ...error, name: "Name must have atleast 3 Characters" });
        }
        setCurrentPatient({ ...currentPatient, PatientName: event.target.value })
    }

    const onChangeAge = (event) => {
        if (/^\d{0,2}$/.test(event.target.value)) {
            setError({ ...error, age: "" }); // valid number input
        } else {
            setError({ ...error, age: "Please enter a valid age" });
        }
        setCurrentPatient({ ...currentPatient, Age: event.target.value })
    }

    const onChangeMobileNo = (event) => {
        let value = event.target.value;
        if (/^\d{10}$/.test(value) || !value) {
            setError({ ...error, mobileNo: "" }); // valid number input
        } else {
            setError({ ...error, mobileNo: "Phone number must be exactly 10 digits" });
        }
        setCurrentPatient({ ...currentPatient, MobileNumber: value })
    }

    const onChangeAadharNo = (event) => {
        let value = event.target.value;
        if (/^\d{12}$/.test(value) || !value) {
            setError({ ...error, aadharNo: "" }); // valid number input
        } else {
            setError({ ...error, aadharNo: "Aadhar number must be exactly 12 digits" });
        }
        setCurrentPatient({ ...currentPatient, AadharNumber: value })
    }

    const handleSaveChanges = () => {
        // console.log('updated the patient'+JSON.stringify(currentPatient));

        setIsUpdateLoading(true);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({
                ...currentPatient,
                email: props.user.email,
                updatedBy: props.user.email
            })
        };
        //console.log('updated the patient' + JSON.stringify(options.body));

        fetchWithAlert(editPatient, options)
            .then(res => {
                setEditCompleted(true);
                //console.log('response' + JSON.stringify(res));
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
            }).finally(() => {
                setIsUpdateLoading(false);
            });

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
                //console.log('response' + JSON.stringify(res));
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
                    <div className='row my-2'>
                        <div className='col-md-12 d-flex justify-content-end'>
                            <button type="button" className="btn btn-secondary circle"
                                data-bs-toggle="modal" onClick={e => setEditCompleted(false)} data-bs-target="#EditModal">
                                <i className="bi bi-pencil"></i> Edit
                            </button>
                        </div>
                    </div>
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
                        {props.currentPatient.HusbandName ? <><div className='col-md-2'>
                            <label htmlFor="inputName" className="col-form-label">Husband Name</label>
                        </div>
                            <div className='col-md-4'>
                                <label htmlFor="inputName" className="col-form-label">{props.currentPatient.HusbandName}</label>
                            </div></> : props.currentPatient.FatherName ? <><div className='col-md-2'>
                                <label htmlFor="inputName" className="col-form-label">Father Name</label>
                            </div>
                                <div className='col-md-4'>
                                    <label htmlFor="inputName" className="col-form-label">{props.currentPatient.FatherName}</label>
                                </div></> : <></>}
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
                            <label htmlFor="inputName" className="col-form-label">{operationDate || props.currentPatient.operationDate}</label>
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
                                    <input className="form-check-input" checked={showDate} onChange={handleDateClick} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
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
                                    <SearchableDropdown onSelect={handleDateInput} options={dateOptions} />
                                    {/* <div className="input-group has-validation">
                                        <div className={isDateInvalid ? "form-floating is-invalid" : "form-floating"}>
                                            <input type="text" value={operationDate} onChange={handleDateInput} className={isDateInvalid ? "form-control is-invalid" : "form-control"} id="floatingInputGroup2" placeholder="DD/MM/YYYY eg. 20/09/2025" required />
                                            <label htmlFor="floatingInputGroup2">DD/MM/YYYY eg. 20/09/2025</label>
                                        </div>
                                        {isDateInvalid ? <div className="invalid-feedback">
                                            Please choose a valid date.
                                        </div> : <></>}

                                    </div> */}
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

                <div className="modal fade" id="EditModal" tabIndex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-4" id="myModalLabel">Edit details of Patient Number {currentPatient.PatientNumber} </h1>
                                <button type="button" className="btn-close" onClick={() => {
                                    setCurrentPatient(props.currentPatient)
                                    setError({})
                                }} data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {
                                    !isUpdateLoading && !editCompleted ? <div className='container border rounded border-primary my-3' >
                                        <div className='row my-3'>
                                            <div className='col-md-2'>
                                                <label htmlFor="inputName" className="col-form-label">Patient Name<span className="text-danger">*</span></label>
                                            </div>
                                            <div className='col-md-10'>
                                                <input type="text" aria-label="Patient Name" placeholder="Patient Name"
                                                    value={currentPatient.PatientName}
                                                    onChange={onChangeName} className="form-control me-2" />
                                                {error?.name && <div style={{ color: "red" }}>{error.name}</div>}
                                            </div>
                                        </div>
                                        <div className='row my-3'>
                                            <div className='col-md-2'>
                                                <label htmlFor="inputAge" className="col-form-label">Age<span className="text-danger">*</span></label>
                                            </div>
                                            <div className='col-md-10'>
                                                <div className="input-group">
                                                    <input type="text" aria-label="Age" placeholder='Years' value={currentPatient.Age} onChange={onChangeAge} className="form-control me-2" />
                                                </div>
                                            </div>
                                        </div>
                                        {error?.age &&
                                            <div className='row my-3'>
                                                <div className='col-md-2'></div>
                                                <div className='col-md-10'>
                                                    <div style={{ color: "red" }}>{error.age}</div>
                                                </div>
                                            </div>
                                        }
                                        <div className='row my-3'>
                                            <div className='col-md-2'>
                                                <label htmlFor="inputGender" className="col-form-label">Gender<span className="text-danger">*</span></label>
                                            </div>
                                            <div className="btn-group col-md-10" onClick={e => setCurrentPatient({ ...currentPatient, Gender: e.target.innerText })} role="group" aria-label="Basic radio toggle button group">
                                                {
                                                    currentPatient.Gender === 'Male' ? <input type="radio" className="btn-check" name="btnradio" id="Male" autoComplete="off" checked />
                                                        : <input type="radio" className="btn-check" name="btnradio" id="Male" autoComplete="off" />
                                                }

                                                <label className="btn btn-outline-primary" htmlFor="btnradio1">Male</label>
                                                {
                                                    currentPatient.Gender === 'Female' ? <input type="radio" className="btn-check" name="btnradio" id="Female" autoComplete="off" checked />
                                                        : <input type="radio" className="btn-check" name="btnradio" id="Female" autoComplete="off" />
                                                }

                                                <label className="btn btn-outline-primary" htmlFor="btnradio2">Female</label>

                                            </div>
                                        </div>
                                        <div className='row my-3'>
                                            <div className='col-md-2'>
                                                <label htmlFor="inputMobile" className="col-form-label">Mobile Number</label>
                                            </div>
                                            <div className='col-md-10'>
                                                <div className="input-group">
                                                    <input type="text" value={currentPatient.MobileNumber} onChange={onChangeMobileNo} aria-label="Mobile Number" placeholder="Mobile Number" className="form-control me-2" />
                                                </div>
                                            </div>


                                        </div>
                                        {error?.mobileNo &&
                                            <div className='row my-3'>
                                                <div className='col-md-2'></div>
                                                <div className='col-md-10'>
                                                    <div style={{ color: "red" }}>{error.mobileNo}</div>
                                                </div>
                                            </div>}
                                        <div className='row my-3'>
                                            <div className='col-md-2'>
                                                <label htmlFor="inputAadhar" className="col-form-label">Aadhar Number</label>
                                            </div>
                                            <div className='col-md-10'>
                                                <div className="input-group">
                                                    <input type="text" value={currentPatient.AadharNumber} onChange={onChangeAadharNo} aria-label="Aadhar Number" placeholder="Aadhar Number" className="form-control me-2" />

                                                </div>
                                            </div>
                                        </div>
                                        {error?.aadharNo &&
                                            <div className='row my-3'>
                                                <div className='col-md-2'></div>
                                                <div className='col-md-10'>
                                                    <div style={{ color: "red" }}>{error.aadharNo}</div>
                                                </div>
                                            </div>}
                                        {/* <div className='row my-3'>
                                            <div className='col-md-2'>
                                                <label htmlFor="inputState" className="col-form-label">State</label>
                                            </div>
                                            <div className='col-md-10'>


                                                <SearchableDropdown options={options} onSelect={stateOnChange} />
                                            </div>
                                        </div> */}

                                        {/* <div className='row my-3'>
                                            <div className='col-md-2'>
                                                <label htmlFor="inputDistrict" className="col-form-label">District</label>
                                            </div>
                                            <div className='col-md-10'>
                                                <div className="input-group">
                                                    {districtList?.length > 0 ?
                                                        <SearchableDropdown options={districtList} onSelect={districtOnChange} />
                                                        : <input type="text" value={district}
                                                            onChange={(event) => setDistrict(event.target.value)}
                                                            aria-label="District" placeholder="District" className="form-control" />
                                                    }
                                                </div>
                                            </div>
                                        </div> */}

                                        <div className='row my-3'>
                                            <div className='col-md-2'>
                                                <label htmlFor="inputFatherName" className="col-form-label">Father's Name</label>
                                            </div>
                                            <div className='col-md-4'>
                                                <div className="input-group">
                                                    <input type="text" value={currentPatient.FatherName} onChange={e => setCurrentPatient({ ...currentPatient, FatherName: e.target.value })} aria-label="Father's Name" placeholder='Father Name' className="form-control" />
                                                </div>
                                            </div>
                                            <div className='col-md-2'>
                                                <label htmlFor="inputHusbandName" className="col-form-label">Husband's Name</label>
                                            </div>
                                            <div className='col-md-4'>
                                                <div className="input-group">
                                                    <input type="text" value={currentPatient.HusbandName} onChange={e => setCurrentPatient({ ...currentPatient, HusbandName: e.target.value })} aria-label="Age" placeholder='Husband Name' className="form-control" />
                                                </div>
                                            </div>

                                        </div>
                                    </div> : editCompleted ? <div>Details updated Successfully</div> : <Spinner></Spinner>
                                }
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => {
                                    setCurrentPatient(props.currentPatient)
                                    setError({})
                                }} >Close</button>
                                {!editCompleted && <button type="button" onClick={handleSaveChanges}
                                    disabled={error?.mobileNo ||
                                        error?.aadharNo || error?.name || error?.age}
                                    className="btn btn-primary" >Save changes</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
    else {
        <Spinner />
    }
}

export default PatientUpdateForm;