import React from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import NewTopbar from "../views/NewTopbar";
import Paper from '@material-ui/core/Paper'

export default class UserInfoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            uurl: "/userinfo/" + props.login,
            logged: false,
            errors: [],
            user: {
                id: "",
                login: "",
                password: "",
                email: ""
            }
        }
    }


    // async loggedUser(login) {
    //     try {
    //         const url = 'http://127.0.0.1:8080/socback/userinfo1/' + login;
    //         const response = await axios({
    //             method: 'GET',
    //             url: url,
    //             withCredentials: true,
    //         });
    //         this.setState({user: response.data});
    //         return Promise.resolve();
    //     } catch (e) {
    //         return Promise.reject(e);
    //     }
    // }

    async loggedUser(login) {
        try {
            const url = 'http://127.0.0.1:8080/socback/userinfo/' + login;
            const response = await axios({
                method: 'GET',
                url: url,
                withCredentials: true,
            });
            if (response.data.status !== 2 && response.data.status !== 3) {
                // console.log(response.headers);
                this.setState({logged: response.headers.logged});
                this.setState({user: response.data.body});
                // console.log(this.state);
                return Promise.resolve();
            } else {
                return Promise.reject();
            }
        } catch (e) {
            return Promise.reject(e);
        }
    }

    renderInfo() {
        // console.log(this.state)
        if (this.state.logged === 'true') {
            return (
                <UserL user={this.state.user}/>
            )
        } else {
            return (<User user={this.state.user}/>)
        }
    }


    Success() {
        // console.log(this.state);
        // console.log('hui');
        // this.renderInfo();
    }

    Failure() {
        this.setState({uurl: '/userinfo/undefined'})
    }

    lFailure() {

    }

    componentDidMount() {
        const {login} = this.props;
        // console.log(login);
        // const {cookies} = this.props;
        // const cLogin = cookies.get('USERID');
        // console.log(cookies.get('USERID'));
        // if (login === cLogin) {
        this.loggedUser(login).then(this.Success.bind(this), this.Failure.bind(this));
        // } else {
        //     this.setState({logged:false});
        //     this.unloggedUser(login).then(this.Success.bind(this), this.uFailure.bind(this))
        // }
        // if (cookies.get('USER') != null) {
        //     this.getReq();
        // }else{
        //     this.setState({uurl: "/noacc"});
        // }
    }

    redirect(url) {
        return (
            <Redirect to={url}/>
        )
    }


    render() {


        return (
            <div className={this.state.classes.root}>

                <NewTopbar cookies={this.props.cookies} pageName="Profile"/>
                {/*{this.auth(this.state.logged)}*/}
                <main className={this.state.classes.content}>
                    <div className={this.state.classes.toolbar}/>
                    <Paper>
                        <div className="row">
                            {this.redirect(this.state.uurl)}
                            <div className="col-md-auto">
                                <div className="row">
                                    <span className="col-md-12 ml-2"><h2>You provided the following data:</h2></span>
                                </div>
                                {this.renderInfo()}
                                <div className="row">

                                    <div className="col-md-3"/>
                                    <div className="col-md-6"/>
                                </div>
                            </div>
                        </div>
                    </Paper>
                </main>
            </div>
        )
    }
}

function UserL(props) {
    return (
        <div>
            <div className="row">
                <div className="col-md-12 ml-2"><strong>Id: </strong>{props.user.id}</div>
            </div>
            <div className="row">
                <div className="col-md-12 ml-2"><strong>Login: </strong> {props.user.login}</div>
            </div>
            < div
                className="row">
                < div
                    className="col-md-12 ml-2">< strong> password
                    : </strong> {props.user.password}</div>
            </div>
            <div className="row">
                <div className="col-md-12 ml-2"><strong>Email: </strong>{props.user.email}</div>
            </div>
            <div className="row">
                <div className="col-md-12 ml-2"><strong>Some other info some day</strong></div>
            </div>
        </div>
    )
}

function User(props) {
    return (
        <div>
            <div className="row">
                <div className="col-md-12 ml-2"><strong>User login: </strong> {props.user.login}</div>
            </div>
            <div className="row">
                <div className="col-md-12 ml-2"><strong>Some other info some day</strong></div>
            </div>
        </div>
    )
}