import React, {Component} from 'react';
import './PageContent.css';
import restaurant from './../images/restaurant.png'
import SecurityService from "../service/SecurityService";
import RestaurantAppForCooker from "../components/waiter/RestaurantAppForCooker";
import Translate from "react-translate-component";
import {setLanguage} from "../utils/RequestHandler";


class CookerPageContent extends Component {
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
                        <a href="/orders"><Translate content="actualOrders"/></a>
                        <a href="/account"><Translate content="account"/></a>
                        <a id="logout" onClick={this.props.onLogout}><Translate content="logout"/></a>
                    </nav>
                </header>


                    <div className="sidenav">
                        <a href="/menu">Menu</a>
                        <a href="/dispositions"><Translate content="planShow"/></a>
                        <a href="/dispositions/add"><Translate content="addDisposition"/></a>
                        <a href="/restaurants/info"><Translate content="restaurantsInfo"/></a>
                        <a href="/orders"><Translate content="actualOrders"/></a>
                    </div>

                    <article className="main-content">
                        <RestaurantAppForCooker/>
                    </article>

                <footer className="footer">
                    Created by Marcin Sawa
                </footer>
            </div>

        );
    }
}

export default CookerPageContent;