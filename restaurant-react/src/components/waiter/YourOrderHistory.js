import React, {Component} from 'react';
import '../head/EditRestaurant.css'
import {
    getCurrentUser, getEmployeeOrders, setLanguage
} from "../../utils/RequestHandler";
import {Button, Table} from "reactstrap";

import Translate from "react-translate-component";
import counterpart from 'counterpart';

class YourOrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };

        this.close = this.close.bind(this);
        this.loadOrders = this.loadOrders.bind(this);
        this.manage = this.manage.bind(this);

    }


    manage(order) {
        this.props.history.push('/tables/order', {order, mode: "viewOnly"});
    }

    close() {
        this.props.history.push('/');
    }

    componentWillMount() {
        setLanguage();

        getCurrentUser().then(response => {
                this.loadOrders(response.data.id);
            }
        );
    }

    loadOrders(id) {
        getEmployeeOrders(id).then(response => {
            this.setState({
                orders: response.data
            })
        })
    }


    render() {
        let orders = this.state.orders.map((order) => {
            let endTime;
            let status;
            if (order.endTime == null || order.endTime === "") {
                endTime = ""
            }
            if (order.status === "PAYED") {
                status = counterpart.translate("payed");
            }
            if (order.status === "IN_PROGRESS") {
                status = counterpart.translate("inProgress");
            } else {
                endTime = order.endTime;
            }
            return (
                <tr key={order.id}>
                    <td>{order.table.number}</td>
                    <td>{order.startTime}</td>
                    <td>{endTime}</td>
                    <td>{order.date.substring(0, order.date.indexOf('T'))}</td>
                    <td>{status}</td>
                    <td>{order.price}<Translate content="currency"/></td>


                    <td className="editTd">
                        <Button className="editButton" color="success"
                                onClick={() => this.manage(order)} size="sm"><Translate content="showOrder"/>
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
                            <h2 id="edith2"><Translate content="allYourOrders"/></h2>
                        </div>
                        <div className="tableContent-employees">
                            <Table id="restaurant-employee">
                                <thead>
                                <tr id="restaurant-edit-employee">
                                    <th><Translate content="tableNumber"/></th>
                                    <th><Translate content="startTime"/></th>
                                    <th><Translate content="endTime"/></th>
                                    <th><Translate content="date"/></th>
                                    <th><Translate content="status"/></th>
                                    <th><Translate content="price"/></th>

                                    <th></th>
                                </tr>
                                </thead>

                                <tbody>
                                {orders}
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

export default YourOrderHistory;
