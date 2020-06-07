import React, {Component} from 'react';
import './EditRestaurant.css'
import {
    addTable, deleteTable, editRestaurant, getCurrentUser, getCurrentUserRestaurantId,
    getEmployees,
    getEmployeesNotHired,
    getRestaurant, setLanguage
} from "../../utils/RequestHandler";
import {Button, Table} from "reactstrap";
import {NotificationManager} from "react-notifications";
import Translate from "react-translate-component";

class EditRestaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: "",
            currentlyDisplayed: "address",
            id: null,
            city: "",
            address: "",
            manager: null,
            employees: [],
            availableEmployees: [],
            hiredEmployees: [],
            capacityTableToAdd: null,
            numberTableToAdd: null,
            tables: []
        };

        this.pickManagerPage = this.pickManagerPage.bind(this);
        this.pickEmployeePage = this.pickEmployeePage.bind(this);
        this.pickTablePage = this.pickTablePage.bind(this);
        this.pickAddressPage = this.pickAddressPage.bind(this);
        this.close = this.close.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.loadEmployees = this.loadEmployees.bind(this);
        this.editManager = this.editManager.bind(this);
        this.addEmployee = this.addEmployee.bind(this);
        this.loadEmployeeNotHired = this.loadEmployeeNotHired.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.deleteTable = this.deleteTable.bind(this);
        this.addTable = this.addTable.bind(this);

    }

    pickManagerPage() {
        this.setState({
            currentlyDisplayed: "manager"
        })
    }

    pickEmployeePage() {
        this.setState({
            currentlyDisplayed: "employee"
        })
    }

    pickTablePage() {
        this.setState({
            currentlyDisplayed: "table"
        })
    }

    pickAddressPage() {
        this.setState({
            currentlyDisplayed: "address"
        })
    }

    onSubmit() {
        if (this.state.address !== "" && this.state.city !== "" && this.state.manager !== null && this.state.manager !== "" && this.state.hiredEmployees !== null && this.state.hiredEmployees !== "" && this.state.tables !== "" && this.state.tables !== null) {

            let address = {address: this.state.address};
            let city = {city: this.state.city};
            let manager = {manager: this.state.manager};
            let employees = {employees: this.state.hiredEmployees};
            let tables = {tables: this.state.tables};
            let schedule = {schedule: null};


            const body = Object.assign({}, city, address, manager, employees, tables, schedule);

            editRestaurant(this.state.id, body);
            if (this.state.role === "HEAD") {
                this.props.history.push('/restaurants');
            } else {
                this.props.history.push('/menu');
            }
            NotificationManager.success(<Translate content="editRestaurantSuccess"/>, <Translate
                content="success"/>, 2000);
            window.location.reload();
        } else {
            NotificationManager.error(<Translate content="addNewRestaurantError"/>, <Translate content="error"/>, 4000);
        }
    }

    addTable() {
        let number = {number: this.state.numberTableToAdd};
        let capacity = {capacity: this.state.capacityTableToAdd};
        const body = Object.assign(number, capacity);
        addTable(body).then(response => (
            this.setState({
                tables: this.state.tables.concat(response.data)
            })
        ))

    }

    deleteTable(table) {
        deleteTable(table.id);

        let array = [...this.state.tables];
        let index = array.indexOf(table);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({tables: array});
        }
    }

    addEmployee(employee) {

        this.setState({
            hiredEmployees: this.state.hiredEmployees.concat(employee)
        });

        let array = [...this.state.availableEmployees];
        let index = array.indexOf(employee);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({availableEmployees: array});
        }
    }

    deleteEmployee(employee) {

        this.setState({
            availableEmployees: this.state.availableEmployees.concat(employee)
        });

        let array = [...this.state.hiredEmployees];
        let index = array.indexOf(employee);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({hiredEmployees: array});
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    close() {
        this.props.history.push('/restaurants');
        window.location.reload();
    }

    editManager(employee) {
        this.setState({
            manager: employee,
        })
    }

    componentWillMount() {
        setLanguage();
        getCurrentUser().then(response => {
            this.setState({
                role: response.data.role,
            });

            if (this.state.role === "MANAGER") {
                getCurrentUserRestaurantId().then(response => {
                    this.loadRestaurant(response.data);
                    this.loadEmployeeNotHired(response.data);
                    this.setState({
                        currentlyDisplayed: "employee"
                    });
                });
            }

            if (this.state.role === "HEAD") {
                if (this.props.location.state != null) {
                    this.loadRestaurant(this.props.location.state.id);
                    this.loadEmployeeNotHired(this.props.location.state.id);
                }
                this.loadEmployees();
            }

        });
    }

    loadEmployeeNotHired(id) {
        getEmployeesNotHired(id).then(response => {
            this.setState({
                availableEmployees: response.data
            })
        });
    }


    loadRestaurant(id) {
        getRestaurant(id).then(response => {
            this.setState({
                city: response.data.city,
                address: response.data.address,
                id: response.data.id,
                tables: response.data.tables,
                hiredEmployees: response.data.employees,
                manager: response.data.manager
            })
        });
    }

    loadEmployees() {
        getEmployees().then(response => {
            this.setState({
                employees: response.data
            })
        });
    }


    render() {
        if (this.state.currentlyDisplayed === "address") {
            return (
                <div>
                    <div className="button-menu">
                        <button className="button-dish" onClick={this.pickAddressPage}><Translate content="address"/>
                        </button>
                        <button className="button-dish" onClick={this.pickManagerPage}><Translate content="manager"/>
                        </button>
                        <button className="button-dish" onClick={this.pickEmployeePage}><Translate content="employees"/>
                        </button>
                        <button className="button-dish" onClick={this.pickTablePage}><Translate content="tables"/>
                        </button>
                    </div>


                    <div id="editContent">
                        <div id="editForm-restaurant">
                            <div className="form-text">
                                <h2 id="edith2"><Translate content="addressData"/></h2>
                            </div>
                            <div className="form-dish-name">
                                <h4 className="edit-h4"><Translate content="city"/></h4>
                                <input id="text-restaurant-city" name="city" type="text" defaultValue={this.state.city}
                                       onChange={this.onChange}/>
                            </div>
                            <div className="form-dish-price">
                                <h4 className="edit-h4"><Translate content="address"/></h4>
                                <input id="text-restaurant-address" name="address" type="text"
                                       defaultValue={this.state.address}
                                       onChange={this.onChange}/>
                            </div>
                            <div className="form-submit">
                                <Translate id="submit-restaurant" component="input" type="submit"
                                           attributes={{value: "saveAll"}} onClick={this.onSubmit}/>
                                <Translate id="submit" component="input" type="submit"
                                           attributes={{value: "close"}} onClick={this.close}/>
                            </div>
                        </div>


                    </div>


                </div>
            );
        }
        if (this.state.currentlyDisplayed === "employee") {

            let employees = this.state.availableEmployees.map((employee) => {
                return (
                    <tr key={employee.id}>
                        <td>{employee.number}</td>
                        <td>{employee.name}</td>
                        <td>{employee.surname}</td>
                        <td className="editTd">
                            <Button className="editButton" color="success"
                                    onClick={() => this.addEmployee(employee)} size="sm"><Translate
                                content="addEmployee"/></Button>
                        </td>
                    </tr>
                )
            });

            let hired = this.state.hiredEmployees.map((employee) => {
                return (
                    <tr key={employee.id}>
                        <td>{employee.number}</td>
                        <td>{employee.name}</td>
                        <td>{employee.surname}</td>
                        <td className="editTd">
                            <Button className="editButton" color="danger"
                                    onClick={() => this.deleteEmployee(employee)} size="sm"><Translate
                                content="firedEmployee"/></Button>
                        </td>
                    </tr>
                )
            });

            if (this.state.role === "MANAGER") {
                return (<div>

                    <div id="editContent">
                        <div id="editForm-restaurant">
                            <div className="form-text">
                                <h2 id="edith2"><Translate content="manageEmployeesTitle"/></h2>
                            </div>
                            <div className="form-dish-name">
                                <h4 className="edit-h4"><Translate content="actaulEmployeesList"/></h4>
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
                            <div className="form-dish-name">
                                <h4 className="edit-h4"><Translate content="possibleEmployees"/></h4>
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
                                    {employees}
                                    </tbody>
                                </Table>
                            </div>
                            <div className="form-submit">
                                <Translate id="submit-restaurant" component="input" type="submit"
                                           attributes={{value: "saveAll"}} onClick={this.onSubmit}/>
                                <Translate id="submit" component="input" type="submit"
                                           attributes={{value: "close"}} onClick={this.close}/>
                            </div>
                        </div>

                    </div>


                </div>);
            } else {
                return (
                    <div>
                        <div className="button-menu">
                            <button className="button-dish" onClick={this.pickAddressPage}><Translate
                                content="address"/>
                            </button>
                            <button className="button-dish" onClick={this.pickManagerPage}><Translate
                                content="manager"/>
                            </button>
                            <button className="button-dish" onClick={this.pickEmployeePage}><Translate
                                content="employees"/>
                            </button>
                            <button className="button-dish" onClick={this.pickTablePage}><Translate content="tables"/>
                            </button>
                        </div>


                        <div id="editContent">
                            <div id="editForm-restaurant">
                                <div className="form-text">
                                    <h2 id="edith2"><Translate content="manageEmployeesTitle"/></h2>
                                </div>
                                <div className="form-dish-name">
                                    <h4 className="edit-h4"><Translate content="actaulEmployeesList"/></h4>
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
                                <div className="form-dish-name">
                                    <h4 className="edit-h4"><Translate content="possibleEmployees"/></h4>
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
                                        {employees}
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="form-submit">
                                    <input id="submit-restaurant" type="submit" value="Zapisz wszystko"
                                           onClick={this.onSubmit}/>
                                    <input id="submit" type="submit" value="Wyjdź" onClick={this.close}/>
                                </div>
                            </div>

                        </div>


                    </div>
                );
            }
        }
        if (this.state.currentlyDisplayed === "manager") {

            let employees = this.state.employees.map((employee) => {
                return (
                    <tr key={employee.id}>
                        <td>{employee.number}</td>
                        <td>{employee.name}</td>
                        <td>{employee.surname}</td>
                        <td className="editTd">
                            <Button className="editButton" color="success"
                                    onClick={() => this.editManager(employee)} size="sm"><Translate
                                content="pick"/></Button>
                        </td>
                    </tr>
                )
            });

            return (
                <div>
                    <div className="button-menu">
                        <button className="button-dish" onClick={this.pickAddressPage}><Translate content="address"/>
                        </button>
                        <button className="button-dish" onClick={this.pickManagerPage}><Translate content="manager"/>
                        </button>
                        <button className="button-dish" onClick={this.pickEmployeePage}><Translate content="employees"/>
                        </button>
                        <button className="button-dish" onClick={this.pickTablePage}><Translate content="tables"/>
                        </button>
                    </div>


                    <div id="editContent">
                        <div id="editForm-restaurant">
                            <div className="form-text">
                                <h2 id="edith2"><Translate content="manageManager"/></h2>
                            </div>
                            <div className="form-dish-name">
                                <h4 className="edit-h4"><Translate content="actualManager"/></h4>
                                <h3 className="edit-h4">{this.state.manager.name} {this.state.manager.surname}</h3>
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
                                    {employees}
                                    </tbody>
                                </Table>
                            </div>
                            <div className="form-submit">
                                <Translate id="submit-restaurant" component="input" type="submit"
                                           attributes={{value: "saveAll"}} onClick={this.onSubmit}/>
                                <Translate id="submit" component="input" type="submit"
                                           attributes={{value: "close"}} onClick={this.close}/>
                            </div>
                        </div>

                    </div>


                </div>
            );
        }
        if (this.state.currentlyDisplayed === "table") {
            let tables = this.state.tables.map((table) => {
                return (
                    <tr key={table.id}>
                        <td>{table.number}</td>
                        <td>{table.capacity}</td>
                        <td className="editTd">
                            <Button className="editButton" color="danger" onClick={() => this.deleteTable(table)}
                                    size="sm"><Translate content="deleteTable"/></Button>
                        </td>
                    </tr>
                )
            });

            return (
                <div>
                    <div className="button-menu">
                        <button className="button-dish" onClick={this.pickAddressPage}><Translate content="address"/>
                        </button>
                        <button className="button-dish" onClick={this.pickManagerPage}><Translate content="manager"/>
                        </button>
                        <button className="button-dish" onClick={this.pickEmployeePage}><Translate content="employees"/>
                        </button>
                        <button className="button-dish" onClick={this.pickTablePage}><Translate content="tables"/>
                        </button>
                    </div>


                    <div id="editContent">
                        <div id="editForm-restaurant">
                            <div className="form-text">
                                <h2 id="edith2"><Translate content="manageTables"/></h2>
                            </div>
                            <div className="form-dish-name">
                                <h4 className="edit-h4"><Translate content="actualTableList"/></h4>
                            </div>

                            <div className="tableContent-employees">
                                <Table id="restaurant-employee">
                                    <thead>
                                    <tr id="restaurant-edit-employee">
                                        <th><Translate content="tableNumber"/></th>
                                        <th><Translate content="numberOfSeats"/></th>
                                        <th></th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {tables}
                                    </tbody>
                                </Table>
                            </div>
                            <div className="form-table-add">
                                <h4 className="edit-h4"><Translate content="addNewTable"/></h4></div>
                            <div className="form-dish-price">
                                <h4 className="edit-h4"><Translate content="numberOfSeats"/></h4>
                                <input id="text-restaurant-tables" name="capacityTableToAdd" type="number"
                                       onChange={this.onChange}/>
                                       onChange={this.onChange}/>
                            </div>
                            <div className="form-dish-price">
                                <h4 className="edit-h4"><Translate content="tableNumber"/></h4>
                                <input id="text-restaurant-tables" name="numberTableToAdd" type="number"
                                       onChange={this.onChange}/>
                                <Button className="addTableButton" color="success" onClick={() => this.addTable()}
                                        size="sm"><Translate content="addTable"/></Button>
                            </div>

                            <div className="form-submit">
                                <Translate id="submit-restaurant" component="input" type="submit"
                                           attributes={{value: "saveAll"}} onClick={this.onSubmit}/>
                                <Translate id="submit" component="input" type="submit"
                                           attributes={{value: "close"}} onClick={this.close}/>
                            </div>
                        </div>

                    </div>
                </div>
            );
        }

    }


}

export default EditRestaurant;
