import React, {Component} from 'react';
import SecurityService from '../service/SecurityService';
import './Login.css'
import restaurant from "../images/restaurant.png";
import poland from "../images/Poland_96px.png";
import english from "../images/Great Britain_96px.png";

import {NotificationManager} from "react-notifications";
import counterpart from 'counterpart';
import Translate from "react-translate-component";
import {reset, setLanguageCookie} from "../utils/RequestHandler";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            language: "",
            resetFlag: "false",
            emailToReset: ''
        };

        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
        this.reset = this.reset.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.back = this.back.bind(this);
        this.clean = this.clean.bind(this);


    }

    login() {
        SecurityService.executeBasicAuthenticationService(this.state.email, this.state.password)
            .then(() => {
                SecurityService.registerSuccessfulLogin(this.state.email, this.state.password);
                window.location.reload();
            }).catch(error => {
            NotificationManager.error(<Translate content="loginError"/>, <Translate content="error"/>, 4000);
        });
    }

    clean(){
        this.setState({
            password: '',
            language: "",
            emailToReset: ''
        })
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    reset() {
        this.setState({
            resetFlag: "true"
        });
        this.clean();
    }

    back() {
        this.setState({
            resetFlag: "false"
        });
        this.clean();
    }

    resetPassword() {
        reset(this.state.emailToReset).then(response => {
            if (response.data === true) {
                this.setState({
                    resetFlag: "false"
                });
                NotificationManager.success(<Translate content="resetSuccess"/>, <Translate content="success"/>, 2000);
                this.clean();
            } else {
                NotificationManager.error(<Translate content="resetError"/>, <Translate content="error"/>, 4000);
            }
        })
    }

    render() {
        const imageClickPL = () => {
            counterpart.setLocale('pl');
            setLanguageCookie('pl');
        };

        const imageClickEN = () => {
            counterpart.setLocale('en');
            setLanguageCookie('en');
        };

        if (this.state.resetFlag === "false") {
            return (
                <div className="wrapper">
                    <header>
                        <div className="header-image">
                            <img src={restaurant} alt="desc" width="50" height="50"/> <a>Red Rib Restaurant</a>
                        </div>
                    </header>

                    <div className="main-content-login">
                        <div className="login-content">
                            <img className="language-img" src={poland} onClick={() => imageClickPL()} width="30"
                                 height="30"/>
                            <img className="language-img" src={english} onClick={() => imageClickEN()} width="30"
                                 height="30"/>
                            <div id="myForm">
                                <div className="form-text">
                                    <Translate content="loginTitle" component="h2" id="logowanie"/>
                                </div>
                                <div className="form-login">
                                    <input id="text-user" name="email" type="text" placeholder="email"
                                           onChange={this.onChange}/>
                                </div>
                                <div className="form-password">
                                    <Translate id="text-password" component="input" name="password" type="password"
                                               attributes={{placeholder: "passwordPlaceholder"}}
                                               onChange={this.onChange}/>
                                </div>
                                <div className="form-submit">
                                    <Translate id="submit" component="input" type="submit"
                                               attributes={{value: "loginButton"}} onClick={this.login}/>
                                </div>
                                <div className="remind">
                                <a href="#" onClick={this.reset}>
                                    <Translate content="remind"/>
                                </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="footer">
                        Created by Marcin Sawa
                    </footer>
                </div>
            );
        } else {
            return (
                <div className="wrapper">
                    <header>
                        <div className="header-image">
                            <img src={restaurant} alt="desc" width="50" height="50"/> <a>Red Rib Restaurant</a>
                        </div>
                    </header>

                    <div className="main-content-reset">
                        <div className="login-content">
                            <img className="language-img" src={poland} onClick={() => imageClickPL()} width="30"
                                 height="30"/>
                            <img className="language-img" src={english} onClick={() => imageClickEN()} width="30"
                                 height="30"/>
                            <div id="myForm">
                                <div className="form-text">
                                    <Translate content="forgotPasswordTitle" component="h2" id="logowanie"/>
                                </div>
                                <div className="form-login">
                                    <input id="text-user" name="emailToReset" type="text" placeholder="email"
                                           onChange={this.onChange}/>
                                </div>
                                <div className="form-submit">
                                    <Translate id="submit-restaurant" component="input" type="submit"
                                               attributes={{value: "reset"}} onClick={this.resetPassword}/>
                                    <Translate id="submit" component="input" type="submit"
                                               attributes={{value: "back"}} onClick={this.back}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="footer">
                        Created by Marcin Sawa
                    </footer>
                </div>
            );
        }
    }
}

export default Login;