import React, {Component} from 'react';
import {Table, Button} from 'reactstrap';
import {deleteDish, getMenu, setLanguage} from "../../utils/RequestHandler";
import '../head/MenuHead.css'
import Translate from "react-translate-component";

class MenuHead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mains: [],
            drinks: [],
            starters: [],
            desserts: [],
            soups: [],
            currentlyDisplayed: "soups"
        };

        this.pickStarters = this.pickStarters.bind(this);
        this.pickSoups = this.pickSoups.bind(this);
        this.pickMains = this.pickMains.bind(this);
        this.pickDesserts = this.pickDesserts.bind(this);
        this.pickDrinks = this.pickDrinks.bind(this);
        this.deleteDish = this.deleteDish.bind(this);
        this.editDish = this.editDish.bind(this);
        this.addDish = this.addDish.bind(this);
    }

    componentWillMount() {
        setLanguage();
        getMenu().then(response => {
            response.data.map((dish) => {
                if (dish.category === "SOUP") {
                    this.setState({
                        soups: this.state.soups.concat(dish)
                    })
                }
                if (dish.category === "MAIN") {
                    this.setState({
                        mains: this.state.mains.concat(dish)
                    })
                }
                if (dish.category === "STARTER") {
                    this.setState({
                        starters: this.state.starters.concat(dish)
                    })
                }
                if (dish.category === "DESSERT") {
                    this.setState({
                        desserts: this.state.desserts.concat(dish)
                    })
                }
                if (dish.category === "DRINK") {
                    this.setState({
                        drinks: this.state.drinks.concat(dish)
                    })
                }
            })
        });
    }

    pickStarters() {
        this.setState({
            currentlyDisplayed: "starters"
        })
    }

    pickSoups() {
        this.setState({
            currentlyDisplayed: "soups"
        })
    }

    pickMains() {
        this.setState({
            currentlyDisplayed: "mains"
        })
    }

    pickDesserts() {
        this.setState({
            currentlyDisplayed: "desserts"
        })
    }

    pickDrinks() {
        this.setState({
            currentlyDisplayed: "drinks"
        })
    }

    deleteDish(name) {
        deleteDish(name);
        window.location.reload();
    }

    editDish(name) {
        this.props.history.push('/menu/edit', {name});
    }

    addDish() {
        this.props.history.push('/menu/add');
    }


    render() {

        let dishesToDisplay;

        if (this.state.currentlyDisplayed === "drinks") {
            dishesToDisplay = this.state.drinks;
        }
        if (this.state.currentlyDisplayed === "soups") {
            dishesToDisplay = this.state.soups;
        }
        if (this.state.currentlyDisplayed === "mains") {
            dishesToDisplay = this.state.mains;
        }
        if (this.state.currentlyDisplayed === "desserts") {
            dishesToDisplay = this.state.desserts;
        }
        if (this.state.currentlyDisplayed === "starters") {
            dishesToDisplay = this.state.starters;
        }


        let dishes = dishesToDisplay.map((dish) => {
            return (
                <tr key={dish.id}>
                    <td>{dish.name}</td>
                    <td>{dish.description}</td>
                    <td>{dish.price}<Translate content="currency"/></td>
                    <td className="editTd-menu">
                        <Button className="editButton-menu" color="success" onClick={() => this.editDish(dish.name)}
                                size="sm"><Translate content="edit"/></Button>
                        <Button className="deleteButton-menu" color="danger" onClick={() => this.deleteDish(dish.name)}
                                size="sm"><Translate content="delete"/></Button>
                    </td>
                </tr>
            )
        });
        return (
            <div className="menu-div">
                <div className="button-menu">
                    <button className="button-dish" name="starters" onClick={this.pickStarters}><Translate
                        content="starters"/></button>
                    <button className="button-dish" name="soups" onClick={this.pickSoups}><Translate content="soups"/>
                    </button>
                    <button className="button-dish" name="mains" onClick={this.pickMains}><Translate
                        content="mainDish"/></button>
                    <button className="button-dish" name="desserts" onClick={this.pickDesserts}><Translate
                        content="desserts"/></button>
                    <button className="button-dish" name="drinks" onClick={this.pickDrinks}><Translate
                        content="drinks"/></button>
                    <Button className="button-add-g" color="success" onClick={this.addDish}><Translate
                        content="addNewDish"/></Button>

                </div>

                <div className="tableContent">
                    <Table>
                        <thead>
                        <tr>
                            <th><Translate content="dishName"/></th>
                            <th><Translate content="dishDescription"/></th>
                            <th><Translate content="price"/></th>
                            <th></th>
                        </tr>
                        </thead>

                        <tbody>
                        {dishes}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default MenuHead;
