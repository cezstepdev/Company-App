import './App.css';
import Nav from "./components/navigation/Nav";
import Login from "./pages/Login";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Messenger from "./pages/Messenger";
import React from "react";
import Tasks from "./pages/Tasks";
import {EventsCalendar} from "./components/events/EventsCalendar";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Nav/>
                <main className="form-signin">
                    <Route path="/" exact component={Home}/>
                    <Route path="/messenger" exact component={Messenger}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/tasks" component={Tasks}/>
                    <Route path="/events" component={EventsCalendar}/>
                </main>
            </BrowserRouter>
        </div>

    );
}

export default App;
