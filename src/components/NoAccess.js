import React from 'react';
import {Link} from 'react-router-dom'

export default class NoAccess extends React.Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6 ml-3">
                        <h1>Unauthorised!</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 ml-3">
                        <Link to="" className="btn btn-primary mr-3">Get back</Link>
                    </div>
                </div>
            </div>
        )
    }
}