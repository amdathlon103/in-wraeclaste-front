import React from 'react';
import '../bootstrap.css';
import axios from 'axios';
import {Link} from "react-router-dom";

export default class TopLineForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            uurl: "/userinfo/"+this.props.cookies.get('USERID', {path: '/'})
        }
    }

    // async getReq() {
    //     try {
    //         const response = await axios({
    //             method: 'GET',
    //             url: 'socback/login/username',
    //         });
    //         this.setState({username: response.data})
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    async logoutReq() {
        try {
            await axios({
                method: 'GET',
                url: 'http://127.0.0.1:8080/socback/logout',
                crossDomain: true,
                withCredentials: true,
            });
        } catch (e) {
            console.log(e);
        }
    }


    componentDidMount() {
        this.setState({username: this.props.cookies.get('USERID', {path: '/'})});
        // console.log(this.state.username);
        if(this.state.username!=="")
        this.setState({uurl: "/userinfo/"+this.props.cookies.get('USERID', {path: '/'})});
        // console.log(this.state.uurl)
        // this.getReq();
    }

    handleClick(event) {
        event.preventDefault();
        const {cookies} =this.props;
        cookies.remove('USERID', {path: '/'});
        this.logoutReq();
        this.setState({username: ""});

    }

    render() {
        return (
            <div className="row">
                <div className="col-1">
                    <Link to="/" className="btn btn-primary btn-sm">Home</Link>
                </div>
                <div className="col-2"/>
                <div className="col-7">
                    <Link to={this.state.uurl} className="text-right text-danger">[{this.state.username}]</Link>
                </div>
                <div className="col-1"/>
                <div className="col-1">
                    <button type="button" className="btn btn-primary btn-sm"
                            onClick={this.handleClick.bind(this)}>Logout
                    </button>
                </div>

            </div>
        )
    }

}