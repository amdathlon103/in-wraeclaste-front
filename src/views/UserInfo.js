import React from 'react';
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";

export default class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uurl: "/userinfo",
            logged: true,
            errors: [],
            user: {
                login: "",
                password: "",
                email: ""
            }
        }
    }


    async getReq() {
        try {
            const response = await axios.get('socback/app/userinfo');
            this.setState({user: response.data});
            console.log(this.state.user);
        } catch (error) {
            console.error(error);
        }
    }

    componentDidMount() {
        const {cookies} = this.props;
        if (cookies.get('USER') != null) {
            this.getReq();
        }else{
            this.setState({uurl: "/noacc"});
        }
    }

    redirect(url) {
        return (
            <Redirect to={url}/>
        )
    }

    manageLogOut(event) {
        const {cookies} = this.props;
        cookies.remove('USER', {path: '/'});
        // this.setState({uurl: "/"});
    }


    render() {
        return (
            <div>
                {/*{this.auth(this.state.logged)}*/}
                <div className="row">
                    {this.redirect(this.state.uurl)}
                    <div className="col-md-auto">
                        <div className="row">
                            <span className="col-md-12 ml-2"><h1>Welcome!</h1></span>
                        </div>
                        <div className="row">
                            <span className="col-md-12 ml-2"><h2>You provided the following data:</h2></span>
                        </div>
                        <div className="row">
                            <div className="col-md-12 ml-2"><strong>Login: </strong> {this.state.user.login}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 ml-2"><strong>password: </strong> {this.state.user.password}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 ml-2"><strong>Email: </strong>{this.state.user.email}</div>
                        </div>
                        <div className="row">

                            <div className="col-md-3"/>
                            <div className="col-md-6"/>
                            <div className="col-md-3">
                                <Link to="" className="btn btn-primary mr-3"
                                        onClick={this.manageLogOut.bind(this)}>Log
                                    Out
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
