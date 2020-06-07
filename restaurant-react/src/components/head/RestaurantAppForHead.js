import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import AuthenticatedRoute from '../../route/AuthenticatedRoute';
import Menu from '../waiter/Menu';
import MenuHead from "./MenuHead";
import EditMenu from "./EditMenu";
import RestaurantsList from "./RestaurantsList";
import RestaurantInfo from "../waiter/RestaurantInfo";
import EditRestaurant from "./EditRestaurant";
import AddRestaurant from "./AddRestaurant";
import YourAccount from "../YourAccount";
import AccountPassword from "../waiter/AccountPassword";
import AccountEdit from "../waiter/AccountEdit";
import AddEmployee from "./AddEmployee";
import ManageAllRestaurantsHistory from "./ManageAllRestaurantsHistory";
import ManageAllRestaurantsOrders from "./ManageAllRestaurantsOrders";
import TableList from "../waiter/TableList";
import TableOrder from "../waiter/TableOrder";
import OrderAdd from "../waiter/OrderAdd";
import ManageOrders from "../manager/ManageOrders";
import ManageHistory from "../manager/ManageHistory";
import RestaurantListCash from "./RestaurantListCash";
import CashBalance from "../manager/CashBalance";

class RestaurantAppForHead extends Component {


    render() {
        return (
            <>
                <Router>
                    <>
                        <Switch>
                            <AuthenticatedRoute path="/" exact component={ManageAllRestaurantsOrders} />
                            <AuthenticatedRoute path="/menu" exact component={MenuHead} />
                            <AuthenticatedRoute path="/menu/new" exact component={Menu} />
                            <AuthenticatedRoute path="/menu/edit" exact component={EditMenu} />
                            <AuthenticatedRoute path="/menu/add" exact component={EditMenu} />
                            <AuthenticatedRoute path="/restaurants" exact component={RestaurantsList} />
                            <AuthenticatedRoute path="/restaurants/info" exact component={RestaurantInfo} />
                            <AuthenticatedRoute path="/restaurants/edit" exact component={EditRestaurant} />
                            <AuthenticatedRoute path="/restaurants/add" exact component={AddRestaurant} />
                            <AuthenticatedRoute path="/account" exact component={YourAccount} />
                            <AuthenticatedRoute path="/account/password" exact component={AccountPassword} />
                            <AuthenticatedRoute path="/account/edit" exact component={AccountEdit} />
                            <AuthenticatedRoute path="/employee/add" exact component={AddEmployee} />
                            <AuthenticatedRoute path="/tables" exact component={TableList} />
                            <AuthenticatedRoute path="/tables/order" exact component={TableOrder} />
                            <AuthenticatedRoute path="/tables/order/add" exact component={OrderAdd} />
                            <AuthenticatedRoute path="/orders" exact component={ManageOrders} />
                            <AuthenticatedRoute path="/orders/history" exact component={ManageHistory} />
                            <AuthenticatedRoute path="/allhistory" exact component={ManageAllRestaurantsHistory} />
                            <AuthenticatedRoute path="/allorders" exact component={ManageAllRestaurantsOrders} />
                            <AuthenticatedRoute path="/restaurantscash" exact component={RestaurantListCash} />
                            <AuthenticatedRoute path="/cash" exact component={CashBalance} />
                        </Switch>
                    </>
                </Router>
            </>
        )
    }
}

export default RestaurantAppForHead