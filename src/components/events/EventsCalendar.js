import React, {Component, useState} from 'react'
import { Calendar } from '@fullcalendar/core';
import { FullCalendar } from 'primereact/fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { confirmPopup } from 'primereact/confirmpopup';
import './Events.css'
import {AddEvent} from "./AddEvent";
import {TabPanel, TabView} from "primereact/tabview";
import axios from "axios";
import {Toast} from "primereact/toast";
import * as events from "events";

export class EventsCalendar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            events: [],
            options: {
                plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
                defaultView: 'dayGridYear',
                defaultDate: '2017-02-01',
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },
                editable: true,
                activeIndex: 0,
                eventClick: (e) => this.onDeleteClick(e)
            }
        };
    }

    onDeleteClick (e) {
        confirmPopup({
            target: e.el,
            message: 'Are you sure you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const config = {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                };

                axios.delete('http://localhost:8080/api/v1/event/' + e.event.id, config)
                    .then(res => {
                        this.getEvents();
                    })
                    .catch(reason => console.log(reason));
                alert('Event deleted!');
            }
        });
    }

    componentDidMount() {
        this.getEvents();
    }

    getEvents = () => {
        console.log('siema kurwa')
        const config = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        };

        axios.get('http://localhost:8080/api/v1/event', config)
            .then(
                res =>
                {
                    console.log(res);
                    this.setState({events: res.data});
                });
    }

    render() {
        return (
            <div>
                <Toast ref={(el) => this.toast = el} />
                <TabView activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({activeIndex: e.index})}>
                    <TabPanel header="Create Event">
                        <AddEvent/>
                    </TabPanel>
                    <TabPanel header="Events">
                        <div className="calendar">
                            <FullCalendar events={this.state.events} options={this.state.options} />
                        </div>
                    </TabPanel>
                </TabView>
            </div>
        )
    }
}