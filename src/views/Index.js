import React from 'react';
import '../bootstrap.css';
import {
    Link
} from 'react-router-dom';
import TopLine from "./TopLine";

export default class Index extends React.Component {

    render() {
        return (
            <div>
                <TopLine cookies={this.props.cookies}/>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col"><h1>Welcome!</h1></div>

                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col"><h2>Glad to see you here!</h2></div>
                    </div>
                    <div className="row justify-content-md-center">
                        {/*<div className="col-8">*/}
                        <div className="col-2">
                            <Link to="signup" className="btn btn-primary ">Sign
                                Up</Link>
                        </div>
                        <div className="col-2">
                            <Link to="list" className="btn btn-primary ">List</Link>
                        </div>
                        {/*<div className="col-sm-1"/>*/}
                        <div className="col-2">
                            <Link to="login" className="btn btn-primary ">Log
                                In</Link>
                        </div>
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        )
    }
}