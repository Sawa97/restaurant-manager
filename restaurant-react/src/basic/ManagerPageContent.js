import React, {Component} from 'react';
import './PageContent.css';
import restaurant from './../images/restaurant.png'
import SecurityService from "../service/SecurityService";
import RestaurantAppForManager from "../components/manager/RestaurantAppForManager";
import Translate from "react-translate-component";
import {setLanguage} from "../utils/RequestHandler";

class ManagerPageContent extends Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        SecurityService.logout();
    }

    componentWillMount() {
        setLanguage();

    }

    render() {
        return (
            <div className="wrapper">
                <header>
                    <div className="header-image">
                        <img src={restaurant} alt="desc" width="50" height="50"/>
                        <a>Red Rib Restaurant</a>
                    </div>

                    <nav className="header-nav">
                        <a href="/tables"><Translate content="hall"/></a>
                        <a href="/account"><Translate content="account"/></a>
                        <a id="logout" onClick={this.props.onLogout}><Translate content="logout"/></a>
                    </nav>
                </header>


                    <div className="sidenav">
                        <a href="/menu">Menu</a>
                        <a href="/restaurant/edit"><Translate content="manageEmployees"/></a>
                        <a href="/schedule"><Translate content="plan"/></a>
                        <a href="/restaurants/info"><Translate content="restaurantsInfo"/></a>
                        <a href="/tables"><Translate content="hall"/></a>
                        <a href="/orders"><Translate content="actualOrders"/></a>
                        <a href="/orders/history"><Translate content="allHistory"/></a>
                        <a href="/cash"><Translate content="restaurantsCash"/></a>
                    </div>

                    <article className="main-content">
                        <RestaurantAppForManager/>
                    </article>

                <footer className="footer">
                    Created by Marcin Sawa
                </footer>
            </div>

        );
    }
}

export default ManagerPageContent;