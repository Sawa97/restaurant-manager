import React, {Component} from 'react';
import './ScheduleEmployeeEdit.css'
import {
    deleteDayPlan,
    getEmployeeSchedules, setLanguage,

} from "../../utils/RequestHandler";
import {Button, Table} from "reactstrap";
import Translate from "react-translate-component";
import counterpart from "counterpart";


class ScheduleEmployeeEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedules: [],
            disposition: "",
            employee: null
        };

        this.close = this.close.bind(this);
        this.delete = this.delete.bind(this);
        this.addPlan = this.addPlan.bind(this);


    }

    delete(dayPlan) {
        deleteDayPlan(dayPlan.id);
        window.location.reload();
    }

    addPlan() {
        this.props.history.push('/dayplan/edit', {employee: this.state.employee});
        window.location.reload();
    }


    close() {
        this.props.history.push('/schedule/edit');
        window.location.reload();
    }

    componentWillMount() {
        setLanguage();

        if (this.props.location.state != null) {
            let description = counterpart.translate("lack");
            if (this.props.location.state.employee.disposition != null) {
                description = this.props.location.state.employee.disposition.description;
            }
            getEmployeeSchedules(this.props.location.state.employee.number).then(response => {
                this.setState({
                    employee: this.props.location.state.employee,
                    schedules: response.data,
                    disposition: description
                })
            });
        }


    }


    render() {
        console.log(this.state.disposition);
        let dayPlans = this.state.schedules.map((schedule) => {
            return (
                <tr key={schedule.id}>
                    <td>{schedule.date}</td>
                    <td>{schedule.startTime}</td>
                    <td>{schedule.endTime}</td>
                    <td className="editTd">
                        <Button className="editButton" color="danger"
                                onClick={() => this.delete(schedule)} size="sm"><Translate content="delete"/>
                        </Button>
                    </td>
                </tr>
            )
        });

        return (
            <div>
                <div id="editContent">
                    <div id="editForm-restaurant">
                        <div className="form-text">
                            <h2 id="edith2-g"><Translate content="scheduleEditTitle"/></h2>
                            <Button className="button-add-g" color="success" onClick={this.addPlan}><Translate
                                content="addDayPlanTitle"/></Button>
                        </div>
                        <div className="tableContent-employees">
                            <Table id="restaurant-employee">
                                <thead>
                                <tr id="restaurant-edit-employee">
                                    <th><Translate content="day"/></th>
                                    <th><Translate content="startHour"/></th>
                                    <th><Translate content="endHour"/></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                </thead>

                                <tbody>
                                {dayPlans}
                                </tbody>
                            </Table>

                        </div>
                        <div className="form-text-left">
                            <h2 id="edith2"><Translate content="sendedDispositionByEmployee"/></h2>
                        </div>
                        <div className="form-text-left">
                            <h4 id="edit-h4">{this.state.disposition}</h4>
                        </div>


                        <div className="form-submit">
                            <Translate id="submit" component="input" type="submit"
                                       attributes={{value: "close"}} onClick={this.close}/></div>

                    </div>
                </div>
            </div>


        );
    }

}

export default ScheduleEmployeeEdit;
