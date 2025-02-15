import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOTP } from "../ApiUrls";
import fetchWithAlert from "../utils/FetchWrapper";
import {checkUser} from "../ApiUrls";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    //const [otp, setOtp] = useState(null); // Store OTP in state
    const navigate = useNavigate();
    const [userExist,setUserExist] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const optionsToCheckUser = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email })
        };

        fetchWithAlert(checkUser, optionsToCheckUser)
            .then(res => {
                //console.log('response send OTP' + JSON.stringify(res));
                if(res.user)
                    setUserExist(true);
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
            }).finally(()=>{setIsLoading(false)});
        if(!userExist)
            return;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email })
        };
        setIsLoading(true);
        fetchWithAlert(sendOTP, options)
            .then(res => {
                //console.log('response send OTP' + JSON.stringify(res));
                //setOtp(res.otp);
                localStorage.setItem("resetEmail", email);
                navigate("/verify-otp", { state: { otp: res.otp } });
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
            }).finally(()=>setIsLoading(false));
    };

    return (
        <section className="vh-100 ">
            <div className="container-fluid h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid" alt="Sample" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 border border-2 rounded border-secondary mx-1 px-5 py-5">
                        <h2 className="text-center">Forgot Password</h2>
                        <form onSubmit={handleSendOTP}>
                            <div className="mb-3">
                                <label className="form-label">Enter your Registered Email Id</label>
                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                           { isLoading ? <button className="btn btn-primary w-100" type="submit" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span>
                                    Sending OTP....
                                </button> :<button type="submit" className="btn btn-primary w-100">Send OTP</button>}
                        </form>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                <div className="text-white mb-3 mb-md-0">
                    Copyright © 2025. All rights reserved.
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;
