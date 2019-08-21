import React from 'react';
import '../bootstrap.css';
import {
    Link,
    Redirect
} from 'react-router-dom';
import NewTopbar from "../views/NewTopbar";

export default class IndexForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            uurl: ""
        }
    }

    componentDidMount() {
        if (this.props.cookies.get('USERID', {path: '/'}) !== undefined)
            this.setState({uurl: "/userinfo/" + this.props.cookies.get('USERID', {path: '/'})});
    }

    redirect(url) {
        return (
            <Redirect to={url}/>
        )
    }

    render() {
        return (
            <div className={this.state.classes.root}>
                {this.redirect(this.state.uurl)}
                <NewTopbar cookies={this.props.cookies} pageName="Home"/>
                <main className={this.state.classes.content}>
                    <div className={this.state.classes.toolbar} />
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
                </main>
            </div>
        )
    }
}