import React from 'react';
import '../bootstrap.css';
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";
import TopLine from "../views/TopLine";
import NewTopbar from "../views/NewTopbar";
import {Toolbar} from "@material-ui/core";
// import {
//     Link
// } from 'react-router-dom';

export default class ListForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            uurl: "/list",
            users: []
        }
    }

    // async getReq() {
    //     try {
    //         const response = await axios({
    //             method: 'GET',
    //             url: 'http://127.0.0.1:8080/socback/login/getList',
    //             headers:{
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         if (response.status === 200)
    //             this.setState({users: response.data});
    //     } catch (error) {
    //         if (error.response.status === 401 || error.response.status===403)
    //             this.setState({uurl: "/noacc"});
    //         console.error(error);
    //     }
    // }

    async getReq() {
        try {
            const response = await axios({
                method: 'GET',
                url: 'http://127.0.0.1:8080/socback/login/getList',
                withCredentials: true
            });
            if (response.status === 200) {
                this.setState({users: response.data});
            }
            console.log(this.state);
        } catch (e) {
            if (e.response.status === 401 || e.response.status === 403)
                return Promise.reject(e);
            console.error(e);
        }
    }

    renderUsers() {
        return this.state.users.map(user => {
            return (
                <User user={user} key={user.id}/>
            )
        })
    }

    redirect(url) {
        return (
            <Redirect to={url}/>
        )
    }

    componentDidMount() {
        this.refresh();
    }

    nice() {

    }

    fail() {
        this.setState({uurl: '/noacc'})
    }

    refresh() {
        this.getReq().then(this.nice.bind(this), this.fail.bind(this));
    }

    render() {
        return (
            <div className={this.state.classes.root}>
                <NewTopbar cookies={this.props.cookies} pageName="Users' list"/>
                {/*<Toolbar />*/}
                <main className={this.state.classes.content}>
                    <div className={this.state.classes.toolbar}/>
                <div className="container">
                    {this.redirect(this.state.uurl)}
                    <div className="row justify-content-md-center">
                        <h2>List of users</h2>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-md-auto">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Login</th>
                                    <th>Password</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.renderUsers()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <button className="btn btn-primary mr-3" onClick={this.refresh.bind(this)}>Refresh</button>
                        <Link to="" className="btn btn-primary mr-3">Get back</Link>
                    </div>
                </div>
                </main>
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
            <td>{props.user.role}</td>
        </tr>
    )
}