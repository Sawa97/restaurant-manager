import React, {Component} from 'react';
import {editEmployee, getCurrentUser, setLanguage} from "../../utils/RequestHandler";
import './AccountEdit.css'
import {NotificationManager} from "react-notifications";
import Translate from "react-translate-component";

class AccountEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: "",
            surname: "",
            email: "",
            phoneNumber: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.close = this.close.bind(this);
    }

    componentWillMount() {
        setLanguage();

        getCurrentUser().then(response => {
            this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    surname: response.data.surname,
                    email: response.data.email,
                    phoneNumber: response.data.phoneNumber
                }
            )
        })
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value})

    }

    close() {
        this.props.history.push('/account', {employee: this.state.employee});
        window.location.reload();
    }

    onSubmit() {

        if (this.state.name !== "" && this.state.surname !== "" && this.state.email !== "" && this.state.phoneNumber !== "" && this.state.phoneNumber.length === 9) {
            let name = {name: this.state.name};
            let surname = {surname: this.state.surname};
            let email = {email: this.state.email};
            let phoneNumber = {phoneNumber: this.state.phoneNumber};
            const body = Object.assign({}, name, surname, email, phoneNumber);

            editEmployee(this.state.id, body);
            NotificationManager.success(<Translate content="accountEditSuccess"/>, <Translate
                content="success"/>, 2000);

            this.close();
        } else {
            NotificationManager.error(<Translate content="accountEditError"/>, <Translate content="error"/>, 4000);

        }
    }

    render() {
        return (
            <div id="editContent">
                <div id="editForm-restaurant">
                    <div className="form-text">
                        <h2 id="edith2"><Translate content="accountEdit"/></h2>
                    </div>
                    <div className="form-dish-name">
                        <h4 className="edit-h4"><Translate content="name"/></h4>
                        <input id="input1" name="name" type="text" onChange={this.onChange}
                               defaultValue={this.state.name}/>
                    </div>
                    <div className="form-dish-price">
                        <h4 className="edit-h4"><Translate content="surname"/></h4>
                        <input id="input2" name="surname" type="text"
                               onChange={this.onChange} defaultValue={this.state.surname}/>
                    </div>
                    <div className="form-dish-descript">
                        <h4 className="edit-h4"><Translate content="email"/></h4>
                        <input id="input3" name="email" type="text"
                               onChange={this.onChange} defaultValue={this.state.email}/></div>
                    <div className="form-dish-descript">
                        <h4 className="edit-h4"><Translate content="phone"/></h4>
                        <input id="input4" name="phoneNumber" type="text"
                               onChange={this.onChange} defaultValue={this.state.phoneNumber}/></div>
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


export default AccountEdit;
