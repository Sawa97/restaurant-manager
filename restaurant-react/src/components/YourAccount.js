import React, {Component} from 'react';
import {getCurrentUser, setLanguage} from "../utils/RequestHandler";
import './waiter/RestaurantInfo.css'
import Translate from "react-translate-component";
import counterpart from "counterpart";


class YourAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: null
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.change = this.change.bind(this);
        this.changePassword = this.changePassword.bind(this);

    }

    componentWillMount() {
        setLanguage();

        getCurrentUser().then(response => {
            console.log(response.data);
            this.setState({
                employee: response.data
            })
        })
    }

    change() {
        this.props.history.push('/account/edit');
    }

    changePassword() {
        this.props.history.push('/account/password');
    }

    onSubmit() {
        if (this.props.location.state != null) {
            this.props.history.push('/restaurants');
        } else {
            this.props.history.push('/');

        }
    }

    render() {

        if (this.state.employee != null) {
            let position = this.state.employee.role;

            if (this.state.employee.role === "HEAD") {
                position = counterpart.translate("head");
            }
            if (this.state.employee.role === "MANAGER") {
                position = counterpart.translate("manager");

            }
            if (this.state.employee.role === "WAITER") {
                position = counterpart.translate("waiter");

            }
            if (this.state.employee.role === "COOK") {
                position = counterpart.translate("cook");
            }


            return (
                <div id="editContent">
                    <div id="editForm-restaurant">
                        <div className="form-text">
                            <h2 id="edith2"><Translate content="profilInfo"/></h2>
                        </div>
                        <div className="form-info-restaurant">
                            <h4 className="edit-h4"><Translate content="employeeNumber"/>:</h4>
                            <h3 className="edit-h4">{this.state.employee.number}</h3>
                        </div>
                        <div className="form-info-restaurant">
                            <h4 className="edit-h4"><Translate content="name"/>:</h4>
                            <h3 className="edit-h4">{this.state.employee.name}</h3>
                        </div>
                        <div className="form-info-restaurant">
                            <h4 className="edit-h4"><Translate content="surname"/>:</h4>
                            <h3 className="edit-h4">{this.state.employee.surname}</h3>
                        </div>
                        <div className="form-info-restaurant">
                            <h4 className="edit-h4"><Translate content="role"/>:</h4>
                            <h3 className="edit-h4">{position}</h3>
                        </div>
                        <div className="form-info-restaurant">
                            <h4 className="edit-h4"><Translate content="email"/>:</h4>
                            <h3 className="edit-h4">{this.state.employee.email}</h3>
                        </div>
                        <div className="form-info-restaurant">
                            <h4 className="edit-h4"><Translate content="phone"/>:</h4>
                            <h3 className="edit-h4">{this.state.employee.phoneNumber}</h3>
                        </div>

                        <div className="form-submit">
                            <Translate id="submit-restaurant" component="input" type="submit"
                                       attributes={{value: "back"}} onClick={this.onSubmit}/>
                            <Translate id="submit-restaurant" component="input" type="submit"
                                       attributes={{value: "changePassword"}} onClick={this.changePassword}/>
                            <Translate id="submit" component="input" type="submit"
                                       attributes={{value: "editData"}} onClick={this.change}/>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div>

            </div>
        )
    }
}

export default YourAccount;
