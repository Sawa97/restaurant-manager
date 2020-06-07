import React, {Component} from 'react';
import './App.css';
import HeadPageContent from "../basic/HeadPageContent";
import ManagerPageContent from "../basic/ManagerPageContent";
import UserPageContent from "../basic/UserPageContent";
import CookerPageContent from "../basic/CookerPageContent";
import Login from "../components/Login";
import {getCurrentUser, setLanguage} from "../utils/RequestHandler";
import SecurityService from "../service/SecurityService";

// React Notification
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

import counterpart from 'counterpart';
import en from '../utils/en';
import pl from '../utils/pl';


counterpart.registerTranslations('en',en);
counterpart.registerTranslations('pl',pl);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roleUser: null,
            loading: false
        };

        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount() {
        setLanguage();

        this.setState({
            loading: true
        });
        getCurrentUser().then(response => {

            this.setState({
                roleUser: response.data.role,
                loading: false
            });
        }).catch(error => {
            this.setState({
                loading: false
            });
        });
    }

    handleLogout() {
        this.setState({
            roleUser: null
        });
        SecurityService.logout();
        window.location.reload();
    }

    render() {
        if (this.state.loading) {
            return <a>Loading...</a>
        }
        if (this.state.roleUser === "HEAD") {
            return (
                <div>
                    <HeadPageContent onLogout={this.handleLogout}/>
                    <NotificationContainer />
                </div>
            );
        }
        if (this.state.roleUser === "MANAGER") {
            return (
                <div>
                    <ManagerPageContent onLogout={this.handleLogout}/>
                    <NotificationContainer />
                </div>
            );
        }
        if (this.state.roleUser === "WAITER") {
            return (
                <div>
                    <UserPageContent onLogout={this.handleLogout}/>
                    <NotificationContainer />
                </div>
            );
        }
        if (this.state.roleUser === "COOK") {
            return (
                <div>
                    <CookerPageContent onLogout={this.handleLogout}/>
                    <NotificationContainer />
                </div>
            );
        } else {
            return (
                <div>
                    <Login/>
                    <NotificationContainer />
                </div>
            );
        }
    }
}

export default App;