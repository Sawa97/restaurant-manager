import React, {Component} from 'react';
import '../head/EditRestaurant.css'
import {
    getCurrentUserRestaurantId,
    getRestaurantOrders, setLanguage
} from "../../utils/RequestHandler";
import {Button, Table} from "reactstrap";
import Translate from "react-translate-component";

class RestaurantOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };

        this.loadOrders = this.loadOrders.bind(this);
        this.manage = this.manage.bind(this);
    }


    manage(order) {
        this.props.history.push('/orders/info', {order});
    }

    componentWillMount() {
        setLanguage();

        getCurrentUserRestaurantId().then(response => {
                this.loadOrders(response.data);
            }
        );
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
                            <h2 id="edith2"><Translate content="yourOrders"/></h2>
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
                    </div>
                </div>
            </div>


        );
    }
}


export default RestaurantOrders;
