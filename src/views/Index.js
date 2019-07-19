import React from 'react';
import '../bootstrap.css';
import {
    Link
} from 'react-router-dom';

export default class Index extends React.Component {

    render() {
        return (

            <div className="row">
                <div className="col-md-4">
                    <div className="row">
                        <span className="col-md-12 ml-2"><h1>Welcome!</h1></span>
                    </div>
                    <div className="row">
                        <span className="col-md-12 ml-2"><h2>Glad to see you here!</h2></span>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <Link to="signup" className="btn btn-primary ml-3">Sign
                                Up</Link>
                        </div>
                        <div className="col-md-1"/>
                        <div className="col-md-3" align="right">
                            <Link to="list" className="btn btn-primary ml-3">List</Link>
                        </div>
                        <div className="col-md-1"/>
                        <div className="col-md-3" align="right">
                            <Link to="login" className="btn btn-primary ml-3">Log
                                In</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}