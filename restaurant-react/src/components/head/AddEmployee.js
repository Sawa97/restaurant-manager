import React, {Component} from 'react';
import {addEmployee, setLanguage} from "../../utils/RequestHandler";
import './AddEmployee.css'
import {NotificationManager} from "react-notifications";
import Translate from "react-translate-component";
import counterpart from 'counterpart';


class AddEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surname: "",
            email: "",
            role: "WAITER",
            phoneNumber: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.close = this.close.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})

    }

    onChangeSelect(e) {
        this.setState({
            role: e.target.value
        });
    }

    close() {
        this.props.history.push('/');
    }

    componentWillMount() {
        setLanguage();

    }

    onSubmit() {
        if (this.state.name !== "" && this.state.surname !== "" && this.state.email !== null && this.state.phoneNumber !== "" && this.state.phoneNumber.length === 9 ) {


            let name = {name: this.state.name};
            let surname = {surname: this.state.surname};
            let email = {email: this.state.email};
            let phoneNumber = {phoneNumber: this.state.phoneNumber};
            let role = {role: this.state.role};
            const body = Object.assign({}, name, surname, email, role, phoneNumber);

            addEmployee(body);
            NotificationManager.success(<Translate content="addEmployeeSuccess"/>, <Translate
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
                        <h2 id="edith2"><Translate content="addEmployeeTitle"/></h2>
                    </div>
                    <div className="form-dish-name">
                        <h4 className="edit-h4"><Translate content="name"/></h4>
                        <input id="input1" name="name" type="text" onChange={this.onChange}/>
                    </div>
                    <div className="form-dish-price">
                        <h4 className="edit-h4"><Translate content="surname"/></h4>
                        <input id="input2" name="surname" type="text"
                               onChange={this.onChange}/>
                    </div>
                    <div className="form-dish-descript">
                        <h4 className="edit-h4"><Translate content="email"/></h4>
                        <input id="input3" name="email" type="text"
                               onChange={this.onChange}/></div>
                    <div className="form-dish-descript">
                        <h4 className="edit-h4"><Translate content="phone"/></h4>
                        <input id="input4" name="phoneNumber" type="text"
                               onChange={this.onChange}/></div>
                    <div className="form-dish-category">
                        <h4 className="edit-h4"><Translate content="role"/></h4>
                        <select id="dish-select" onChange={this.onChangeSelect}>
                            <option value="WAITER">{counterpart.translate("waiter")}</option>
                            <option value="COOK">{counterpart.translate("cook")}</option>
                            <option value="MANAGER">{counterpart.translate("manager")}</option>
                            <option value="HEAD">{counterpart.translate("head")}</option>
                        </select>
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


export default AddEmployee;
