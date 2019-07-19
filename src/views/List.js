import React from 'react';
import '../bootstrap.css';
import axios from 'axios';
import {Link} from "react-router-dom";
// import {
//     Link
// } from 'react-router-dom';

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    async getReq() {
        try {
            const response = await axios.get('socback/login/getList');
            this.setState({users: response.data});
        } catch (error) {
            console.error(error);
        }
    }

    renderUsers() {
        return this.state.users.map(user => {
            return (
                <User user={user} key={user.id}/>
            )
        })
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        this.getReq();
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6 ml-3">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Login</th>
                                <th>Password</th>
                                <th>Email</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderUsers()}
                            </tbody>
                        </table>
                        <button className="btn btn-primary mr-3" onClick={this.refresh.bind(this)}>Refresh</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 ml-3">
                        <Link to="" className="btn btn-primary mr-3">Get back</Link>
                    </div>
                </div>
            </div>
        )
    }


}

function User(props) {
    return (
        <tr>
            <td>{props.user.id}</td>
            <td>{props.user.login}</td>
            <td>{props.user.password}</td>
            <td>{props.user.email}</td>
        </tr>
    )
}