import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import AuthenticatedRoute from '../../route/AuthenticatedRoute';
import Menu from "./Menu";
import AddDisposition from "./AddDisposition";
import RestaurantInfo from "./RestaurantInfo";
import YourAccount from "../YourAccount";
import AccountPassword from "./AccountPassword";
import AccountEdit from "./AccountEdit";
import RestaurantOrders from "./RestaurantOrders";
import CookerOrder from "./CookerOrder";
import YourDisposition from "./YourDisposition";

class RestaurantAppForCooker extends Component {


    render() {
        return (
            <>
                <Router>
                    <>
                        <Switch>
                            <AuthenticatedRoute path="/" exact component={RestaurantOrders} />
                            <AuthenticatedRoute path="/menu" exact component={Menu} />
                            <AuthenticatedRoute path="/dispositions/add" exact component={AddDisposition} />
                            <AuthenticatedRoute path="/restaurants/info" exact component={RestaurantInfo} />
                            <AuthenticatedRoute path="/account" exact component={YourAccount} />
                            <AuthenticatedRoute path="/account/password" exact component={AccountPassword} />
                            <AuthenticatedRoute path="/account/edit" exact component={AccountEdit} />
                            <AuthenticatedRoute path="/orders" exact component={RestaurantOrders} />
                            <AuthenticatedRoute path="/orders/info" exact component={CookerOrder} />
                            <AuthenticatedRoute path="/dispositions" exact component={YourDisposition} />

                        </Switch>
                    </>
                </Router>
            </>
        )
    }
}

export default RestaurantAppForCooker