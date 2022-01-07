import React, {Component} from 'react'
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Calendar} from "primereact/calendar";
import {Toast} from 'primereact/toast';
import "./AddEvent.css"
import axios from "axios";

export class AddEvent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            start: '',
            end: ''
        };
    }

    onTitleChange = (event) => {
        this.setState({title: event.target.value});
    }

    onStartChange = (event) => {
        this.setState({start: event.target.value.toLocaleDateString('en-CA')});
    }

    onEndChange = (event) => {
        this.setState({end: event.target.value.toLocaleDateString('en-CA')});
    }

    isDataCorrect = () => {
        if(this.state.title && this.state.title.length > 0)
            return this.state.start <= this.state.end;
    }

    onButtonClick = () => {
        if(this.isDataCorrect()) {
            const config = {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            };

            const data = {
                title: this.state.title,
                start: this.state.start,
                end: this.state.end
            };

            axios.post('https://company-manager-api.herokuapp.com/api/v1/event', data, config)
                .then(
                    res =>
                    {
                        this.setState({title: ''});
                        this.setState({start: ''});
                        this.setState({end: ''});
                        this.toast.show({severity: 'success', summary: 'Successful', detail: 'Event added!', life: 3000});
                        window.location.reload(false);
                    });
        }
    }

    render() {
        return (
            <div className="main-add-event">
                <Toast ref={(el) => this.toast = el} />
                <div className="add-events">
                    <InputText id="in" value={this.state.title} onChange={(e) => this.onTitleChange(e)} placeholder="Event Title"/>
                    <Calendar value={this.state.start} dateFormat="dd/mm/yy" onChange={(e) => this.onStartChange(e)} showButtonBar></Calendar>
                    <Calendar value={this.state.end} dateFormat="dd/mm/yy" onChange={(e) => this.onEndChange(e)} showButtonBar></Calendar>
                    <Button label="Add Event" onClick={() => this.onButtonClick()}/>
                </div>
            </div>
        );
    }
}