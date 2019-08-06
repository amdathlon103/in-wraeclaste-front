import React, {Component} from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import {withCookies} from 'react-cookie';
// import logo from './logo.svg';

import './App.css';
import Login from "./views/Login";
import Regis from "./views/Regis";
import Index from "./views/Index";
import List from "./components/List";
import UserInfo from "./views/UserInfo";
import NoAccess from "./components/NoAccess";
import TopLine from "./views/TopLine"
import NotFound from "./components/NotFound";

class App extends Component {
    render() {
        return (
            <div className="App">
                <TopLine cookies={this.props.cookies}/>
                <Switch>
                    <Route exact path="/" render={() => (<Index cookies={this.props.cookies}/>)}/>
                    <Route path="/login" render={() => (<Login cookies={this.props.cookies}/>)}/>
                    <Route path="/signup" render={() => (<Regis cookies={this.props.cookies}/>)}/>
                    <Route path="/list" render={() => (<List cookies={this.props.cookies}/>)}/>
                    {/*<Route path="/userinfo" render={() => (<UserInfo cookies={this.props.cookies}/>)}/>*/}
                    <Route path="/noacc" render={() => (<NoAccess cookies={this.props.cookies}/>)}/>
                    <Route exact path="/userinfo/undefined" component={NotFound}/>
                    <Route
                        path="/userinfo/:login"
                        render={({match}) => {
                            const login = match.params.login;
                            return <UserInfo login={login} cookies={this.props.cookies}/>
                        }}
                    />
                    <Route component={NotFound}/>
                </Switch>
            </div>
        );
    }
}

// function Contact(){
//     return(
//         <div>
//             <p>Hi :3</p>
//         </div>
//     )
// }


// function Index(){
//     return(
//         <div>
//             <h4><Link to="/login">login</Link></h4>
//             <h4><Link to="/signup">signup</Link></h4>
//             <h4><Link to="/contact">contact</Link></h4>
//         </div>
//     )
// }

export default withCookies(App);