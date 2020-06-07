import React, {Component} from 'react';
import {Button, Table} from 'reactstrap';
import './WorkSchedule.css'
import {getCurrentUserRestaurantId, getRestaurant, setLanguage} from "../../utils/RequestHandler";
import Translate from "react-translate-component";

class WorkSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workschedule: null,
            dayToDisplay: new Date().getDate().toString(),
            monthToDisplay: (new Date().getMonth() + 1).toString(),
            currentlyDisplayed: ""

        };

        this.change = this.change.bind(this);
        this.pickFirst = this.pickFirst.bind(this);
        this.pickSecond = this.pickSecond.bind(this);
        this.pickThird = this.pickThird.bind(this);
        this.pickFourth = this.pickFourth.bind(this);
        this.pickFifth = this.pickFifth.bind(this);
        this.pickSixth = this.pickSixth.bind(this);
        this.pickSeventh = this.pickSeventh.bind(this);


    }


    change() {
        this.props.history.push('/schedule/edit');
    }

    pickFirst() {
        this.setState({
            dayToDisplay: new Date().getDate().toString()
        })
    }

    pickSecond() {
        this.setState({
            dayToDisplay: (new Date().getDate() + 1).toString()
        })
    }

    pickThird() {
        this.setState({
            dayToDisplay: (new Date().getDate() + 2).toString()
        })
    }

    pickFourth() {
        this.setState({
            dayToDisplay: (new Date().getDate() + 3).toString()
        })
    }

    pickFifth() {
        this.setState({
            dayToDisplay: (new Date().getDate() + 4).toString()
        })
    }

    pickSixth() {
        this.setState({
            dayToDisplay: (new Date().getDate() + 5).toString()
        })
    }

    pickSeventh() {
        this.setState({
            dayToDisplay: (new Date().getDate() + 6).toString()
        })
    }


    componentDidMount() {
        setLanguage();

        getCurrentUserRestaurantId().then(response => {
            getRestaurant(response.data).then(response => {
                this.setState({
                    workschedule: response.data.schedule
                })
            })
        });
    }


    render() {
        if (this.state.workschedule != null) {
            let dayPlan = this.state.workschedule.dayPlanForEmployees.map((plan) => {
                const arr = plan.date.split('-');

                if (arr[2] === this.state.dayToDisplay && arr[1] === this.state.monthToDisplay) {

                    return (
                        <tr key={plan.id}>
                            <td>{plan.employee.name}</td>
                            <td>{plan.employee.surname}</td>
                            <td>{plan.startTime}</td>
                            <td>{plan.endTime}</td>
                        </tr>
                    )
                }
            });

            return (
                <div>
                    <div className="button-menu">
                        <button className="button-dish-date"
                                onClick={this.pickFirst}>{new Date().getDate().toString() + "." + this.state.monthToDisplay}</button>
                        <button className="button-dish-date"
                                onClick={this.pickSecond}>{(new Date().getDate() + 1).toString() + "." + this.state.monthToDisplay}</button>
                        <button className="button-dish-date"
                                onClick={this.pickThird}>{(new Date().getDate() + 2).toString() + "." + this.state.monthToDisplay}</button>
                        <button className="button-dish-date"
                                onClick={this.pickFourth}>{(new Date().getDate() + 3).toString() + "." + this.state.monthToDisplay}</button>
                        <button className="button-dish-date"
                                onClick={this.pickFifth}>{(new Date().getDate() + 4).toString() + "." + this.state.monthToDisplay}</button>
                        <button className="button-dish-date"
                                onClick={this.pickSixth}>{(new Date().getDate() + 5).toString() + "." + this.state.monthToDisplay}</button>
                        <button className="button-dish-date"
                                onClick={this.pickSeventh}>{(new Date().getDate() + 6).toString() + "." + this.state.monthToDisplay}</button>

                    </div>
                    <div id="editContent">
                        <div id="editForm-restaurant">
                            <div className="form-text">
                                <h2 id="edith2"><Translate content="actualGraphic"/></h2>
                                <Button className="button-add-plan" color="success" onClick={this.change}><Translate
                                    content="manageEmployeeSchedules"/></Button>
                            </div>
                            <div className="form-text">
                                <h2 id="edith2">{this.state.dayToDisplay + "." + this.state.monthToDisplay}</h2>
                            </div>
                            <div className="tableContent-employees">
                                <Table id="restaurant-employee">
                                    <thead>
                                    <tr id="restaurant-edit-employee">
                                        <th><Translate content="name"/></th>
                                        <th><Translate content="surname"/></th>
                                        <th><Translate content="startHour"/></th>
                                        <th><Translate content="endHour"/></th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {dayPlan}
                                    </tbody>
                                </Table>

                            </div>
                        </div>
                    </div>
                </div>
            );
        }


        return (
            <div>
                <div id="editContent">
                    <div id="editForm-restaurant">
                        <div className="form-text">
                            <h2 id="edith2"><Translate content="actualGraphic"/></h2>
                            <Button className="button-add-plan" color="success" onClick={this.change}><Translate
                                content="manageEmployeeSchedules"/></Button>
                        </div>
                        <div className="form-text">
                            <h2 id="edith2"><Translate content="noGraphic"/></h2>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default WorkSchedule;
