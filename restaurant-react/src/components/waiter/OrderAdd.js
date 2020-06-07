import React, {Component} from 'react';
import './OrderAdd.css'

import {Button, Table} from "reactstrap";
import {addOrder, editOrder, getCurrentUser, getMenu, setLanguage} from "../../utils/RequestHandler";
import {NotificationManager} from "react-notifications";
import Translate from "react-translate-component";


class OrderAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table: null,
            dishesToAdd: [],
            allDishes: [],
            searchContext: "",
            description: "",
            waiter: null,
            order: null,
            mode: ""
        };

        this.close = this.close.bind(this);
        this.addDish = this.addDish.bind(this);
        this.onChange = this.onChange.bind(this);
        this.deleteDish = this.deleteDish.bind(this);
        this.addOrder = this.addOrder.bind(this);
        this.editOrder = this.editOrder.bind(this);

    }

    addDish(dish) {
        this.setState({
            dishesToAdd: this.state.dishesToAdd.concat(dish)
        })
    }

    deleteDish(dish) {
        let array = [...this.state.dishesToAdd];
        let index = array.indexOf(dish);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({dishesToAdd: array});
        }
    }


    addOrder() {
        if (this.state.dishes != null) {
            let table = {table: this.state.table};
            let additionalComments = {additionalComments: this.state.description};
            let dishes = {dishes: this.state.dishesToAdd};

            const body = Object.assign({}, table, additionalComments, dishes);

            addOrder(body, this.state.waiter.id);
            NotificationManager.success(<Translate content="addOrderSuccess"/>, <Translate content="success"/>, 2000);

            this.close();
        } else {
            NotificationManager.error(<Translate content="addOrderError"/>, <Translate content="error"/>, 4000);
        }
    }

    editOrder() {
        if (this.state.dishes != null) {
            let additionalComments = {additionalComments: this.state.description};
            let dishes = {dishes: this.state.dishesToAdd};

            const body = Object.assign({}, additionalComments, dishes);

            editOrder(this.state.order.id, body);
            NotificationManager.success(<Translate content="addOrderSuccess"/>, <Translate content="success"/>, 2000);
            this.close();
        } else {
            NotificationManager.error(<Translate content="addOrderError"/>, <Translate content="error"/>, 4000);
        }
    }


    close() {
        this.props.history.push('/tables');
        window.location.reload();
    }

    componentWillMount() {
        setLanguage();

        if (this.props.location.state != null) {
            if (this.props.location.state.table != null) {
                this.setState({
                    table: this.props.location.state.table,
                    mode: "add"
                });
            }

            if (this.props.location.state.order != null) {
                this.setState({
                    order: this.props.location.state.order,
                    mode: "edit",
                    description: this.props.location.state.order.additionalComments,
                    dishesToAdd: this.props.location.state.order.dishes
                })
            }
        }

        getMenu().then(response => {
            this.setState({
                allDishes: response.data
            })
        });

        getCurrentUser().then(response => {
            this.setState({
                waiter: response.data
            })
        })
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        let dishes;
        if (this.state.searchContext.length > 3) {
            dishes = this.state.allDishes.map((dish) => {
                if (dish.name.startsWith(this.state.searchContext)) {
                    return (
                        <tr key={dish.id}>
                            <td>{dish.name}</td>
                            <td>{dish.price}<Translate content="currency"/></td>
                            <td className="editTd">
                                <Button className="editButton" color="success" onClick={() => this.addDish(dish)}
                                        size="sm"><Translate content="add"/></Button>
                            </td>
                        </tr>
                    )
                }
            });
        }
        let dishesAdded;
        dishesAdded = this.state.dishesToAdd.map((dish) => {
            return (
                <tr key={dish.id}>
                    <td>{dish.name}</td>
                    <td>{dish.price}<Translate content="currency"/></td>
                    <td className="editTd">
                        <Button className="editButton" color="danger" onClick={() => this.deleteDish(dish)}
                                size="sm"><Translate content="delete"/></Button>
                    </td>
                </tr>
            )
        });

        if (this.state.mode === "add") {
            return (
                <div>
                    <div id="editContent">
                        <div id="editForm-restaurant">
                            <div className="form-text">
                                <h2 id="edith2"><Translate content="addOrder"/></h2>
                            </div>
                            <div className="form-dish-desc">
                                <h4 className="edit-h4"><Translate content="searchDish"/></h4>
                                <input id="text-dish-name" name="searchContext" type="text"
                                       defaultValue={this.state.searchContext}
                                       onChange={this.onChange}/></div>
                            <div className="tableContent-employees">
                                <Table id="restaurant-employee">
                                    <thead>
                                    <tr id="restaurant-edit-employee">
                                        <th><Translate content="dishName"/></th>
                                        <th><Translate content="price"/></th>
                                        <th></th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {dishes}
                                    </tbody>
                                </Table>
                            </div>
                            <div id="editForm-restaurant">
                                <div className="form-text">
                                    <h2 id="edith2"><Translate content="addedDishes"/></h2>
                                </div>
                                <div className="tableContent-employees">
                                    <Table id="restaurant-employee">
                                        <thead>
                                        <tr id="restaurant-edit-employee">
                                            <th><Translate content="dishName"/></th>
                                            <th><Translate content="price"/></th>
                                            <th></th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {dishesAdded}
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="form-dish-desc">
                                    <h4 className="edit-h4"><Translate content="additionalComments"/></h4>
                                </div>
                                <div className="text-dish-desc-input">
                                    <input id="text-dish-desc" name="description" type="text"
                                           defaultValue={this.state.description}
                                           onChange={this.onChange}/>
                                </div>
                                <div className="form-submit">
                                    <Translate id="submit-restaurant" component="input" type="submit"
                                               attributes={{value: "setOrder"}} onClick={this.addOrder}/>
                                    <Translate id="submit" component="input" type="submit"
                                               attributes={{value: "close"}} onClick={this.close}/>
                                </div>

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
                                <h2 id="edith2"><Translate content="editOrder"/></h2>
                            </div>
                            <div className="form-dish-desc">
                                <h4 className="edit-h4"><Translate content="searchDish"/></h4>
                                <input id="text-dish-name" name="searchContext" type="text"
                                       defaultValue={this.state.searchContext}
                                       onChange={this.onChange}/></div>
                            <div className="tableContent-employees">
                                <Table id="restaurant-employee">
                                    <thead>
                                    <tr id="restaurant-edit-employee">
                                        <th><Translate content="dishName"/></th>
                                        <th><Translate content="price"/></th>
                                        <th></th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {dishes}
                                    </tbody>
                                </Table>
                            </div>
                            <div id="editForm-restaurant">
                                <div className="form-text">
                                    <h2 id="edith2"><Translate content="addedDishes"/></h2>
                                </div>
                                <div className="tableContent-employees">
                                    <Table id="restaurant-employee">
                                        <thead>
                                        <tr id="restaurant-edit-employee">
                                            <th><Translate content="dishName"/></th>
                                            <th><Translate content="price"/></th>
                                            <th></th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {dishesAdded}
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="form-dish-desc">
                                    <h4 className="edit-h4"><Translate content="additionalComments"/></h4>
                                </div>
                                <div className="text-dish-desc-input">
                                    <input id="text-dish-desc" name="description" type="text"
                                           defaultValue={this.state.description}
                                           onChange={this.onChange}/>
                                </div>
                                <div className="form-submit">
                                    <Translate id="submit-restaurant" component="input" type="submit"
                                               attributes={{value: "editOrder"}} onClick={this.editOrder}/>
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

export default OrderAdd;
