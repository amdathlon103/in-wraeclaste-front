import React from 'react';
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";
import TopLine from "../views/TopLine";

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uurl: "/login",
            errors: [],
            user: {
                login: "",
                password: ""
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


    async postReq() {
        const str = btoa(this.state.user.login + ':' + this.state.user.password);
        const err = ["Wrong login and/or password"];
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://127.0.0.1:8080/socback/login/user',
                withCredentials: true,  //IMPORTANT!!!
                headers: {
                    'Authorization': 'Basic ' + str
                },
            });
            if (response.status === 401) {
                this.setState({errors: err});
            } else if (response.status === 200) {
                console.log(response.headers);
                const {cookies} = this.props;
                cookies.set('USERID', this.state.user.login, {path: '/'});
                this.setState({uurl: "/userinfo/" + this.state.user.login});
            }
            console.log(this.state);
        } catch (error) {
            if(error.response.status===401)
                this.setState({errors: err});
            console.error(error);
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

    submitForm(event) {
        event.preventDefault();
        this.setState({errors: []});
        this.postReq();
    }

    render() {
        return (
            <div>
                <TopLine cookies={this.props.cookies}/>
                {this.renderErrors()}
                {this.redirect(this.state.uurl)}
                <form className="form-horizontal" onSubmit={this.submitForm.bind(this)}>
                    <div className="row">

                        <div className="form-group col-md-12">
                            <label htmlFor="inputLogin" className="col-sm-2 control-label"><h4>Login</h4></label>
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
                            <label htmlFor="inputPassword" className="col-sm-2 control-label"><h4>Password</h4></label>
                            <div className="col-sm-12">
                                <input type="password" className="form-control" name="password" id="inputPassword"
                                       placeholder="Password"
                                       required="required"
                                       value={this.state.user.password}
                                       onChange={this.handlePasswordChanged.bind(this)}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <Link to="signup" className="btn btn-primary ml-3">Sign
                                Up</Link>
                        </div>
                        <div className="col-md-6"/>
                        <div className="col-md-3">
                            <button type="submit" className="btn btn-primary mr-3">Log In</button>
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