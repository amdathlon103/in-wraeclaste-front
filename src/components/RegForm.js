import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom'

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

    async sign() {
        const str = JSON.stringify(this.state.user);
        try {
            const response = await axios({
                method: 'POST',
                url: 'socback/signup/sign',

                data: str,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const resp = response.data;
            if (!(resp === "OK")) {
                this.setState({errors: resp})
                const {cookies} = this.props;
                cookies.set('USER', this.state.user.login, {path: '/'});
                this.setState({uurl: "/userinfo"});

            } else {
                console.log('we need redirect here');
            }
            console.log(this.state)
        } catch (error) {
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

    buttonClick(event) {
        event.preventDefault();
        this.setState({errors: []});
        this.sign();
    }


    render() {
        return (
            <div>
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
