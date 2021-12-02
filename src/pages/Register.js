import React, {useState} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e) => {
        if(rePassword === password) {
            e.preventDefault();
            const data = {
                username: email,
                password: password
            };

            axios
                .post('http://localhost:8080/api/v1/registration', data)
                .then(
                    res => {
                        setRedirect(true);
                    }
                );
        }
    };

    if(redirect) {
        return <Redirect to="/login"/>
    }

    return (
        <div className="main-login-page">
            <form onSubmit={submit} className="login-page">
                <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingUsername" placeholder="Username"
                           onChange={event => setEmail(event.target.value)}/>
                    <label htmlFor="floatingInput">Username</label>
                </div>

                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                           onChange={event => setPassword(event.target.value)}/>
                    <label htmlFor="floatingInput">Password</label>
                </div>

                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingRePassword" placeholder="Password"
                           onChange={event => setRePassword(event.target.value)}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>


                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            </form>
        </div>
    );
};

export default Register;