import React, {Component} from 'react';
import {Table, Button} from 'reactstrap';
import {deleteRestaurant, getRestaurants, setLanguage} from "../../utils/RequestHandler";
import './RestaurantsList.css'
import Translate from "react-translate-component";

class RestaurantsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
        };


        this.deleteRestaurant = this.deleteRestaurant.bind(this);
        this.editRestaurant = this.editRestaurant.bind(this);
        this.addRestaurant = this.addRestaurant.bind(this);
        this.infoRestaurant = this.infoRestaurant.bind(this);
    }

    componentDidMount() {
        setLanguage();
        getRestaurants().then(response => {
            this.setState({
                restaurants: response.data
            })
        })
    }

    editRestaurant(id) {
        this.props.history.push('/restaurants/edit', {id});
    }

    deleteRestaurant(id) {
        deleteRestaurant(id);
        window.location.reload();
    }

    addRestaurant() {
        this.props.history.push('/restaurants/add');
    }

    infoRestaurant(id) {
        this.props.history.push('/restaurants/info', {id});
    }

    render() {

        let restaurants = this.state.restaurants.map((restaurant) => {
            return (
                <tr key={restaurant.id}>
                    <td>{restaurant.city}</td>
                    <td>{restaurant.address}</td>
                    <td className="editTd">
                        <Button className="editButton-menu" color="success"
                                onClick={() => this.editRestaurant(restaurant.id)} size="sm"><Translate content="edit"/></Button>
                        <Button className="deleteButton-menu" color="danger"
                                onClick={() => this.deleteRestaurant(restaurant.id)} size="sm"><Translate
                            content="delete"/></Button>
                        <Button className="infoButton-menu" color="info" onClick={() => this.infoRestaurant(restaurant.id)}
                                size="sm"><Translate content="info"/></Button>
                    </td>
                </tr>
            )
        });
        return (
            <div>
                <div className="button-menu">
                    <h1><Translate content="restaurantList"/></h1>
                    <Button className="button-add-g" color="success" onClick={this.addRestaurant}><Translate
                        content="addNewRestaurant"/></Button>
                </div>

                <div className="tableContent">
                    <Table>
                        <thead>
                        <tr>
                            <th><Translate content="city"/></th>
                            <th><Translate content="address"/></th>
                            <th></th>
                        </tr>
                        </thead>

                        <tbody>
                        {restaurants}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default RestaurantsList;
