import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import AuthenticatedRoute from '../../route/AuthenticatedRoute';
import EditRestaurant from "../head/EditRestaurant";
import WorkSchedule from "./WorkSchedule";
import Menu from "../waiter/Menu";
import ScheduleEmployeeList from "./ScheduleEmployeeList";
import ScheduleEmployeeEdit from "./ScheduleEmployeeEdit";
import AddDayPlan from "./AddDayPlan";
import RestaurantInfo from "../waiter/RestaurantInfo";
import YourAccount from "../YourAccount";
import AccountPassword from "../waiter/AccountPassword";
import AccountEdit from "../waiter/AccountEdit";
import TableList from "../waiter/TableList";
import TableOrder from "../waiter/TableOrder";
import OrderAdd from "../waiter/OrderAdd";
import ManageOrders from "./ManageOrders";
import ManageHistory from "./ManageHistory";
import CashBalance from "./CashBalance";

class RestaurantAppForManager extends Component {


    render() {
        return (
            <>
                <Router>
                    <>
                        <Switch>
                            <AuthenticatedRoute path="/" exact component={TableList} />
                            <AuthenticatedRoute path="/menu" exact component={Menu} />
                            <AuthenticatedRoute path="/restaurant/edit" exact component={EditRestaurant} />
                            <AuthenticatedRoute path="/schedule" exact component={WorkSchedule} />
                            <AuthenticatedRoute path="/schedule/edit" exact component={ScheduleEmployeeList} />
                            <AuthenticatedRoute path="/schedule/edit/employee" exact component={ScheduleEmployeeEdit} />
                            <AuthenticatedRoute path="/dayplan/edit" exact component={AddDayPlan} />
                            <AuthenticatedRoute path="/restaurants/info" exact component={RestaurantInfo} />
                            <AuthenticatedRoute path="/account" exact component={YourAccount} />
                            <AuthenticatedRoute path="/account/password" exact component={AccountPassword} />
                            <AuthenticatedRoute path="/account/edit" exact component={AccountEdit} />
                            <AuthenticatedRoute path="/tables" exact component={TableList} />
                            <AuthenticatedRoute path="/tables/order" exact component={TableOrder} />
                            <AuthenticatedRoute path="/tables/order/add" exact component={OrderAdd} />
                            <AuthenticatedRoute path="/orders" exact component={ManageOrders} />
                            <AuthenticatedRoute path="/orders/history" exact component={ManageHistory} />
                            <AuthenticatedRoute path="/cash" exact component={CashBalance} />
                        </Switch>
                    </>
                </Router>
            </>
        )
    }
}

export default RestaurantAppForManager