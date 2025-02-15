import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOTP = (props) => {
    const [otpInput, setOtpInput] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const storedOtp = location.state?.otp; // OTP from previous page

    const handleVerifyOTP = (e) => {
        e.preventDefault();
        if (otpInput === storedOtp) {
            props.setResetOTPValid(true);
            navigate("/reset-password");
        } else {
            alert("Invalid OTP");
        }
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
                        <h2 className="text-center">Verify OTP</h2>
                        <form onSubmit={handleVerifyOTP}>
                            <div className="mb-3">
                                <label className="form-label">Enter OTP</label>
                                <input type="text" placeholder="Enter 6 digit OTP recieved on your mail" className="form-control" value={otpInput} onChange={(e) => setOtpInput(e.target.value)} required />
                            </div>
                            <p className="small fw-bold mt-2 pt-1 mb-0" >Email id : {localStorage.getItem("resetEmail")}</p>
                            <button type="submit" className="btn btn-primary w-100">Verify OTP</button>
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

export default VerifyOTP;
