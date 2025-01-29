
import React from 'react';
import { useState } from "react";
import { createPatient } from '../ApiUrls';
import { Link } from 'react-router-dom';

const PatientForm = (props) => {

    const [patientName, setPatientName] = useState("");
    const [age, setAge] = useState();
    const [gender, setGender] = useState("");
    const [mobileNo, setMobileNo] = useState();
    const [aadharNo, setAadharNo] = useState();
    const [state, setState] = useState("");
    const [district, setDistrict] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [husbandName, setHusbandName] = useState("");
    const [patientNumber, setPatientNumber] = useState("");
    const [createdSuccessFully, setCreatedSuccessFully] = useState(false);

    let patientDetails = {
        PatientName: patientName,
        Age: age,
        Gender: gender,
        MobileNumber: mobileNo,
        AadharNumber: aadharNo,
        State: state,
        District: district,
        FatherName: fatherName,
        HusbandName: husbandName,
        email: props.user.email
    };

    let nameOnChange = (event) => {
        setPatientName(event.target.value);
        //console.log(patientName);
    }
    let ageOnChange = (event) => {
        setAge(event.target.value);
        //console.log(patientName);
    }
    let genderOnChange = (event) => {
        //console.log(event);
        setGender(event.target.innerText);
        //console.log(patientName);
    }
    let mobileOnChange = (event) => {
        setMobileNo(event.target.value);
        //console.log(patientName);
    }
    let aadharOnChange = (event) => {
        setAadharNo(event.target.value);
        //console.log(patientName);
    }
    let stateOnChange = (event) => {
        //console.log(event);
        setState(event.target.value);
        //console.log(patientName);
    }
    let districtOnChange = (event) => {
        setDistrict(event.target.value);
        //console.log(patientName);
    }
    let fatherNameOnChange = (event) => {
        setFatherName(event.target.value);
        //console.log(patientName);
    }
    let husbandNameOnChange = (event) => {
        setHusbandName(event.target.value);
        //console.log(patientName);
    }

    let handleOnSubmit = (event) => {

        console.log(patientDetails);
        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify(patientDetails)

        };
        fetch(createPatient, headers)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json()
            })
            .then(res => {
                console.log('response' + JSON.stringify(res));
                setPatientNumber(res.PatientNumber);
                setCreatedSuccessFully(true);
            }).catch(err => {
                console.log('error response' + err);
            })
    }

    let reset = () =>{
        setCreatedSuccessFully(false);
        setPatientName("");
        setAge();
        setGender("");
        setMobileNo()
        setAadharNo("");
         setState("");
         setDistrict("");
         setFatherName("");
         setHusbandName("");
         setPatientNumber("");
    }
    return (
        <React.Fragment>
            {!createdSuccessFully ? <div className='container border rounded border-primary my-3' >
                {/* <h2>Patient Form</h2> */}
                <div className='row my-3'>
                    <div className='col-md-2'>
                        <label htmlFor="inputName" className="col-form-label">Patient Name</label>
                    </div>
                    <div className='col-md-10'>
                        <input type="text" aria-label="Patient Name" placeholder="Patient Name" value={patientName} onChange={nameOnChange} className="form-control" />
                    </div>

                </div>
                <div className='row my-3'>
                    <div className='col-md-2'>
                        <label htmlFor="inputAge" className="col-form-label">Age</label>
                    </div>
                    <div className='col-md-10'>
                        <div className="input-group">
                            <input type="text" aria-label="Age" placeholder='Years' value={age} onChange={ageOnChange} className="form-control" />
                        </div>
                    </div>

                </div>
                <div className='row my-3'>
                    <div className='col-md-2'>
                        <label htmlFor="inputGender" className="col-form-label">Gender</label>
                    </div>
                    <div className="btn-group col-md-10" onClick={genderOnChange} role="group" aria-label="Basic radio toggle button group">
                        {
                            gender === 'Male' ? <input type="radio" className="btn-check" name="btnradio" id="Male" autoComplete="off" checked />
                                : <input type="radio" className="btn-check" name="btnradio" id="Male" autoComplete="off" />
                        }

                        <label className="btn btn-outline-primary" htmlFor="btnradio1">Male</label>
                        {
                            gender === 'Female' ? <input type="radio" className="btn-check" name="btnradio" id="Female" autoComplete="off" checked />
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
                            <input type="text" value={mobileNo} onChange={mobileOnChange} aria-label="Mobile Number" placeholder="Mobile Number" className="form-control" />
                        </div>
                    </div>

                </div>
                <div className='row my-3'>
                    <div className='col-md-2'>
                        <label htmlFor="inputAadhar" className="col-form-label">Aadhar Number</label>
                    </div>
                    <div className='col-md-10'>
                        <div className="input-group">
                            <input type="text" value={aadharNo} onChange={aadharOnChange} aria-label="Aadhar Number" placeholder="Aadhar Number" className="form-control" />
                        </div>
                    </div>
                </div>

                <div className='row my-3'>
                    <div className='col-md-2'>
                        <label htmlFor="inputState" className="col-form-label">State</label>
                    </div>
                    <div className='col-md-10'>
                        <select className="form-select" onChange={stateOnChange} value={state} aria-label="state">
                            <option value="">Select Patient State</option>
                            <option value="AP">Andhra Pradesh</option>
                            <option value="AR">Arunachal Pradesh</option>
                            <option value="AS">Assam</option>
                            <option value="BR">Bihar</option>
                            <option value="CT">Chhattisgarh</option>
                            <option value="GA">Gujarat</option>
                            <option value="HR">Haryana</option>
                            <option value="HP">Himachal Pradesh</option>
                            <option value="JK">Jammu and Kashmir</option>
                            <option value="GA">Goa</option>
                            <option value="JH">Jharkhand</option>
                            <option value="KA">Karnataka</option>
                            <option value="KL">Kerala</option>
                            <option value="MP">Madhya Pradesh</option>
                            <option value="MH">Maharashtra</option>
                            <option value="MN">Manipur</option>
                            <option value="ML">Meghalaya</option>
                            <option value="MZ">Mizoram</option>
                            <option value="NL">Nagaland</option>
                            <option value="OR">Odisha</option>
                            <option value="PB">Punjab</option>
                            <option value="RJ">Rajasthan</option>
                            <option value="SK">Sikkim</option>
                            <option value="TN">Tamil Nadu</option>
                            <option value="TG">Telangana</option>
                            <option value="TR">Tripura</option>
                            <option value="UT">Uttarakhand</option>
                            <option value="UP">Uttar Pradesh</option>
                            <option value="WB">West Bengal</option>
                            <option value="AN">Andaman and Nicobar Islands</option>
                            <option value="CH">Chandigarh</option>
                            <option value="DN">Dadra and Nagar Haveli</option>
                            <option value="DD">Daman and Diu</option>
                            <option value="DL">Delhi</option>
                            <option value="LD">Lakshadweep</option>
                            <option value="PY">Puducherry</option>
                        </select>
                    </div>
                </div>

                <div className='row my-3'>
                    <div className='col-md-2'>
                        <label htmlFor="inputDistrict" className="col-form-label">District</label>
                    </div>
                    <div className='col-md-10'>
                        <div className="input-group">
                            <input type="text" value={district} onChange={districtOnChange} aria-label="District" placeholder="District" className="form-control" />
                        </div>
                    </div>
                </div>

                <div className='row my-3'>
                    <div className='col-md-2'>
                        <label htmlFor="inputFatherName" className="col-form-label">Father's Name</label>
                    </div>
                    <div className='col-md-4'>
                        <div className="input-group">
                            <input type="text" value={fatherName} onChange={fatherNameOnChange} aria-label="Father's Name" placeholder='Father Name' className="form-control" />
                        </div>
                    </div>
                    <div className='col-md-2'>
                        <label htmlFor="inputHusbandName" className="col-form-label">Husband's Name</label>
                    </div>
                    <div className='col-md-4'>
                        <div className="input-group">
                            <input type="text" value={husbandName} onChange={husbandNameOnChange} aria-label="Age" placeholder='Husband Name' className="form-control" />
                        </div>
                    </div>

                </div>

                <div className='row my-3'>
                    <div className='col-md-6'>
                        <div className="col-md-12 d-grid gap-3">
                            <button type="button" onClick={()=>reset()} className="btn btn-outline-danger ">Reset</button>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="col-md-12 d-grid gap-3">
                            <button type="button" onClick={handleOnSubmit} className="btn btn-outline-success">Submit</button>
                        </div>
                    </div>


                </div>
            </div> :
                <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">Patient Number {patientNumber}</h4>
                    <p>Patient is create Successfully</p>
                    <hr />
                    <p className="mb-0">Patient Name {patientName}</p>
                    <hr />
                    <p className="mb-0">Patient Age {age}</p>
                    <hr />
                    <Link to='/patientform' onClick={()=>reset()}> Create Another Patient</Link>
                </div>
                }

        </React.Fragment>
    );
}

export default PatientForm;