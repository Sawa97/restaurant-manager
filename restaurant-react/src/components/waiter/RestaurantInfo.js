import React, {Component} from 'react';
import {getCurrentUserRestaurantId, getRestaurant, setLanguage} from "../../utils/RequestHandler";
import './RestaurantInfo.css'
import Translate from "react-translate-component";

class RestaurantInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: null,
            address: null,
            managerName: null,
            managerSurname: null,
            tablesCount: null,
            employeesCount: null
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.loadRestaurant = this.loadRestaurant.bind(this);
    }

    componentDidMount() {
        setLanguage();

        if (this.props.location.state != null) {
            this.loadRestaurant(this.props.location.state.id);
        } else {
            getCurrentUserRestaurantId().then(response => {
                this.loadRestaurant(response.data)
            })
        }
    }

    loadRestaurant(id) {
        getRestaurant(id).then(response => {
            this.setState({
                city: response.data.city,
                address: response.data.address,
                managerName: response.data.manager.name,
                managerSurname: response.data.manager.surname,
                tablesCount: response.data.tables.length,
                employeesCount: response.data.employees.length
            })
        });
    }

    onSubmit() {
        if (this.props.location.state != null) {
            this.props.history.push('/restaurants');
        } else {
            this.props.history.push('/');

        }
    }

    render() {
        return (
            <div id="editContent">
                <div id="editForm-restaurant">
                    <div className="form-text">
                        <h2 id="edith2"><Translate content="restaurantInfo"/></h2>
                    </div>
                    <div className="form-info-restaurant">
                        <h4 className="edit-h4"><Translate content="city"/>:</h4>
                        <h3 className="edit-h4">{this.state.city}</h3>
                    </div>
                    <div className="form-info-restaurant">
                        <h4 className="edit-h4"><Translate content="address"/>:</h4>
                        <h3 className="edit-h4">{this.state.address}</h3>
                    </div>
                    <div className="form-info-restaurant">
                        <h4 className="edit-h4"><Translate content="manager"/>:</h4>
                        <h3 className="edit-h4">{this.state.managerName} {this.state.managerSurname}</h3>
                    </div>
                    <div className="form-info-restaurant">
                        <h4 className="edit-h4"><Translate content="employeeCount"/>:</h4>
                        <h3 className="edit-h4">{this.state.employeesCount}</h3>
                    </div>
                    <div className="form-info-restaurant">
                        <h4 className="edit-h4"><Translate content="tablesCount"/>:</h4>
                        <h3 className="edit-h4">{this.state.tablesCount}</h3>
                    </div>

                    <div className="form-submit">
                        <Translate id="submit" component="input" type="submit"
                                   attributes={{value: "close"}} onClick={this.onSubmit}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default RestaurantInfo;
