import React, {Component} from 'react';
import '../head/EditRestaurant.css'
import {
    deleteOrder,
    getCurrentUserRestaurantId,
    getRestaurantOrders, setLanguage
} from "../../utils/RequestHandler";
import {Button, Table} from "reactstrap";
import Translate from "react-translate-component";

class ManageOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            back: "managerOrders"
        };

        this.close = this.close.bind(this);
        this.loadOrders = this.loadOrders.bind(this);
        this.delete = this.delete.bind(this);
    }


    manage(order) {
        this.props.history.push('/tables/order', {order, back: this.state.back});
    }

    close() {
        this.props.history.push('/');
    }

    delete(order) {
        deleteOrder(order.id);

        let array = [...this.state.orders];
        let index = array.indexOf(order);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({orders: array});
        }
    }

    componentWillMount() {
        setLanguage();

        if (this.props.location.state != null) {
            if (this.props.location.state.id) {
                this.loadOrders(this.props.location.state.id);
            }
            if (this.props.location.state.back) {
                this.setState({
                    back: this.props.location.state.back
                })
            }
        } else {
            getCurrentUserRestaurantId().then(response => {
                    this.loadOrders(response.data);
                }
            );
        }
    }

    loadOrders(id) {
        getRestaurantOrders(id).then(response => {
            this.setState({
                orders: response.data
            })
        })
    }


    render() {
        let orders = this.state.orders.map((order) => {
            if (order.status === "IN_PROGRESS") {
                return (
                    <tr key={order.id}>
                        <td>{order.table.number}</td>
                        <td>{order.startTime}</td>

                        <td className="editTd">
                            <Button className="editButton" color="success"
                                    onClick={() => this.manage(order)} size="sm"><Translate content="showOrder"/>
                            </Button>
                            <Button className="editButton" color="danger"
                                    onClick={() => this.delete(order)} size="sm"><Translate content="cancelOrder"/>
                            </Button>
                        </td>
                    </tr>
                )
            }
        });

        return (
            <div>

                <div id="editContent">
                    <div id="editForm-restaurant">
                        <div className="form-text">
                            <h2 id="edith2"><Translate content="actualOrders"/></h2>
                        </div>
                        <div className="tableContent-employees">
                            <Table id="restaurant-employee">
                                <thead>
                                <tr id="restaurant-edit-employee">
                                    <th><Translate content="tableNumber"/></th>
                                    <th><Translate content="startTime"/></th>
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

export default ManageOrders;
