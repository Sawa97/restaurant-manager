import React, {Component} from 'react';
import '../head/EditRestaurant.css'
import {
    getCurrentUserRestaurantId,
    getRestaurant, setLanguage
} from "../../utils/RequestHandler";
import {Button, Table} from "reactstrap";
import Translate from "react-translate-component";

class ScheduleEmployeeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hiredEmployees: [],
        };

        this.close = this.close.bind(this);
        this.loadRestaurant = this.loadRestaurant.bind(this);
    }

    manage(employee) {
        this.props.history.push('/schedule/edit/employee', {employee});
        window.location.reload();
    }


    close() {
        this.props.history.push('/schedule');
        window.location.reload();
    }

    componentWillMount() {
        setLanguage();

        getCurrentUserRestaurantId().then(response => {
            this.loadRestaurant(response.data);
        });
    }

    loadRestaurant(id) {
        getRestaurant(id).then(response => {
            this.setState({
                hiredEmployees: response.data.employees,
            })
        });
    }


    render() {
        let hired = this.state.hiredEmployees.map((employee) => {
            return (
                <tr key={employee.id}>
                    <td>{employee.number}</td>
                    <td>{employee.name}</td>
                    <td>{employee.surname}</td>
                    <td className="editTd">
                        <Button className="editButton" color="success"
                                onClick={() => this.manage(employee)} size="sm"><Translate content="manage"/>
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
                            <h2 id="edith2"><Translate content="manageEmployeeSchedule"/></h2>
                        </div>
                        <div className="tableContent-employees">
                            <Table id="restaurant-employee">
                                <thead>
                                <tr id="restaurant-edit-employee">
                                    <th><Translate content="employeeNumberD"/></th>
                                    <th><Translate content="name"/></th>
                                    <th><Translate content="surname"/></th>
                                    <th></th>
                                </tr>
                                </thead>

                                <tbody>
                                {hired}
                                </tbody>
                            </Table>

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

export default ScheduleEmployeeList;
