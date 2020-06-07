import React, {Component} from 'react';
import './PageContent.css';
import restaurant from './../images/restaurant.png'
import RestaurantApp from "../components/waiter/RestaurantApp";
import Translate from "react-translate-component";
import {setLanguage} from "../utils/RequestHandler";


class UserPageContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: ""
        };
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
                    <a href="/your/orders"><Translate content="yourOrders"/></a>
                    <a href="/account"><Translate content="account"/></a>
                    <a id="logout" onClick={this.props.onLogout}><Translate content="logout"/></a>
                </nav>
            </header>


                <div className="sidenav">
                    <a href="/menu">Menu</a>
                    <a href="/dispositions"><Translate content="planShow"/></a>
                    <a href="/dispositions/add"><Translate content="addDisposition"/></a>
                    <a href="/restaurants/info"><Translate content="restaurantsInfo"/></a>
                    <a href="/tables"><Translate content="hall"/></a>
                    <a href="/your/orders"><Translate content="yourOrders"/></a>
                    <a href="/your/orders/history"><Translate content="allHistory"/></a>
                </div>

                <article className="main-content">
                    <RestaurantApp/>
                </article>

            <footer className="footer">
                Created by Marcin Sawa
            </footer>
            </div>

        );
    }
}

export default UserPageContent;