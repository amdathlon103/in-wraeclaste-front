import React from 'react';
import '../bootstrap.css';
import LoginForm from "../components/LoginForm";

export default class Login extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <LoginForm/>
                </div>
            </div>
        )
    }

}