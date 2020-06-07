import React, {Component} from 'react';
import './PageContent.css';
import restaurant from './../images/restaurant.png'
import SecurityService from "../service/SecurityService";
import RestaurantAppForHead from "../components/head/RestaurantAppForHead";
import Translate from "react-translate-component";
import {setLanguage} from "../utils/RequestHandler";


class HeadPageContent extends Component {
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
                    <a href="/account"><Translate content="account"/></a>
                    <a id="logout" onClick={this.props.onLogout}><Translate content="logout"/></a>
                </nav>
            </header>


                <div className="sidenav">
                    <a href="/menu">Menu</a>
                    <a href="/restaurants"><Translate content="restaurants"/></a>
                    <a href="/employee/add"><Translate content="newEmployee"/></a>
                    <a href="/allorders"><Translate content="actualOrders"/></a>
                    <a href="/allhistory"><Translate content="allHistory"/></a>
                    <a href="/restaurantscash"><Translate content="restaurantsCash"/></a>
                </div>

                <article className="main-content">
                    <RestaurantAppForHead/>
                </article>

            <footer className="footer">
                Created by Marcin Sawa
            </footer>
            </div>

        );
    }
}

export default HeadPageContent;