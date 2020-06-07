import React, {Component} from 'react';
import './AddDisposition.css'
import {
    addDisposition,
    getCurrentUser, setLanguage
} from "../../utils/RequestHandler";

// React Notification
import {NotificationManager} from 'react-notifications';
import Translate from "react-translate-component";

class AddDisposition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: null,
            description: ""
        };

        this.close = this.close.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

    }


    onSubmit() {
        if (this.state.description !== "") {
            let employee = {employee: this.state.employee};
            let description = {description: this.state.description};

            const body = Object.assign({}, employee, description);

            addDisposition(body);
            NotificationManager.success(<Translate content="dispositionSuccess"/>, <Translate
                content="success"/>, 2000);
            this.close();
        } else {
            NotificationManager.error(<Translate content="dispositionError"/>, <Translate content="error"/>, 4000);
        }
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    close() {
        this.props.history.push('/');
    }


    componentWillMount() {
        setLanguage();

        getCurrentUser().then(response => {
            this.setState({
                employee: response.data
            });
        });
    }

    render() {
        return (
            <div>
                <div id="editContent">
                    <div id="editForm-restaurant">
                        <div className="form-text">
                            <h2 id="edith2"><Translate content="addDispositionTitle"/></h2>
                        </div>


                        <div className="form-disposition-add">
                            <Translate id="text-disposition" component="textarea" name="description" type="text"
                                       attributes={{placeholder: "putDispositions"}} onChange={this.onChange}/>
                        </div>

                        <div className="form-submit">
                            <Translate id="submit-restaurant" component="input" type="submit"
                                       attributes={{value: "send"}} onClick={this.onSubmit}/>
                            <Translate id="submit" component="input" type="submit"
                                       attributes={{value: "close"}} onClick={this.close}/>
                        </div>
                    </div>

                </div>
            </div>
        );

    }


}

export default AddDisposition;
