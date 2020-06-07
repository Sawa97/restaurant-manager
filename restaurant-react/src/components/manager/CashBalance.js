import React, {Component} from 'react';
import {getCurrentUserRestaurantId, getRestaurantBalance, setLanguage} from "../../utils/RequestHandler";
import Translate from "react-translate-component";

class CashBalance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            day: 0,
            month: 0,
            year: 0,
            back: ""
        };

        this.loadRestaurant = this.loadRestaurant.bind(this);
        this.close = this.close.bind(this);

    }

    componentDidMount() {
        setLanguage();

        if (this.props.location.state != null) {
            if (this.props.location.state.id) {
                this.loadRestaurant(this.props.location.state.id);
            }
            if (this.props.location.state.back) {
                this.setState({
                    back: this.props.location.state.back
                })
            }
        } else {
            getCurrentUserRestaurantId().then(response => {
                this.loadRestaurant(response.data)
            })
        }
    }

    loadRestaurant(id) {
        getRestaurantBalance(id).then(response => {
            this.setState({
                day: response.data.day,
                month: response.data.month,
                year: response.data.year,
            })
        });
    }

    close() {
        if (this.state.back === "") {
            this.props.history.push('/');
        } else {
            this.props.history.push('/restaurantscash');
        }
    }

    render() {
        return (
            <div id="editContent">
                <div id="editForm-restaurant">
                    <div className="form-text">
                        <h2 id="edith2"><Translate content="restaurantsCash"/></h2>
                    </div>
                    <div className="form-info-restaurant">
                        <h4 className="edit-h4"><Translate content="dayBalance"/>:</h4>
                        <h3 className="edit-h4">{this.state.day}<Translate content="currency"/></h3>
                    </div>
                    <div className="form-info-restaurant">
                        <h4 className="edit-h4"><Translate content="monthBalance"/>:</h4>
                        <h3 className="edit-h4">{this.state.month}<Translate content="currency"/></h3>
                    </div>
                    <div className="form-info-restaurant">
                        <h4 className="edit-h4"><Translate content="yearBalance"/>:</h4>
                        <h3 className="edit-h4">{this.state.year}<Translate content="currency"/></h3>
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

export default CashBalance;
