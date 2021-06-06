import React from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom'
// import TopLine from "../views/TopLine";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from "@material-ui/core/Button";
// import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import NewTopbar from "../views/NewTopbar";

// import FormHelperText from "@material-ui/core/FormHelperText";

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

export default class RegForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uurl: "/signup",
            errors: [],
            user: {
                login: "",
                password: "",
                email: "",
                name: ""
            },
            role: "",
            classes: props.classes,
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

    handleNameChanged(event) {
        const str = event.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                name: str
            }
        }));
    }

    handleEmailChanged(event) {
        const str = event.target.value;
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                email: str
            }
        }));
    }

    async postSign() {
        const str = btoa(this.state.user.login + ':' + this.state.user.password);
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
            if (response.status === 200) {
                this.setState({role: response.data.body});
                const {cookies} = this.props;
                if (this.state.role === 'ADMIN')
                    cookies.set('USERROLE', 'ADMIN', {path: '/'});
                return Promise.resolve();
            }
            // console.log(this.state);
        } catch (error) {
            return Promise.reject(error);
            // if (error.response.status === 401)
        }
    }

    // async postSign() {
    //     const str = btoa(this.state.user.login + ':' + this.state.user.password);
    //     try {
    //         await axios({
    //             method: 'POST',
    //             url: "http://127.0.0.1:8080/socback/login/user",
    //             withCredentials: true,
    //             headers: {
    //                 'Authorization': 'Basic ' + str,
    //             }
    //         });
    //         return Promise.resolve();
    //     } catch (error) {
    //
    //         console.error(error);
    //         return Promise.reject(error);
    //     }
    // }

    async sign() {
        const str = JSON.stringify(this.state.user);
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://127.0.0.1:8080/socback/signup/add',

                data: str,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.status === 1)
                return Promise.resolve();
            else {
                this.setState({errors: response.data.errors});
                return Promise.reject();
            }
        } catch (error) {
            return Promise.reject(error)
        }
    }

    redirect(url) {
        return (
            <Redirect to={url}/>
        )
    }

    sucRedirect() {
        this.setState({uurl: "/profile/" + this.state.user.login})
    }

    handleSuccess() {
        this.postSign().then(this.sucRedirect.bind(this), this.handleError());
        const {cookies} = this.props;
        cookies.set('USERID', this.state.user.login, {path: '/'});
    }

    handleError() {

    }

    buttonClick(event) {
        event.preventDefault();
        this.setState({errors: ''});
        let promise = this.sign();
        promise.then(this.handleSuccess.bind(this), this.handleError.bind(this));
    }

    componentDidMount() {
        if (this.props.cookies.get('USERID', {path: '/'}) !== undefined)
            this.setState({uurl: "/userinfo/" + this.props.cookies.get('USERID', {path: '/'})});
    }

    render() {
        return (
            <div className={this.state.classes.root}>
                <NewTopbar cookies={this.props.cookies} pageName="Sign Up"/>
                {this.redirect(this.state.uurl)}
                <main className={this.state.classes.content}>
                    <div className={this.state.classes.toolbar}/>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline/>
                        <div className={this.state.classes.paper}>
                            <Avatar className={this.state.classes.avatar}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <form className={this.state.classes.form}>
                                <Grid container spacing={2}>
                                    {!this.state.errors.includes("This login is already taken!") ?
                                        (
                                            <Grid item xs={12}>
                                                <TextField
                                                    autoComplete="login"
                                                    name="login"
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="login"
                                                    label="Login"
                                                    autoFocus
                                                    value={this.state.user.login}
                                                    onChange={this.handleLoginChanged.bind(this)}
                                                />
                                            </Grid>
                                        ) : (
                                            <Grid item xs={12}>
                                                <TextField
                                                    error
                                                    autoComplete="login"
                                                    name="login"
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="login"
                                                    label="Login"
                                                    autoFocus
                                                    value={this.state.user.login}
                                                    onChange={this.handleLoginChanged.bind(this)}
                                                    helperText={"This login is already taken!"}
                                                />
                                            </Grid>
                                        )
                                    }
                                    {!this.state.errors.includes("This E-mail is already taken!") ?
                                        (
                                            <Grid item xs={12}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="email"
                                                    label="Email Address"
                                                    name="email"
                                                    autoComplete="email"
                                                    value={this.state.user.email}
                                                    onChange={this.handleEmailChanged.bind(this)}
                                                />
                                            </Grid>
                                        ) : (
                                            <Grid item xs={12}>
                                                <TextField
                                                    error
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="email"
                                                    label="Email Address"
                                                    name="email"
                                                    autoComplete="email"
                                                    value={this.state.user.email}
                                                    onChange={this.handleEmailChanged.bind(this)}
                                                    helperText={"This E-mail is already taken!"}
                                                />
                                            </Grid>
                                        )
                                    }
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
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
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="fname"
                                            label="Full name"
                                            id="fname"
                                            value={this.state.user.name}
                                            onChange={this.handleNameChanged.bind(this)}
                                        />
                                    </Grid>
                                </Grid>
                                {/*</Grid>)*/}
                                {/*: this.state.errors === 'This login is already taken!' ?*/}
                                {/*(*/}
                                {/*<Grid container spacing={2}>*/}
                                {/*    <Grid item xs={12}>*/}
                                {/*        <TextField*/}
                                {/*            error*/}
                                {/*            autoComplete="login"*/}
                                {/*            name="login"*/}
                                {/*            variant="outlined"*/}
                                {/*            required*/}
                                {/*            fullWidth*/}
                                {/*            id="login"*/}
                                {/*            label="Login"*/}
                                {/*            autoFocus*/}
                                {/*            value={this.state.user.login}*/}
                                {/*            onChange={this.handleLoginChanged.bind(this)}*/}
                                {/*            helperText={this.state.errors}*/}
                                {/*        />*/}
                                {/*    </Grid>*/}
                                {/*    <Grid item xs={12}>*/}
                                {/*        <TextField*/}
                                {/*            variant="outlined"*/}
                                {/*            required*/}
                                {/*            fullWidth*/}
                                {/*            id="email"*/}
                                {/*            label="Email Address"*/}
                                {/*            name="email"*/}
                                {/*            autoComplete="email"*/}
                                {/*            value={this.state.user.email}*/}
                                {/*            onChange={this.handleEmailChanged.bind(this)}*/}
                                {/*        />*/}
                                {/*    </Grid>*/}
                                {/*    <Grid item xs={12}>*/}
                                {/*        <TextField*/}
                                {/*            variant="outlined"*/}
                                {/*            required*/}
                                {/*            fullWidth*/}
                                {/*            name="password"*/}
                                {/*            label="Password"*/}
                                {/*            type="password"*/}
                                {/*            id="password"*/}
                                {/*            autoComplete="current-password"*/}
                                {/*            value={this.state.user.password}*/}
                                {/*            onChange={this.handlePasswordChanged.bind(this)}*/}
                                {/*        />*/}
                                {/*    </Grid>*/}
                                {/*    <Grid item xs={12}>*/}
                                {/*        <TextField*/}
                                {/*            variant="outlined"*/}
                                {/*            required*/}
                                {/*            fullWidth*/}
                                {/*            name="fname"*/}
                                {/*            label="Full name"*/}
                                {/*            id="fname"*/}
                                {/*            value={this.state.user.name}*/}
                                {/*            onChange={this.handleNameChanged.bind(this)}*/}
                                {/*        />*/}
                                {/*    </Grid>*/}
                                {/*    /!*<FormHelperText id="component-error-text" error>{this.state.errors}</FormHelperText>*!/*/}
                                {/*</Grid>*/}
                                {/*)*/}
                                {/*:*/}
                                {/*(*/}
                                {/*<Grid container spacing={2}>*/}
                                {/*    <Grid item xs={12}>*/}
                                {/*        <TextField*/}
                                {/*            autoComplete="login"*/}
                                {/*            name="login"*/}
                                {/*            variant="outlined"*/}
                                {/*            required*/}
                                {/*            fullWidth*/}
                                {/*            id="login"*/}
                                {/*            label="Login"*/}
                                {/*            autoFocus*/}
                                {/*            value={this.state.user.login}*/}
                                {/*            onChange={this.handleLoginChanged.bind(this)}*/}
                                {/*        />*/}
                                {/*    </Grid>*/}
                                {/*    <Grid item xs={12}>*/}
                                {/*        <TextField*/}
                                {/*            error*/}
                                {/*            variant="outlined"*/}
                                {/*            required*/}
                                {/*            fullWidth*/}
                                {/*            id="email"*/}
                                {/*            label="Email Address"*/}
                                {/*            name="email"*/}
                                {/*            autoComplete="email"*/}
                                {/*            value={this.state.user.email}*/}
                                {/*            onChange={this.handleEmailChanged.bind(this)}*/}
                                {/*            helperText={this.state.errors}*/}
                                {/*        />*/}
                                {/*    </Grid>*/}
                                {/*    <Grid item xs={12}>*/}
                                {/*        <TextField*/}
                                {/*            variant="outlined"*/}
                                {/*            required*/}
                                {/*            fullWidth*/}
                                {/*            name="password"*/}
                                {/*            label="Password"*/}
                                {/*            type="password"*/}
                                {/*            id="password"*/}
                                {/*            autoComplete="current-password"*/}
                                {/*            value={this.state.user.password}*/}
                                {/*            onChange={this.handlePasswordChanged.bind(this)}*/}
                                {/*        />*/}
                                {/*    </Grid>*/}
                                {/*    <Grid item xs={12}>*/}
                                {/*        <TextField*/}
                                {/*            variant="outlined"*/}
                                {/*            required*/}
                                {/*            fullWidth*/}
                                {/*            name="fname"*/}
                                {/*            label="Full name"*/}
                                {/*            id="fname"*/}
                                {/*            value={this.state.user.name}*/}
                                {/*            onChange={this.handleNameChanged.bind(this)}*/}
                                {/*        />*/}
                                {/*    </Grid>*/}
                                {/*<FormHelperText id="component-error-text" error>{this.state.errors}</FormHelperText>*/}

                                {/*<Grid item xs={12}>*/}
                                {/*    <FormControlLabel*/}
                                {/*        control={<Checkbox value="allowExtraEmails" color="primary" />}*/}
                                {/*        label="I want to receive inspiration, marketing promotions and updates via email."*/}
                                {/*    />*/}
                                {/*</Grid>*/}

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={this.state.classes.submit}
                                    onClick={this.buttonClick.bind(this)}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Link to="login" variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                        <Box mt={5}>
                            <Copyright/>
                        </Box>
                    </Container>
                </main>
            </div>
        )
    }
}