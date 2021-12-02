import React, {Component} from 'react';
import { Card } from 'primereact/card';
import './Settings.css'
import {Link} from "react-router-dom";
import axios from "axios";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';

export class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editable: true,
            id:"",
            username:"",
            password:"",
            email:"",
            firstName: "",
            lastName:"",
            birthday:""
        }
    }

    componentDidMount() {
        const config = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        };

        axios.get('http://localhost:8080/api/v1/user/' + localStorage.getItem('username'), config)
            .then(
                res =>
                {
                    this.setState({
                        id: res.data.id,
                        username: res.data.username,
                        password: res.data.password,
                        email: res.data.email,
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        birthday: res.data.birthday
                    });
                });
    }

    onEditClick = () => {
        this.setState({editable: false});
    }

    onCancelClick = () => {
        this.setState({editable: true});
    }

    onSubmitClick = () => {
        const config = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        };

        let data = {
            id: this.state.id,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            birthday: this.state.birthday
        }

        axios.post('http://localhost:8080/api/v1/user' , data, config).then(res => {
            //toast
            this.setState({editable: true});
        });
    }

    logout = () => {
        localStorage.setItem('username', null)
        window.location.href = "/login";
    };

    render() {
        return (
            <div className="main-settings">
                <div className="setting-card">
                    <Card subTitle="Profile information" title={
                        <div className="card-title">
                            <div className="edit-button">
                                <span className="username">
                                    Adam
                                </span>
                                <Button style={{display: this.state.editable ? "inline-flex" : "none"}} icon="pi pi-user-edit" className="p-button-rounded p-button-success p-button-outlined" onClick={this.onEditClick}/>
                            </div>
                            <Button icon="pi pi-sign-out" className="p-button-rounded p-button-danger p-button-outlined" onClick={this.logout}/>
                        </div>}>
                        <div className="inputs">
                            <div className="p-field single-input">
                                <label htmlFor="username1" className="p-d-block">Username</label>
                                <InputText disabled={true} id="in" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})} />
                            </div>
                            <div className="p-field single-input">
                                <label htmlFor="username1" className="p-d-block">E-mail</label>
                                <InputText disabled={this.state.editable} id="in" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
                            </div>
                            <div className="p-field single-input">
                                <label htmlFor="username1" className="p-d-block">First Name</label>
                                <InputText disabled={this.state.editable} id="in" value={this.state.firstName} onChange={(e) => this.setState({firstNam: e.target.value})} />
                            </div>
                            <div className="p-field single-input">
                                <label htmlFor="username1" className="p-d-block">First Name</label>
                                <InputText disabled={this.state.editable} id="in" value={this.state.lastName} onChange={(e) => this.setState({lastName: e.target.value})} />
                            </div>
                            <div className="p-field single-input">
                                <label htmlFor="username1" className="p-d-block">First Name</label>
                                <Calendar disabled={this.state.editable} id="in" dateFormat="yy-mm-dd" value={new Date(Date.parse(this.state.birthday))} onChange={(e) => this.setState({birthday: e.value})}/>
                            </div>
                            <div className="operation-buttons" style={{display: this.state.editable ? "none" : "flex"}}>
                                <Button icon="pi pi-times" className="p-button-rounded p-button-danger" onClick={this.onCancelClick}/>
                                <Button icon="pi pi-check" className="p-button-rounded" onClick={this.onSubmitClick}/>
                            </div>
                        </div>

                        {/*------------------------------------------------------------------------------*/}
                    </Card>
                </div>
            </div>
        );
    }
}