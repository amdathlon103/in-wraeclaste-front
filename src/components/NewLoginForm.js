import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from '@material-ui/core/FormHelperText';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
// import Link from "@material-ui/core/Link";
import {Link, Redirect} from "react-router-dom";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import React from "react";
import axios from "axios";
import NewTopbar from "../views/NewTopbar";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <a color="inherit" href="/">
                V Wraeclaste
            </a>{' '}
            {new Date().getFullYear()}
            {'. Built with '}
            <a color="inherit" href="https://material-ui.com/">
                Material-UI.
            </a>
        </Typography>
    );
}

export default class NewLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: "",
            classes: props.classes,
            uurl: "/login",
            errors: '',
            user: {
                login: "",
                password: ""
            }
        }

    }

    handleLoginChanged(event) {
        // this.setState({user:{login: event.target.value}})
        const str = event.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                login: str
            }
        }));
    }

    handlePasswordChanged(event) {
        const str = event.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                password: str
            }
        }));
    }

    async postReq() {
        const str = btoa(this.state.user.login + ':' + this.state.user.password);
        const err = 'Wrong login and/or password';
        const data = JSON.stringify(this.state.user);
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://127.0.0.1:8080/socback/login/user',
                withCredentials: true,  //IMPORTANT!!!
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + str
                },
                data: data,
            });
            if (response.status === 401) {
                this.setState({errors: err});
            } else if (response.status === 200) {
                this.setState({role: response.data.body});
                const {cookies} = this.props;
                if (this.state.role === 'ADMIN')
                    cookies.set('USERROLE','ADMIN', {path: '/'});
                cookies.set('USERID', this.state.user.login, {path: '/'});
                this.setState({uurl: "/userinfo/" + this.state.user.login});
            }
            // console.log(this.state);
        } catch (error) {

            // if (error.response.status === 401)
            this.setState({errors: err});
            console.error(error);
        }
    }

    submitForm(event) {
        event.preventDefault();
        this.setState({errors: ''});
        this.postReq();
    }

    redirect(url) {
        return (
            <Redirect to={url}/>
        )
    }

    render() {
        return (
            <div className={this.state.classes.root}>
                <NewTopbar cookies={this.props.cookies} pageName="Login" role={this.state.role}/>
                <main className={this.state.classes.content}>
                    <div className={this.state.classes.toolbar}/>
                    <Container component="main" maxWidth="xs">

                        {this.redirect(this.state.uurl)}
                        <CssBaseline/>
                        <div className={this.state.classes.paper}>
                            <Avatar className={this.state.classes.avatar}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <form className={this.state.classes.form} onSubmit={this.submitForm.bind(this)}>
                                {this.state.errors === '' ?
                                    (<div>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="login"
                                                label="Login"
                                                name="login"
                                                autoComplete="login"
                                                autoFocus
                                                value={this.state.user.login}
                                                onChange={this.handleLoginChanged.bind(this)}
                                            />
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                autoComplete="current-password"
                                                value={this.state.user.password}
                                                onChange={this.handlePasswordChanged.bind(this)}
                                            />
                                        </div>
                                    )
                                    : (
                                        <div>
                                            <TextField
                                                error
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="login"
                                                label="Login"
                                                name="login"
                                                autoComplete="login"
                                                autoFocus
                                                value={this.state.user.login}
                                                onChange={this.handleLoginChanged.bind(this)}
                                            />
                                            <TextField
                                                error
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                autoComplete="current-password"
                                                value={this.state.user.password}
                                                onChange={this.handlePasswordChanged.bind(this)}
                                            />
                                            <FormHelperText id="component-error-text"
                                                            error>{this.state.errors}</FormHelperText>
                                        </div>
                                    )
                                }
                                {/*<FormControlLabel*/}
                                {/*    control={<Checkbox value="remember" color="primary"/>}*/}
                                {/*    label="Remember me"*/}
                                {/*/>*/}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={this.state.classes.submit}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link to="nowhere" href="#" variant="body2">
                                            {/*Forgot password?*/}
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link to="signup" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                        {/*<Link href="#" variant="body2">*/}
                                        {/*    {"Don't have an account? Sign Up"}*/}
                                        {/*</Link>*/}
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                        <Box mt={8}>
                            <Copyright/>
                        </Box>
                    </Container>
                </main>
            </div>
        )
    }
}