
import React from "react";
import { useState } from "react";
import { loginUrl, getUser } from "../ApiUrls";
import { useNavigate, Link } from 'react-router-dom';
import fetchWithAlert from "../utils/FetchWrapper";

const Login = (props) => {

    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    };

    const handleLogin = () => {
        setIsLoading(true);
        fetchWithAlert(loginUrl, options)
            .then(res => {
                //console.log('response' + JSON.stringify(res.token));
                localStorage.setItem("auth-token", res.token);
                getUserAPI(res.token);
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
    const getUserAPI = (token) => {
        const headers = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'auth-token': token
            }
        };

        fetchWithAlert(getUser, headers).then(res => {
            // console.log('response' + JSON.stringify(res));
            // console.log('response email' + JSON.stringify(res.email));
            if (res.email) {
                navigate(`/patientform`);
            }
            props.setUser({ id: res._id, name: res.name, email: res.email });
            props.setAuthenticated(true);


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

    }
    return (
        <section className="vh-100 ">
            <div className="container-fluid h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid" alt="Sample" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 border border-2 rounded border-secondary mx-1 px-5 py-5">
                        <form>
                            <div data-mdb-input-init className="form-outline mb-4">
                                <label className="form-label" htmlFor="form3Example3">Email address</label>

                                <input type="email" value={formData.email}
                                    onChange={(event) => setFormData({ ...formData, email: event.target.value })} id="form3Example3" className="form-control form-control-lg"
                                    placeholder="Enter a valid email address" />
                            </div>

                            <div data-mdb-input-init className="form-outline mb-3">
                                <label className="form-label" htmlFor="form3Example4">Password</label>

                                <input value={formData.password}
                                    onChange={(event) => setFormData({ ...formData, password: event.target.value })} type="password" id="form3Example4" className="form-control form-control-lg"
                                    placeholder="Enter password" />
                                <Link to="/forgot-password"
                                    className="link-danger">Forgot Password</Link>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                {isLoading ? <button className="btn btn-primary" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span>
                                    logging in....
                                </button> : <button type="button" data-mdb-button-init data-mdb-ripple-init
                                    className="btn btn-primary btn-lg" onClick={handleLogin}
                                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Login</button>}
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/register"
                                    className="link-danger">Register</Link></p>
                            </div>
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
}
export default Login;