import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import TopLine from "../views/TopLine";

export default class RegForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uurl: "/signup",
            errors: [],
            user: {
                login: "",
                password: "",
                email: ""
            }
        }
    }

    handleLoginChanged(event) {
        // this.setState({user:{login: event.target.value}})
        const str = event.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                login: str
            }
        }));
    }

    handlePasswordChanged(event) {
        const str = event.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                password: str
            }
        }));
    }

    handleEmailChanged(event) {
        const str = event.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                email: str
            }
        }));
    }

    async postSign(url) {
        const str = btoa(this.state.user.login + ':' + this.state.user.password);
        try {
            await axios({
                method: 'POST',
                url: url,
                withCredentials: true,
                headers: {
                    'Authorization': 'Basic ' + str,
                }
            });
            return Promise.resolve();
        } catch (error) {

            console.error(error);
            return Promise.reject(error);
        }
    }

    async sign() {
        const str = JSON.stringify(this.state.user);
        try {
            await axios({
                method: 'POST',
                url: 'http://127.0.0.1:8080/socback/signup/add',

                data: str,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // const resp = response.data;
            // if (!(resp === "OK")) {

            // const {cookies} = this.props;
            // cookies.set('USER', this.state.user.login, {path: '/'});


            // } else {
            // if (response.status === 200) {
            //     this.postSign();
            //     const {cookies} = this.props;
            //     cookies.set('USERID', this.state.user.login, {path: '/'});
            //     this.setState({uurl: "/userinfo/" + this.state.user.login});
            //     // console.log('we need redirect here');
            // }
            // }
            return Promise.resolve();
            // console.log(this.state)
        } catch (error) {
            if (error.response.status === 401)
                this.setState({errors: [error.response.data]});
            console.error(error);
            return Promise.reject(error)
        }
    }

    redirect(url) {
        return (
            <Redirect to={url}/>
        )
    }

    renderErrors() {
        return this.state.errors.map(error => {
            return (
                <Error error={error} key={Math.random()}/>
            )
        })
    }

    sucRedirect() {
        this.setState({uurl: "/userinfo/" + this.state.user.login})
    }

    handleSuccess() {
        this.postSign("http://127.0.0.1:8080/socback/login/user").then(this.sucRedirect.bind(this), this.handleError());
        const {cookies} = this.props;
        cookies.set('USERID', this.state.user.login, {path: '/'});
    }

    handleError() {

    }

    buttonClick(event) {
        event.preventDefault();
        this.setState({errors: []});
        let promise = this.sign();
        promise.then(this.handleSuccess.bind(this), this.handleError.bind(this));
    }


    render() {
        return (
            <div>
                <TopLine cookies={this.props.cookies}/>
                {this.renderErrors()}
                {this.redirect(this.state.uurl)}
                <form className="form-horizontal">
                    <div className="row">
                        <div className="form-group col-md-12">
                            <label htmlFor="inputLogin" className="col-sm-2 control-label"><h4>Login</h4>
                            </label>
                            <div className="col-sm-12">
                                <input type="login" className="form-control" name="login" id="inputLogin"
                                       placeholder="Login"
                                       required="required"
                                       value={this.state.user.login}
                                       onChange={this.handleLoginChanged.bind(this)}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">

                        <div className="form-group col-md-12">
                            <label htmlFor="inputPassword" className="col-sm-2 control-label">
                                <h4>Password</h4>
                            </label>
                            <div className="col-sm-12">
                                <input type="password" className="form-control" name="password"
                                       id="inputPassword"
                                       placeholder="Password"
                                       required="required"
                                       value={this.state.password}
                                       onChange={this.handlePasswordChanged.bind(this)}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">

                        <div className="form-group col-md-12">
                            <label htmlFor="inputEmail" className="col-sm-2 control-label"><h4>Email</h4>
                            </label>
                            <div className="col-sm-12">
                                <input type="email" className="form-control" name="email"
                                       placeholder="Email"
                                       required="required"
                                    // ref={(el)=>this.emailTextField =el}
                                       value={this.state.email}
                                       onChange={this.handleEmailChanged.bind(this)}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-md-3"/>
                        <div className="col-md-6"/>
                        <div className="col-md-3">
                            <button type="submit" className="btn btn-primary mr-3"
                                    onClick={this.buttonClick.bind(this)}>Sign Up
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

function Error(props) {
    return (
        <div className="row">
            <div className="col-md-12"><p className="bg-danger">{props.error}</p></div>
        </div>
    )
}
