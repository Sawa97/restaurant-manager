import React, {Component} from 'react';
import '../head/EditRestaurant.css'
import {
    getCurrentUserRestaurantId, getTables, setLanguage
} from "../../utils/RequestHandler";
import {Button, Table} from "reactstrap";
import Translate from "react-translate-component";
import counterpart from 'counterpart';


class TableList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: [],
            searchPattern: ""
        };

        this.close = this.close.bind(this);
        this.loadRestaurant = this.loadRestaurant.bind(this);
        this.add = this.add.bind(this);
    }

    add(table) {
        this.props.history.push('/tables/order/add', {table: table});
    }

    manage(table) {
        this.props.history.push('/tables/order', {table});
    }


    close() {
        this.props.history.push('/');
    }

    componentWillMount() {
        setLanguage();
        getCurrentUserRestaurantId().then(response => {
            this.loadRestaurant(response.data);
        });
    }

    loadRestaurant(id) {
        getTables(id).then(response => {
            this.setState({
                tables: response.data,
            })
        });
    }


    render() {
        let tables = this.state.tables.map((table) => {
            let tableStatus = "";
            if (table.taken === false) {
                    tableStatus = counterpart.translate("free");
                return (
                    <tr key={table.id}>
                        <td>{table.number}</td>
                        <td>{table.capacity}</td>
                        <td>{tableStatus}</td>
                        <td className="editTd">
                            <Button className="editButton" color="success"
                                    onClick={() => this.add(table)} size="sm"><Translate content="addOrder"/>
                            </Button>
                        </td>
                    </tr>
                )
            } else {
                tableStatus = counterpart.translate("taken");

                return (
                    <tr key={table.id}>
                        <td>{table.number}</td>
                        <td>{table.capacity}</td>
                        <td>{tableStatus}</td>
                        <td className="editTd">
                            <Button className="editButton" color="success"
                                    onClick={() => this.manage(table)} size="sm"><Translate content="showOrder"/>
                            </Button>
                        </td>
                    </tr>
                )
            }


        });

        return (
                <div id="editContent">
                    <div id="editForm-restaurant">
                        <div className="form-text">
                            <h2 id="edith2"><Translate content="hall"/></h2>
                        </div>
                        <div className="tableContent-employees">
                            <Table id="restaurant-employee">
                                <thead>
                                <tr id="restaurant-edit-employee">
                                    <th><Translate content="tableNumber"/></th>
                                    <th><Translate content="numberOfSeats"/></th>
                                    <th><Translate content="status"/></th>
                                    <th></th>
                                </tr>
                                </thead>

                                <tbody>
                                {tables}
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

export default TableList;
