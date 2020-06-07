import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import AuthenticatedRoute from '../../route/AuthenticatedRoute';
import Menu from "./Menu";
import AddDisposition from "./AddDisposition";
import RestaurantInfo from "./RestaurantInfo";
import YourAccount from "../YourAccount";
import AccountPassword from "./AccountPassword";
import AccountEdit from "./AccountEdit";
import TableList from "./TableList";
import TableOrder from "./TableOrder";
import OrderAdd from "./OrderAdd";
import ListOfYourOrders from "./ListOfYourOrders";
import YourOrderHistory from "./YourOrderHistory";
import YourDisposition from "./YourDisposition";

class RestaurantApp extends Component {


    render() {
        return (
            <>
                <Router>
                    <>
                        <Switch>
                            <AuthenticatedRoute path="/" exact component={TableList} />
                            <AuthenticatedRoute path="/menu" exact component={Menu} />
                            <AuthenticatedRoute path="/dispositions/add" exact component={AddDisposition} />
                            <AuthenticatedRoute path="/restaurants/info" exact component={RestaurantInfo} />
                            <AuthenticatedRoute path="/account" exact component={YourAccount} />
                            <AuthenticatedRoute path="/account/password" exact component={AccountPassword} />
                            <AuthenticatedRoute path="/account/edit" exact component={AccountEdit} />
                            <AuthenticatedRoute path="/tables" exact component={TableList} />
                            <AuthenticatedRoute path="/tables/order" exact component={TableOrder} />
                            <AuthenticatedRoute path="/tables/order/add" exact component={OrderAdd} />
                            <AuthenticatedRoute path="/your/orders" exact component={ListOfYourOrders} />
                            <AuthenticatedRoute path="/your/orders/history" exact component={YourOrderHistory} />
                            <AuthenticatedRoute path="/dispositions" exact component={YourDisposition} />

                        </Switch>
                    </>
                </Router>
            </>
        )
    }
}

export default RestaurantApp