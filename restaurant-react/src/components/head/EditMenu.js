import React, {Component} from 'react';
import './EditMenu.css'
import {addDish, editDish, getDish, setLanguage} from "../../utils/RequestHandler";
import {NotificationManager} from "react-notifications";
import Translate from "react-translate-component";
import counterpart from "counterpart";

class EditMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            price: "",
            category: ""
        };

        this.loadDish = this.loadDish.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
    }

    componentWillMount() {
        setLanguage();
        if (this.props.location.state != null) {
            this.loadDish(this.props.location.state.name);
        }
    }

    loadDish(name) {
        getDish(name).then(response => {
            this.setState({
                name: response.data.name,
                description: response.data.description,
                price: response.data.price,
                category: response.data.category
            })
        });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onChangeSelect(e) {
        this.setState({
            category: e.target.value
        });
    }

    onSubmit() {
        if (this.state.name !== "" && this.state.description !== "" && this.state.price !== "") {
            const body = Object.assign({}, this.state);

            if (window.location.href.includes("edit")) {
                editDish(this.state.name, body)
            } else {
                addDish(body)
            }
            this.props.history.push('/menu');
            NotificationManager.success(<Translate content="editMenuSuccess"/>, <Translate
                content="success"/>, 2000);

            window.location.reload();
        } else {
            NotificationManager.error(<Translate content="accountEditError"/>, <Translate content="error"/>, 4000);

        }
    }

    render() {
        const isNotChangable = window.location.href.includes("edit");

        return (
            <div id="editContent">
                <div id="editForm">
                    <div className="form-text">
                        <h2 id="edith2"><Translate content="editDish"/></h2>
                    </div>
                    <div className="form-dish-name">
                        <h4 className="edit-h4"><Translate content="dishName"/></h4>
                        <input id="text-dish-name" name="name" type="text" defaultValue={this.state.name}
                               readOnly={isNotChangable}
                               onChange={this.onChange}/>
                    </div>
                    <div className="form-dish-price">
                        <h4 className="edit-h4"><Translate content="price"/></h4>
                        <input id="text-dish-price" name="price" type="number" step="0.01"
                               defaultValue={this.state.price}
                               onChange={this.onChange}/>
                    </div>
                    <div className="form-dish-descript">
                        <h4 className="edit-h4"><Translate content="dishDescription"/></h4>
                        <input id="text-dish-desc" name="description" type="text" defaultValue={this.state.description}
                               onChange={this.onChange}/></div>
                    <div className="form-dish-category">
                        <h4 className="edit-h4"><Translate content="category"/></h4>
                        <select id="dish-select" onChange={this.onChangeSelect}>
                            <option value="MAIN">{counterpart.translate("mainName")}</option>
                            <option value="SOUP">{counterpart.translate("soupName")}</option>
                            <option value="DESSERT">{counterpart.translate("dessertName")}</option>
                            <option value="DRINK">{counterpart.translate("drinkName")}</option>
                            <option value="STARTER">{counterpart.translate("starterName")}</option>
                        </select>
                    </div>
                    <div className="form-submit">
                        <input id="submit" type="submit" value="Zapisz" onClick={this.onSubmit}/>
                    </div>
                </div>


            </div>
        );

    }

}

export default EditMenu;
