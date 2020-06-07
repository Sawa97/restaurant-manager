import React, {Component} from 'react';
import {Table, Button} from 'reactstrap';
import {getRestaurants, setLanguage} from "../../utils/RequestHandler";
import './RestaurantsList.css'
import Translate from "react-translate-component";

class ManageAllRestaurantsHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
        };

        this.close = this.close.bind(this);

    }

    componentDidMount() {
        setLanguage();
        getRestaurants().then(response => {
            this.setState({
                restaurants: response.data
            })
        })
    }

    infoRestaurant(id) {
        this.props.history.push('/orders/history', {id: id, back: "headHistory"});
    }

    close() {
        this.props.history.push('/');
    }

    render() {

        let restaurants = this.state.restaurants.map((restaurant) => {
            return (
                <tr key={restaurant.id}>
                    <td>{restaurant.city}</td>
                    <td>{restaurant.address}</td>
                    <td className="editTd">
                        <Button className="infoButton" color="info" onClick={() => this.infoRestaurant(restaurant.id)}
                                size="sm"><Translate content="showOrders"/></Button>
                    </td>
                </tr>
            )
        });
        return (
            <div id="editContent">
                <div id="editForm-restaurant">
                    <div className="form-text">
                        <h2 id="edith2"><Translate content="restaurantList"/></h2>
                    </div>

                    <div className="tableContent-employees">
                        <Table id="restaurant-employee">
                            <thead>
                            <tr id="restaurant-edit-employee">
                                <th><Translate content="address"/></th>
                                <th><Translate content="city"/></th>
                                <th></th>
                            </tr>
                            </thead>

                            <tbody>
                            {restaurants}
                            </tbody>
                        </Table>
                    </div>
                    <div className="form-submit">
                        <Translate id="submit" component="input" type="submit"
                                   attributes={{value: "close"}} onClick={this.close}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ManageAllRestaurantsHistory;
