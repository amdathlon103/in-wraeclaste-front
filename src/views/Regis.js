import React from 'react';
import '../bootstrap.css';
import SignupForm from '../components/RegForm'

export default class Regis extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <SignupForm cookies={this.props.cookies}/>
                </div>
            </div>
        )
    }

}