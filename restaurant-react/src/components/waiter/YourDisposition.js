import React, {Component} from 'react';
import {
    getCurrentUser,
    getEmployeeSchedules, setLanguage,

} from "../../utils/RequestHandler";
import {Table} from "reactstrap";
import Translate from "react-translate-component";

class YourDisposition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedules: [],
            disposition: ""
        };

        this.close = this.close.bind(this);
        this.loadEmployeeSchedule = this.loadEmployeeSchedule.bind(this);
    }


    close() {
        this.props.history.push('/');
    }

    componentWillMount() {
        setLanguage();

        getCurrentUser().then(response => {
            if(response.data.disposition!==null) {
                this.setState({
                    disposition: response.data.disposition.description
                });
            }
            this.loadEmployeeSchedule(response.data.number);
        });
    }

    loadEmployeeSchedule(number) {
        getEmployeeSchedules(number).then(response => {
            this.setState({
                schedules: response.data
            })
        });
    }


    render() {
        let dayPlans = this.state.schedules.map((schedule) => {

            const arr = schedule.date.split('-');

            if (arr[2] > new Date().getDate()) {

                return (
                    <tr key={schedule.id}>
                        <td>{schedule.date}</td>
                        <td>{schedule.startTime}</td>
                        <td>{schedule.endTime}</td>
                    </tr>
                )
            }
        });

        return (
            <div>
                <div id="editContent">
                    <div id="editForm-restaurant">
                        <div className="form-text">
                            <h2 id="edith2"><Translate content="planShow"/></h2>
                        </div>
                        <div className="tableContent-employees">
                            <Table id="restaurant-employee">
                                <thead>
                                <tr id="restaurant-edit-employee">
                                    <th><Translate content="day"/></th>
                                    <th><Translate content="startHour"/></th>
                                    <th><Translate content="endHour"/></th>
                                </tr>
                                </thead>

                                <tbody>
                                {dayPlans}
                                </tbody>
                            </Table>

                        </div>
                        <div className="form-text-left">
                            <h2 id="edith2"><Translate content="sendedDisposition"/></h2>
                        </div>
                        <div className="form-text-left">
                            <h4 id="edit-h4">{this.state.disposition}</h4>
                        </div>


                        <div className="form-submit">
                            <Translate id="submit" component="input" type="submit"
                                       attributes={{value: "close"}} onClick={this.close}/>
                        </div>

                    </div>
                </div>
            </div>


        );
    }

}

export default YourDisposition;
