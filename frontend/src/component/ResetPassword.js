import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../ApiUrls";
import fetchWithAlert from "../utils/FetchWrapper";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const email = localStorage.getItem("resetEmail");
    const [isLoading, setIsLoading] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        };

        fetchWithAlert(updatePassword, options)
            .then(res => {
                //console.log('response' + JSON.stringify(res));
                alert(`Password updated successfully, please Login with new password`);
                navigate('/login');
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
                localStorage.setItem("resetEmail", null);
                setIsLoading(false);
            });

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
                        <h2 className="text-center">Reset Password</h2>
                        <form onSubmit={handleResetPassword}>
                            <input type="password" placeholder="Please enter new password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            {isLoading ? <button className="btn btn-primary w-100 mt-3" type="submit" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span>
                                Resetting....
                            </button> : <button type="submit" className="btn btn-primary w-100 mt-3">Reset Password</button>}
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

export default ResetPassword;
