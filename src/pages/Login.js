import React, {useState} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        const data = {
            username: email,
            password: password
        };

        axios
            .post('http://localhost:8080/login', data)
            .then(
                res => {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('username', res.data.username);
                    setRedirect(true);
                }
            );
    }

    if(redirect) {
        return <Redirect to="/"/>
    }

    return (
        <div className="main-login-page">
            <form onSubmit={submit} className="login-page">
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"
                           onChange={e => setEmail(e.target.value)}/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>

                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                           onChange={e => setPassword(e.target.value)}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            </form>
        </div>
    );
};

export default Login;