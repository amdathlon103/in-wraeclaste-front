import React from 'react';
import '../bootstrap.css';
import TopLineForm from "../components/TopLineForm";


export default class TopLine extends React.Component {
    render() {
        return (
            <div className="container">
                <TopLineForm cookies={this.props.cookies}/>
                <p/>
            </div>
        )
    }

}