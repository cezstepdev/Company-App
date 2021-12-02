import React from "react";
import {Link} from "react-router-dom";
import './Nav.css'
const Nav = () => {

    let login = localStorage.getItem('username');
    let nav;

    if(login === 'null') {
        nav = (
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    {/*<ul className="navbar-nav me-auto mb-2 mb-md-0">*/}
                    {/*    <li className="nav-item">*/}
                    {/*        <Link to="/" className="nav-link active navbar-brand">Home</Link>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
                </div>

                <div>
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link to="/register" className="nav-link active">Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link active">Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
    else {
        nav = (
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        {/*<li className="nav-item">*/}
                        {/*    <Link to="/" className="nav-link active navbar-brand">Home</Link>*/}
                        {/*</li>*/}
                        <li className="nav-item">
                            <Link to="/messenger" className="nav-link active navbar-brand">Messenger</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/tasks" className="nav-link active navbar-brand">Tasks</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/events" className="nav-link active navbar-brand">Events</Link>
                        </li>
                    </ul>
                </div>


                <div>
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active navbar-brand profile">
                                <img src="https://cenea.org.pl/wp-content/uploads/2019/05/blank-profile-picture-973460_960_720-500x500.png"/>
                                {login}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            {nav}
        </nav>
    );
};

export default Nav;