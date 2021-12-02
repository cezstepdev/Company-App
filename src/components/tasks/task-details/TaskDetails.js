import React, {useState} from "react";
import { Chip } from 'primereact/chip';
import { Timeline } from 'primereact/timeline';
import { Button } from 'primereact/button';
import {Steps} from 'primereact/steps';
import './TaskDetails.css'
import axios from "axios";

const events = [
    { status: 'Waiting', date: '15/10/2020 10:30', icon: 'pi pi-clock', color: '#9C27B0', image: 'game-controller.jpg' },
    { status: 'In Progress', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
    { status: 'Testing', date: '15/10/2020 16:15', icon: 'pi pi-chart-bar', color: '#FF9800' },
    { status: 'Done', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
];

const items = [
    {label: 'Waiting'},
    {label: 'In Progress'},
    {label: 'Testing'},
    {label: 'Done'}
];

const TaskDetails = ({task}) => {

    const getStep = (task) => {
      let status = task.taskStatus;
      switch (status.toLowerCase()) {
          case 'waiting':
              return 0;
          case 'inprogress':
              return 1;
          case 'testing':
              return 2
          case 'done':
              return 3
      }
    }
    const disableButton = (step) => {
      if(step > 2)
          return true;
      return false;
    }

    const [activeIndex, setActiveIndex] = useState(getStep(task));
    const [disable, setDisable] = useState(disableButton(activeIndex));

    const nextStep = () => {

        let data = {

        };

        const config = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        };

        axios.patch('http://localhost:8080/api/v1/task/' + task.id, data, config).then(res => {
            setActiveIndex(activeIndex + 1);
            if(activeIndex > 1) {
                setDisable(true);
            }
        });
    }

    const mapTimeline = (task) => {
        let data = [
            { status: 'Waiting', date: task.createDate, icon: 'pi pi-clock'},
            { status: 'In Progress', date: task.inProgressDate, icon: 'pi pi-cog'},
            { status: 'Testing', date: task.testingDate, icon: 'pi pi-chart-bar'},
            { status: 'Done', date: task.doneDate, icon: 'pi pi-check'}
        ];
        return data;
    }

    return (
        <div className="main-details">
            <div className="details">
                <div className="details-card">
                    <h3>Description</h3>
                    <Chip label={task.username} image="https://solisradius.pl/wp-content/uploads/2021/04/person-icon.png"/><br/>
                    Description: <span>{task.taskDescription}</span><br/>
                    Complexity: <span>{task.complexity}</span><br/>
                    Due date: <span>{task.dueDate}</span>
                </div>

                <Timeline value={mapTimeline(task)}
                          marker={(item) => <i className={item.icon}></i>}
                          opposite={(item) => item.date === null ? '--- not complete ---' : item.date}
                          content={(item) => item.status} />
            </div>
            <div className="done-path">
                <Steps  className="path" model={items} activeIndex={activeIndex}/>
                <Button className="done-button" icon="pi pi-check" iconPos="right" label="Mark step as done" onClick={nextStep} disabled={disable}/>
            </div>
        </div>
    )
}

export default TaskDetails;