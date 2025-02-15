
import React from 'react';
import { useState } from "react";
import { createPatient } from '../ApiUrls';
import { Link } from 'react-router-dom';
import fetchWithAlert from "../utils/FetchWrapper";
import Spinner from './Spinner';
import SearchableDropdown from './SearchableDropdown';
import distList from '../utils/DistrictList.json'
import CustomSelect from './CustomSelect';

const PatientForm = (props) => {

    const [patientName, setPatientName] = useState("");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("");
    const [mobileNo, setMobileNo] = useState();
    const [aadharNo, setAadharNo] = useState();
    const [state, setState] = useState("");
    const [district, setDistrict] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [husbandName, setHusbandName] = useState("");
    const [patientNumber, setPatientNumber] = useState("");
    const [createdSuccessFully, setCreatedSuccessFully] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({});
    const [districtList, setDistrictList] = useState([]);

    const options = [
        { value: "", label: "Select Patient State" },
        { value: "AP", label: "Andhra Pradesh" },
        { value: "AR", label: "Arunachal Pradesh" },
        { value: "AS", label: "Assam" },
        { value: "BR", label: "Bihar" },
        { value: "CT", label: "Chhattisgarh" },
        { value: "GJ", label: "Gujarat" },
        { value: "HR", label: "Haryana" },
        { value: "HP", label: "Himachal Pradesh" },
        { value: "JK", label: "Jammu and Kashmir" },
        { value: "GA", label: "Goa" },
        { value: "JH", label: "Jharkhand" },
        { value: "KA", label: "Karnataka" },
        { value: "KL", label: "Kerala" },
        { value: "MP", label: "Madhya Pradesh" },
        { value: "MH", label: "Maharashtra" },
        { value: "MN", label: "Manipur" },
        { value: "ML", label: "Meghalaya" },
        { value: "MZ", label: "Mizoram" },
        { value: "NL", label: "Nagaland" },
        { value: "OR", label: "Odisha" },
        { value: "PB", label: "Punjab" },
        { value: "RJ", label: "Rajasthan" },
        { value: "SK", label: "Sikkim" },
        { value: "TN", label: "Tamil Nadu" },
        { value: "TG", label: "Telangana" },
        { value: "TR", label: "Tripura" },
        { value: "UT", label: "Uttarakhand" },
        { value: "UP", label: "Uttar Pradesh" },
        { value: "WB", label: "West Bengal" },
        { value: "AN", label: "Andaman and Nicobar Islands" },
        { value: "CH", label: "Chandigarh" },
        { value: "DN", label: "Dadra and Nagar Haveli" },
        { value: "DD", label: "Daman and Diu" },
        { value: "DL", label: "Delhi" },
        { value: "LD", label: "Lakshadweep" },
        { value: "PY", label: "Puducherry" }
    ];

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
        if (/^[A-Za-z ]{3,}$/.test(event.target.value)) {
            setError({ ...error, name: "" }); // valid number input
        } else {
            setError({ ...error, name: "Name must have atleast 3 Characters" });
        }
        //console.log(patientName);
    }
    let ageOnChange = (event) => {
        setAge(event.target.value);
        if (/^\d{0,2}$/.test(event.target.value)) {
            setError({ ...error, age: "" }); // valid number input
        } else {
            setError({ ...error, age: "Please enter a valid age" });
        }
        //console.log(patientName);
    }
    let genderOnChange = (event) => {
        //console.log(event);
        setGender(event.target.innerText);
        //console.log(patientName);
    }
    let mobileOnChange = (event) => {
        let value = event.target.value;
        setMobileNo(value);
        if (/^\d{10}$/.test(value) || !value) {
            setError({ ...error, mobileNo: "" }); // valid number input
        } else {
            setError({ ...error, mobileNo: "Phone number must be exactly 10 digits" });
        }
        // console.log(error);
    }
    let aadharOnChange = (event) => {
        let value = event.target.value;
        setAadharNo(value);
        if (/^\d{12}$/.test(value) || !value) {
            setError({ ...error, aadharNo: "" }); // valid number input
        } else {
            setError({ ...error, aadharNo: "Aadhar number must be exactly 12 digits" });
        }
        //console.log(patientName);
    }
    let stateOnChange = (value) => {
        //console.log(value?.label);
        setState(value?.label);
        let val = value?.value;
        if (val) {
            let foundState = distList.states.find(st => st.state === val);
            let distMap = [];
            let id = 1;
            foundState.districts.forEach(dist => {
                distMap.push({
                    value: id, label: dist
                });
                id++;
            });
            //distMap.push({ value: id, label: "Other"});
            setDistrictList(distMap);
        }
        //console.log(patientName);
    }
    let districtOnChange = (value) => {
        console.log(value);
        setDistrict(value?.label);
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
        setIsLoading(true);
        // console.log(patientDetails);
        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify(patientDetails)

        };
        fetchWithAlert(createPatient, headers)
            .then(res => {
                //console.log('response' + JSON.stringify(res));
                setPatientNumber(res.PatientNumber);
                setCreatedSuccessFully(true);
                props.setNewPatientCreated(true);
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
            }).finally(() => setIsLoading(false));
    }

    let reset = () => {
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
    if (isLoading) {
        return (
            <Spinner />
        )
    }
    else {
        return (
            <React.Fragment>
                {!createdSuccessFully ? <div className='container border rounded border-primary my-3' >
                    {/* <h2>Patient Form</h2> */}
                    <div className='row my-3'>
                        <div className='col-md-2'>
                            <label htmlFor="inputName" className="col-form-label">Patient Name <span className="text-danger">*</span></label>
                        </div>
                        <div className='col-md-10'>
                            <input type="text" aria-label="Patient Name" placeholder="Patient Name" value={patientName} onChange={nameOnChange} className="form-control me-2" />
                            {error?.name && <div style={{ color: "red" }}>{error.name}</div>}
                        </div>

                    </div>
                    <div className='row my-3'>
                        <div className='col-md-2'>
                            <label htmlFor="inputAge" className="col-form-label">Age<span className="text-danger">*</span></label>
                        </div>
                        <div className='col-md-10'>
                            <div className="input-group">
                                <input type="text" aria-label="Age" placeholder='Years' value={age === 0 ? '' : age} onChange={ageOnChange} className="form-control me-2" />
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
                                <input type="text" value={mobileNo} onChange={mobileOnChange} aria-label="Mobile Number" placeholder="Mobile Number" className="form-control me-2" />
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
                                <input type="text" value={aadharNo} onChange={aadharOnChange} aria-label="Aadhar Number" placeholder="Aadhar Number" className="form-control me-2" />

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
                    <div className='row my-3'>
                        <div className='col-md-2'>
                            <label htmlFor="inputState" className="col-form-label">State</label>
                        </div>
                        <div className='col-md-10'>
                            <SearchableDropdown options={options} onSelect={stateOnChange} />
                        </div>
                    </div>

                    <div className='row my-3'>
                        <div className='col-md-2'>
                            <label htmlFor="inputDistrict" className="col-form-label">District</label>
                        </div>
                        <div className='col-md-10'>
                            <div className="input-group">
                                {districtList?.length > 0 ?
                                    // <SearchableDropdown options={districtList} onSelect={districtOnChange} />
                                    <CustomSelect options={districtList} onChange={districtOnChange}/>
                                    : <input type="text" value={district}
                                        onChange={(event) => setDistrict(event.target.value)}
                                        aria-label="District" placeholder="District" className="form-control" />
                                }
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
                                <button type="button" onClick={handleOnSubmit} disabled={error?.mobileNo ||
                                    error?.aadharNo || error?.name || error?.age} className="btn btn-outline-success">Submit</button>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className="col-md-12 d-grid gap-3">
                                <button type="button" onClick={() => reset()} className="btn btn-outline-danger ">Reset</button>
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
                        <Link to='/patientform' onClick={() => reset()}> Create Another Patient</Link>
                    </div>
                }

            </React.Fragment>
        );
    }

}

export default PatientForm;