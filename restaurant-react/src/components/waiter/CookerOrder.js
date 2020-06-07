import React, {Component} from 'react';
import './TableOrder.css'

import {Table} from "reactstrap";
import {editOrder, setLanguage} from "../../utils/RequestHandler";
import {NotificationManager} from "react-notifications";
import Translate from "react-translate-component";

class CookerOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: null,
            waitingTime: ""
        };

        this.close = this.close.bind(this);
        this.manage = this.manage.bind(this);
        this.onChange = this.onChange.bind(this);
        this.editOrder = this.editOrder.bind(this);


    }

    manage() {
        if (this.state.waitingTime !== "") {
            this.editOrder();
            NotificationManager.success(<Translate content="waitingTimeSuccess"/>, <Translate
                content="success"/>, 2000);

        } else {
            NotificationManager.error(<Translate content="waitingTimeError"/>, <Translate content="error"/>, 4000);
        }
    }


    editOrder() {
        let timeToGive = {timeToGive: this.state.waitingTime};

        const body = Object.assign({}, timeToGive);

        editOrder(this.state.order.id, body);
        window.location.reload();
    }


    close() {
        this.props.history.push('/orders');
        window.location.reload();
    }

    componentWillMount() {
        setLanguage();

        if (this.props.location.state != null) {
            if (this.props.location.state.order) {
                this.setState({
                    order: this.props.location.state.order
                });
            }
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }


    render() {
        if (this.state.order !== "" && this.state.order !== null) {
            let dishes = this.state.order.dishes.map((dish) => {
                return (
                    <tr key={dish.id}>
                        <td>{dish.name}</td>
                    </tr>
                )
            });
            if (dishes != null) {
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
                                            <th><Translate content="dish"/></th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {dishes}
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="form-text">
                                    <h4 id="edith2-space"><Translate
                                        content="waitingTime"/> {this.state.order.timeToGive} <Translate
                                        content="minutes"/></h4>
                                    <h4 className="edit-h4"><Translate content="waitingTimeSet"/></h4>
                                    <input id="text-restaurant-tables" name="waitingTime" type="number"
                                           onChange={this.onChange}/>
                                </div>
                                <div className="form-text">
                                    <h2 id="edith2"><Translate
                                        content="additionalComments"/> {this.state.order.additionalComments}</h2>
                                </div>
                                <div className="form-submit">
                                    <Translate id="submit-restaurant" component="input" type="submit"
                                               attributes={{value: "send"}} onClick={this.manage}/>
                                    <Translate id="submit" component="input" type="submit"
                                               attributes={{value: "close"}} onClick={this.close}/>
                                </div>
                            </div>
                        </div>
                    </div>
                );
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
}

export default CookerOrder;
