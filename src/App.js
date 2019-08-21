import React, {Component} from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import {withCookies} from 'react-cookie';
// import logo from './logo.svg';

import './App.css';
// import Login from "./views/Login";
// import Regis from "./views/Regis";
import Index from "./views/Index";
import List from "./views/List";
import UserInfo from "./views/UserInfo";
import NoAccess from "./components/NoAccess";
import NotFound from "./components/NotFound";
import NewLogin from "./views/NewLogin";
import NewSignup from "./views/NewSignup";
import NewToolbar from "./views/NewTopbar";
import Messages from "./views/Messages";

class App extends Component {
    render() {
        return (

                <Switch>
                    {/*<div className="App">*/}
                    <Route exact path="/" render={() => (<Index cookies={this.props.cookies}/>)}/>
                    <Route path="/testing" render={() => (<NewToolbar cookies={this.props.cookies}/>)}/>
                    <Route path="/login" render={() => (<NewLogin cookies={this.props.cookies}/>)}/>
                    <Route path="/signup" render={() => (<NewSignup cookies={this.props.cookies}/>)}/>
                    <Route path="/list" render={() => (<List cookies={this.props.cookies}/>)}/>
                    <Route path="/messages" render={()=>(<Messages cookies={this.props.cookies}/>)}/>
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
                {/*</div>*/}
                </Switch>

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