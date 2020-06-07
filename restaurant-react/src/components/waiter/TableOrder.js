import React, {Component} from 'react';
import './TableOrder.css'

import {Table} from "reactstrap";
import {finishOrder, getEmployeeByOrder, getOrders, setLanguage} from "../../utils/RequestHandler";

import Translate from "react-translate-component";
import counterpart from 'counterpart';

class TableOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table: null,
            order: null,
            employee: null,
            back: "",
            mode: ""
        };

        this.close = this.close.bind(this);
        this.manage = this.manage.bind(this);
        this.add = this.add.bind(this);
        this.loadEmployee = this.loadEmployee.bind(this);
        this.loadOrders = this.loadOrders.bind(this);
        this.print = this.print.bind(this);

    }

    manage() {
        this.props.history.push('/tables/order/add', {order: this.state.order});
    }

    print() {
        finishOrder(this.state.order.id);
        this.close();
    }

    add() {
        this.props.history.push('/tables/order/add', {table: this.state.table});
    }


    close() {
        if (this.state.back != null && this.state.back !== "") {
            if (this.state.back === "managerOrders") {
                this.props.history.push('/orders');
            } else if (this.state.back === "managerHistory") {
                this.props.history.push('/orders/history');
            } else if (this.state.back === "headOrders") {
                this.props.history.push('/allorders');
            } else if (this.state.back === "headHistory") {
                this.props.history.push('/allhistory');
            }
        } else if (this.props.location.state.order != null) {
            this.props.history.push('/your/orders');

        } else if (this.props.location.state.mode != null) {
            this.props.history.push('/your/orders/history');

        } else {
            this.props.history.push('/tables');
        }
        //window.location.reload();
    }

    componentWillMount() {
        setLanguage();

        if (this.props.location.state != null) {
            if (this.props.location.state.table) {
                this.setState({
                    table: this.props.location.state.table
                });

                this.loadOrders();
            }
            if (this.props.location.state.order) {
                this.loadEmployee(this.props.location.state.order.id);
                this.setState({
                    order: this.props.location.state.order
                })
            }
            if (this.props.location.state.mode) {
                this.setState({
                    mode: this.props.location.state.mode
                })
            }
            if (this.props.location.state.back) {
                this.setState({
                    back: this.props.location.state.back
                })
            }
        }
    }

    loadOrders() {
        getOrders(this.props.location.state.table.id).then(response => {
            if (response.data !== null && response.data !== "") {
                this.loadEmployee(response.data.id);
            }
            this.setState({
                order: response.data
            });
        });
    }

    loadEmployee(id) {
        getEmployeeByOrder(id).then(response => {
            this.setState({
                employee: response.data
            })
        })
    }

    render() {
        if (this.state.order !== "" && this.state.order !== null && this.state.employee !== null && this.state.employee !== "") {
            let status = "";
            if (this.state.order.status === "STARTED") {
                status = counterpart.translate("started");
            }
            if (this.state.order.status === "IN_PROGRESS") {
                status = counterpart.translate("inProgress");
            }
            if (this.state.order.status === "ISSUED") {
                status = counterpart.translate("issued");
            }
            if (this.state.order.status === "PAYED") {
                status = counterpart.translate("payed");
            }

            let dishes = this.state.order.dishes.map((dish) => {
                return (
                    <tr key={dish.id}>
                        <td>{dish.name}</td>
                        <td>{dish.price}<Translate content="currency"/></td>
                    </tr>
                )
            });
            if (dishes != null) {
                if (this.state.mode === "viewOnly") {
                    return (
                        <div>

                            <div id="editContent">
                                <div id="editForm-restaurant">
                                    <div className="form-text">
                                        <h2 id="edith2"><Translate content="showOrder"/></h2>
                                    </div>
                                    <div className="tableContent-employees">
                                        <Table id="restaurant-employee">
                                            <thead>
                                            <tr id="restaurant-edit-employee">
                                                <th><Translate content="dishName"/></th>
                                                <th><Translate content="price"/></th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                            {dishes}
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className="form-text">
                                        <h2 id="edith2-space"><Translate
                                            content="waitingTime"/>{this.state.order.timeToGive}<Translate
                                            content="minutes"/></h2>
                                        <h2 id="edith2-space"><Translate content="totalPrice"/>{this.state.order.price}
                                            <Translate content="currency"/></h2>
                                        <h2 id="edith2-space"><Translate content="status"/>: {status}</h2>
                                    </div>
                                    <div className="form-text">
                                        <h2 id="edith2-space"><Translate
                                            content="nameAndSurnameWaiter"/> {this.state.employee.name} {this.state.employee.surname}
                                        </h2>
                                    </div>
                                    <div className="form-text">
                                        <h2 id="edith2"><Translate
                                            content="additionalComments"/> {this.state.order.additionalComments}</h2>
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
                return (
                        <div id="editContent">
                            <div id="editForm-restaurant">
                                <div className="form-text">
                                    <h2 id="edith2"><Translate content="showOrder"/></h2>
                                </div>
                                <div className="tableContent-employees">
                                    <Table id="restaurant-employee">
                                        <thead>
                                        <tr id="restaurant-edit-employee">
                                            <th><Translate content="dishName"/></th>
                                            <th><Translate content="price"/></th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {dishes}
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="form-text">
                                    <h2 id="edith2-space"><Translate
                                        content="waitingTime"/>{this.state.order.timeToGive} <Translate
                                        content="minutes"/></h2>
                                    <h2 id="edith2-space"><Translate content="totalPrice"/>{this.state.order.price}
                                        <Translate content="currency"/></h2>
                                    <h2 id="edith2-space"><Translate content="status"/>: {status}</h2>
                                </div>
                                <div className="form-text">
                                    <h2 id="edith2-space"><Translate
                                        content="nameAndSurnameWaiter"/> {this.state.employee.name} {this.state.employee.surname}
                                    </h2>

                                </div>
                                <div className="form-text">
                                    <h2 id="edith2"><Translate
                                        content="additionalComments"/> {this.state.order.additionalComments}</h2>
                                </div>
                                <div className="form-submit">
                                    <Translate id="submit-restaurant" component="input" type="submit"
                                               attributes={{value: "edit"}} onClick={this.manage}/>
                                    <Translate id="submit-restaurant" component="input" type="submit"
                                               attributes={{value: "pay"}} onClick={this.print}/>
                                    <Translate id="submit" component="input" type="submit"
                                               attributes={{value: "close"}} onClick={this.close}/>
                                </div>

                            </div>
                        </div>
                );
            }
        } else {
            return (
                <div>

                    <div id="editContent">
                        <div id="editForm-restaurant">
                            <div className="form-text">
                                <h2 id="edith2"><Translate content="showOrder"/></h2>
                            </div>
                            <div id="editForm-restaurant">
                                <div className="form-text">
                                    <h2 id="edith2"><Translate content="noOrders"/></h2>
                                </div>

                                <div className="form-submit">
                                    <Translate id="submit-restaurant" component="input" type="submit"
                                               attributes={{value: "addOrder"}} onClick={this.add}/>
                                    <Translate id="submit" component="input" type="submit"
                                               attributes={{value: "close"}} onClick={this.close}/>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default TableOrder;
