import React from 'react';
import '../bootstrap.css';
import LoginForm from "../components/LoginForm";

export default class Login extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <LoginForm cookies={this.props.cookies}/>
                </div>
            </div>
        )
    }

}

// const mapStateToProps = (state, ownProps) => {
//     return({
//         state: state,
//         cookies: ownProps.cookies,
//     });
// };
// export const LoginContainer = connect(
//     mapStateToProps,
//     null
// )(Login);
//
// export default LoginContainer;