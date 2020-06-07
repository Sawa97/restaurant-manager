import React, {Component} from 'react';
import '../head/EditMenu.css'
import {addDayPlan, setLanguage} from "../../utils/RequestHandler";
import {NotificationManager} from "react-notifications";
import Translate from "react-translate-component";

class AddDayPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            startTime: null,
            endTime: null,
            employee: null
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.close = this.close.bind(this);
    }

    componentWillMount() {
        setLanguage();
        if (this.props.location.state != null) {
            this.setState({
                employee: this.props.location.state.employee
            })
        }
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value})

    }

    close() {
        this.props.history.push('/schedule/edit/employee', {employee: this.state.employee});
        window.location.reload();
    }

    onSubmit() {

        if (this.state.date !== null && this.state.startTime !== null && this.state.endTime !== null) {

            let employee = {employee: this.state.employee};
            let date = {date: this.state.date};
            let startTime = {startTime: this.state.startTime};
            let endTime = {endTime: this.state.endTime};
            const body = Object.assign({}, employee, date, startTime, endTime);

            addDayPlan(body);
            NotificationManager.success(<Translate content="addDayPlanSuccess"/>, <Translate content="success"/>, 2000);

            this.close();
        } else {
            NotificationManager.error(<Translate content="addDayPlanError"/>, <Translate content="error"/>, 2000);
        }
    }

    render() {
        return (
            <div id="editContent">
                <div id="editForm-restaurant">
                    <div className="form-text">
                        <h2 id="edith2"><Translate content="addDayPlanTitle"/></h2>
                    </div>
                    <div className="form-dish-name">
                        <h4 className="edit-h4"><Translate content="day"/></h4>
                        <input id="text-dish-name" name="date" type="date" onChange={this.onChange}/>
                    </div>
                    <div className="form-dish-price">
                        <h4 className="edit-h4"><Translate content="startHour"/></h4>
                        <input id="text-dish-price" name="startTime" type="time" min="09:00" max="22:00"
                               onChange={this.onChange}/>
                    </div>
                    <div className="form-dish-desc">
                        <h4 className="edit-h4"><Translate content="endHour"/></h4>
                        <input id="text-dish-price" name="endTime" type="time" min="09:00" max="22:00"
                               onChange={this.onChange}/></div>
                    <div className="form-submit">
                        <Translate id="submit-restaurant" component="input" type="submit"
                                   attributes={{value: "add"}} onClick={this.onSubmit}/>
                        <Translate id="submit" component="input" type="submit"
                                   attributes={{value: "close"}} onClick={this.close}/>
                    </div>
                </div>


            </div>
        );

    }

}

export default AddDayPlan;
