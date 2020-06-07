import React, {Component} from 'react';
import {editEmployee, getCurrentUser, setLanguage} from "../../utils/RequestHandler";
import './AccountPassword.css'
import SecurityService from "../../service/SecurityService";
import {NotificationManager} from "react-notifications";
import Translate from "react-translate-component";

class AccountPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            repeatedPassword: "",
            password: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.close = this.close.bind(this);
        this.closeWithReload = this.closeWithReload.bind(this);
    }

    componentWillMount() {
        setLanguage();

        getCurrentUser().then(response => {
            this.setState({
                    id: response.data.id
                }
            )
        })
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value})

    }

    closeWithReload() {
        SecurityService.logout();
    }

    close() {
        this.props.history.push('/account', {employee: this.state.employee});
    }

    onSubmit() {

        if (this.state.password === this.state.repeatedPassword && this.state.password.length > 6) {
            let password = {password: this.state.password};
            const body = Object.assign({}, password);

            editEmployee(this.state.id, body);
            this.closeWithReload();
        } else {
            NotificationManager.success(<Translate content="passwordSuccess"/>, <Translate content="success"/>, 2000);
            NotificationManager.error(<Translate content="passwordError"/>, <Translate content="error"/>, 4000);

        }
    }

    render() {
        return (
            <div id="editContent">
                <div id="editForm-restaurant">
                    <div className="form-text">
                        <h2 id="edith2"><Translate content="passwordEdit"/></h2>
                    </div>
                    <div className="form-dish-name">
                        <h4 className="edit-h4"><Translate content="password"/></h4>
                        <input id="input1" name="password" type="password" onChange={this.onChange}/>
                    </div>
                    <div className="form-dish-price">
                        <h4 className="edit-h4"><Translate content="repeatPassword"/></h4>
                        <input id="input2" name="repeatedPassword" type="password"
                               onChange={this.onChange}/>
                    </div>
                    <div className="form-submit">
                        <Translate id="submit-restaurant" component="input" type="submit"
                                   attributes={{value: "save"}} onClick={this.onSubmit}/>
                        <Translate id="submit" component="input" type="submit"
                                   attributes={{value: "close"}} onClick={this.close}/>
                    </div>
                </div>


            </div>
        );

    }

}


export default AccountPassword;
