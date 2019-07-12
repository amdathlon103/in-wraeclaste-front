import React from 'react';

export default class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            login: "",
            password: ""
        }
    }

    handleLoginChanged(event) {
        this.setState({login: event.target.value})
    }

    handlePasswordChanged(event) {
        this.setState({password: event.target.value})
    }

    buttonClick(event) {
        event.preventDefault();
        console.log(JSON.stringify(this.state));
        fetch("http://localhost:8080/socback/login/get")
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result);
                    console.log(JSON.stringify(result));
                },
                (error) => {
                    console.log('omaewa mo shindeiru',error);
                }
            )
    }

    submitForm(event) {
        event.preventDefault();
        // fetch("http://localhost:8080/socback/login/get")
        //     .then(function (response) {
        //         return response.json();
        //     })
        //     .then(function (myJson) {
        //         console.log(JSON.stringify(myJson));
        //     });
        fetch('http://localhost:8080/socback/login/user',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                Accept: 'application/json',
                // Some: 'application/json1'
            },
            mode: 'no-cors',
            body: '{"password":"1245","login":"debt"}'
        })
            .then(
                function (response) {
                    // console.log('{"password":"1245","login":"debt"}');
                    if (response.status !== 200) {
                        console.log('maybe one more time ' + response.status);
                        return;
                    }

                    response.text().then(function (data) {
                        console.log(data);
                    });
                }
            ).catch(function (err) {
            console.log('Fetch error :-S',err)
        });
    }

    render() {
        return (
            <div>
                <form className="form-horizontal" onSubmit={this.submitForm.bind(this)}>
                    <div className="row">

                        <div className="form-group col-md-12">
                            <label htmlFor="inputLogin" className="col-sm-2 control-label"><h4>Login</h4></label>
                            <div className="col-sm-12">
                                <input type="login" className="form-control" name="login" id="inputLogin"
                                       placeholder="Login"
                                    // required="required"
                                       value={this.state.login}
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
                                    // required="required"
                                       value={this.state.password}
                                       onChange={this.handlePasswordChanged.bind(this)}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <a href="signUp" className="btn btn-primary ml-3" onClick={this.buttonClick.bind(this)}>Sign
                                Up</a>
                        </div>
                        <div className="col-md-6"></div>
                        <div className="col-md-3">
                            <button type="submit" className="btn btn-primary mr-3">Log In</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}