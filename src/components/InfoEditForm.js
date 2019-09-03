import React from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";
// import { makeStyles } from '@material-ui/core/styles';
// import TopLine from "../views/TopLine";
import NewTopbar from "../views/NewTopbar";
// import Container from '@material-ui/core/Container';
// import Paper from '@material-ui/core/Paper'
// import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
// import CardActions from "@material-ui/core/CardActions";
// import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {GridList} from "@material-ui/core";
import GridListTile from "@material-ui/core/GridListTile";
import Avatar from "../avatar.jpg"
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
// import Link from "@material-ui/core/Link";
// import {Toolbar} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import format from "date-fns/format"
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Popover from "@material-ui/core/Popover";

class LocalizedUtils extends DateFnsUtils {
    getCalendarHeaderText(date) {
        return format(date, "dd/mm/yyyy", {locale: this.locale});
    }
}

export default class InfoEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            uurl: "/noacc",
            redirect: false,
            anchorEl1: null,
            open: false,
            logged: false,
            popoverText:"",
            errors: [],
            inputProps: {
                maxLength: 255,
            },
            user: {
                login: "",
                password: "",
                email: ""
            },
            // info: {
            //     name: "Lev Iss",
            //     status: "I'm hard to find, easy to lose and impossible to forget.",
            //     block1: true,
            //     dob: "01:01:1990",
            //     htown: "Vologda",
            //     block2: true,
            //     instagram: "debtwow",
            //     urlname1: "Material-UI",
            //     url1: "https://material-ui.com/",
            //     urlname2: "",
            //     url2: "https://material-ui.com/",
            //     vk: "lev__iss",
            //     block3: true,
            //     music: "different",
            //     about: "Art and life really are the same, and both can only be about a spiritual journey, a path towards a re-union with a supreme creator, " +
            //         "with god, with the divine; and this is true no matter how unlikely, how strange, how unorthodox, one’s particular life path might appear " +
            //         "to one’s self or others at any given moment. – Genesis P-Orridge",
            // }
            info: {
                id: "",
                name: "",
                status: "",
                dob: (new Date()).toDateString(),
                htown: "",
                instagram: "",
                urlname1: "",
                url1: "",
                urlname2: "",
                url2: "",
                vk: "",
                music: "",
                about: "",
            }
        };
        this.handleDateChange = this.handleDateChange.bind(this);
    }


    async editInfo() {
        try {
            const url = 'http://127.0.0.1:8080/socback/app/profile/edit';
            const response = await axios({
                method: 'GET',
                url: url,
                withCredentials: true,
            });
            if (response.data.status === 1) {
                // console.log(response.headers);
                // this.setState({logged: response.headers.logged});
                this.setState({info: response.data.body});
                // console.log(response.data.body);
                // console.log(this.state);
                return Promise.resolve();
            } else if (response.data.status === 2) {

            } else {
                return Promise.reject();
            }
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async updateInfo() {
        const str = JSON.stringify(this.state.info);
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://127.0.0.1:8080/socback/app/profile/update',

                data: str,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.status === 1) {
                this.setState({popoverText: "Changes saved successfully"});
                return Promise.resolve();
            }else if(response.data.status === 2){
                this.setState({popoverText: "Unexpected error occurred. Try again later."})
            }
        } catch (error) {
            console.error(error);
            return Promise.reject(error)
        }
    }

    // renderInfo() {
    //     // console.log(this.state)
    //     if (this.state.logged === 'true') {
    //         return (
    //             <UserL user={this.state.user}/>
    //         )
    //     } else {
    //         return (<User user={this.state.user}/>)
    //     }
    // }


    Success() {
        // console.log(this.state);
        // this.renderInfo();
    }

    Failure() {
        // this.setState({uurl: '/userinfo/undefined'})
        this.setState({redirect: true});
    }

    sendSuccess() {
        this.handlePopoverOpen();
    }

    sendFail() {

    }

    lFailure() {

    }

    componentDidMount() {
        // console.log(login);
        // const {cookies} = this.props;
        // const cLogin = cookies.get('USERID');
        // console.log(cookies.get('USERID'));
        // if (login === cLogin) {
        this.editInfo().then(this.Success.bind(this), this.Failure.bind(this)); //TODO:
        // } else {
        //     this.setState({logged:false});
        //     this.unloggedUser(login).then(this.Success.bind(this), this.uFailure.bind(this))
        // }
        // if (cookies.get('USER') != null) {
        //     this.getReq();
        // }else{
        //     this.setState({uurl: "/noacc"});
        // }

    }

    redirect(url) {
        if (this.state.redirect)
            return (
                <Redirect to={url}/>
            )
    }

    submit(event) {
        event.preventDefault();
        this.updateInfo().then(this.sendSuccess.bind(this), this.sendFail.bind(this));


        // this.setState({errors: ''});
        // let promise = this.sign();
        // promise.then(this.handleSuccess.bind(this), this.handleError.bind(this));
    }

    handleClick(event) {
        this.setState({anchorEl1: event.currentTarget})
    }

    handlePopoverOpen() {
        this.setState({open: true});
    }

    handlePopoverClose() {
        this.setState({open: false});
    }

    handleNameChange(event) {
        // this.setState({user:{login: event.target.value}})
        const str = event.target.value;
        this.setState(prevState => ({
            info: {
                ...prevState.info,
                name: str
            }
        }));
        // console.log(this.state.info)
    }

    handleHtownChange(event) {
        // this.setState({user:{login: event.target.value}})
        const str = event.target.value;
        this.setState(prevState => ({
            info: {
                ...prevState.info,
                htown: str
            }
        }));
    }

    handleDateChange(event, date) {
        console.log(date);
        // this.setState({info:{dob: event.target.value}})
        const str = new Date(date).toDateString();
        this.setState(prevState => ({
            info: {
                ...prevState.info,
                dob: str
            }
        }));
    }

    handleInstChange(event) {
        // this.setState({user:{login: event.target.value}})
        const str = event.target.value;
        this.setState(prevState => ({
            info: {
                ...prevState.info,
                instagram: str
            }
        }));
    }

    handleVkChange(event) {
        // this.setState({user:{login: event.target.value}})
        const str = event.target.value;
        this.setState(prevState => ({
            info: {
                ...prevState.info,
                vk: str
            }
        }));
    }

    handleUrl1Change(event) {
        // this.setState({user:{login: event.target.value}})
        const str = event.target.value;
        this.setState(prevState => ({
            info: {
                ...prevState.info,
                url1: str
            }
        }));
    }

    handleUrln1Change(event) {
        // this.setState({user:{login: event.target.value}})
        const str = event.target.value;
        this.setState(prevState => ({
            info: {
                ...prevState.info,
                urlname1: str
            }
        }));
    }

    handleUrl2Change(event) {
        // this.setState({user:{login: event.target.value}})
        const str = event.target.value;
        this.setState(prevState => ({
            info: {
                ...prevState.info,
                url2: str
            }
        }));
    }

    handleUrln2Change(event) {
        // this.setState({user:{login: event.target.value}})
        const str = event.target.value;
        this.setState(prevState => ({
            info: {
                ...prevState.info,
                urlname2: str
            }
        }));
    }

    handleMusicChange(event) {
        // this.setState({user:{login: event.target.value}})
        const str = event.target.value;
        this.setState(prevState => ({
            info: {
                ...prevState.info,
                music: str
            }
        }));
    }

    handleAboutChange(event) {
        // this.setState({user:{login: event.target.value}})
        const str = event.target.value;
        this.setState(prevState => ({
            info: {
                ...prevState.info,
                about: str
            }
        }));
    }

    render() {


        return (
            <div className={this.state.classes.root}>
                {this.redirect(this.state.uurl)}
                <NewTopbar cookies={this.props.cookies} pageName="Edit"/>
                {/*{this.auth(this.state.logged)}*/}
                <main className={this.state.classes.content}>
                    <div className={this.state.classes.toolbar}/>
                    <Paper className={this.state.classes.paper}>
                        <Typography component="h1" variant="h4">
                            Edit your info
                        </Typography>
                        <form onSubmit={this.submit.bind(this)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        id="name"
                                        name="name"
                                        label="Full name"
                                        fullWidth
                                        autoFocus
                                        value={this.state.info.name}
                                        onChange={this.handleNameChange.bind(this)}
                                    />
                                </Grid>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid item xs={12} sm={4}>
                                        <KeyboardDatePicker
                                            autoOk
                                            // clearable
                                            // disableToolbar
                                            fullWidth
                                            disableFuture
                                            variant="inline"
                                            format="dd/MMM/yyyy"
                                            views={["year", "month", "date"]}
                                            openTo="year"
                                            // margin="normal"
                                            // id="date-of-birth"
                                            label="Date of birth"
                                            className={this.state.classes.date}
                                            value={new Date(this.state.info.dob)}
                                            onChange={this.handleDateChange}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        id="home-town"
                                        name="home-town"
                                        label="Home town"
                                        fullWidth
                                        value={this.state.info.htown}
                                        onChange={this.handleHtownChange.bind(this)}
                                    />
                                </Grid>
                                <Grid item xs={12}><Divider/></Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="instagram"
                                        label="Instagram login"
                                        fullWidth
                                        type="text"
                                        value={this.state.info.instagram}
                                        onChange={this.handleInstChange.bind(this)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="vk"
                                        label="Vk short url"
                                        fullWidth
                                        type="text"
                                        value={this.state.info.vk}
                                        onChange={this.handleVkChange.bind(this)}
                                    />
                                </Grid>
                                <Grid item xs={4} sm={2}>
                                    <TextField
                                        name="urlname1"
                                        label="Url name"
                                        fullWidth
                                        value={this.state.info.urlname1}
                                        onChange={this.handleUrln1Change.bind(this)}
                                    />
                                </Grid>
                                <Grid item xs={8} sm={4}>
                                    <TextField
                                        name="url1"
                                        label="Url"
                                        fullWidth
                                        type="text"
                                        value={this.state.info.url1}
                                        onChange={this.handleUrl1Change.bind(this)}
                                    />
                                </Grid>
                                <Grid item xs={4} sm={2}>
                                    <TextField
                                        name="urlname1"
                                        label="Url name"
                                        fullWidth
                                        value={this.state.info.urlname2}
                                        onChange={this.handleUrln2Change.bind(this)}
                                    />
                                </Grid>
                                <Grid item xs={8} sm={4}>
                                    <TextField
                                        name="url1"
                                        label="Url"
                                        fullWidth
                                        type="text"
                                        value={this.state.info.url2}
                                        onChange={this.handleUrl2Change.bind(this)}
                                    />
                                </Grid>
                                <Grid item xs={12}><Divider/></Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="music"
                                        label="Music"
                                        fullWidth
                                        value={this.state.info.music}
                                        onChange={this.handleMusicChange.bind(this)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="about"
                                        label="About yourself"
                                        multiline
                                        rows="4"
                                        fullWidth
                                        value={this.state.info.about}
                                        onChange={this.handleAboutChange.bind(this)}
                                        variant="outlined"
                                        type="text"
                                        inputProps={this.state.inputProps}
                                        helperText={this.state.info.about.length + "/255"}
                                    />
                                </Grid>
                            </Grid>
                            <div className={this.state.classes.button}>
                                <Button
                                    type="submit"
                                    // fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={this.state.classes.submit}
                                    onClick={this.handleClick.bind(this)}
                                >
                                    Submit changes
                                </Button>
                                <Popover
                                    id="mouse-over-popover-log"
                                    className={this.state.classes.popover}
                                    classes={{
                                        paper: this.state.classes.paper,
                                    }}
                                    open={this.state.open}
                                    anchorEl={this.state.anchorEl1}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    onClose={this.handlePopoverClose.bind(this)}
                                    disableRestoreFocus
                                >
                                    <Typography>{this.state.popoverText}</Typography>
                                </Popover>
                            </div>
                        </form>
                    </Paper>
                </main>
            </div>
        )
    }
}