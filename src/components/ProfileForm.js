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
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
// import Link from "@material-ui/core/Link";
// import {Toolbar} from "@material-ui/core";

export default class ProfileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            uurl: "/profile/" + props.login,
            logged: false,
            errors: [],
            edit: "",
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
            //     about: "I am creator of this abomination :3",
            // }
            info: {
                id: "",
                name: "",
                status: "",
                block1: false,
                dob: "",
                htown: "",
                block2: false,
                instagram: "",
                urlname1: "",
                url1: "",
                urlname2: "",
                url2: "",
                vk: "",
                block3: false,
                music: "",
                about: "",
            }
        }
    }


    // async loggedUser(login) {
    //     try {
    //         const url = 'http://127.0.0.1:8080/socback/userinfo1/' + login;
    //         const response = await axios({
    //             method: 'GET',
    //             url: url,
    //             withCredentials: true,
    //         });
    //         this.setState({user: response.data});
    //         return Promise.resolve();
    //     } catch (e) {
    //         return Promise.reject(e);
    //     }
    // }

    async loggedUser(login) {
        try {
            const url = 'http://127.0.0.1:8080/socback/app/profile/' + login;
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
            } else {
                return Promise.reject();
            }
        } catch (e) {
            return Promise.reject(e);
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
        console.log(this.props.login);
        if (this.props.login === this.props.cookies.get('USERID', {path: '/'})) {
            if (this.state.info.status === "") {
                this.setState({edit: "empty"});
            } else {
                this.setState({edit: "edit"});
            }
        }
    }

    Failure() {
        // this.setState({uurl: '/userinfo/undefined'})
    }

    lFailure() {

    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.login !== this.props.login) {
            const {login} = nextProps;
            this.setState({
                user: {
                    login: login,
                }
            });
            this.loggedUser(login).then(this.Success.bind(this), this.Failure.bind(this));
        }
    }

    componentDidMount() {
        const {login} = this.props;
        this.setState({
            user: {
                login: login,
            }
        });
        this.loggedUser(login).then(this.Success.bind(this), this.Failure.bind(this));
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
                <NewTopbar cookies={this.props.cookies} pageName="Profile"/>
                {/*{this.auth(this.state.logged)}*/}
                <main className={this.state.classes.content}>
                    <div className={this.state.classes.toolbar}/>
                    <GridList className={this.state.classes.gridList} cellHeight={410} cols={2}>
                        <GridListTile cols={1} rows={2} className={this.state.classes.gridTile}>
                            <Card className={this.state.classes.infoCard}>
                                <CardMedia
                                    className={this.state.classes.avatar}
                                    image={Avatar}
                                    title="avatar"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {"Hello, world!"}
                                    </Typography>
                                    <Typography className={this.state.classes.title} color="textSecondary" gutterBottom>
                                        some info...
                                    </Typography>
                                </CardContent>
                            </Card>
                        </GridListTile>
                        <GridListTile rows={2} cols={1}>
                            <Card className={this.state.classes.infoCard}>
                                <CardContent>
                                    <User info={this.state.info} classes={this.state.classes} edit={this.state.edit}/>
                                </CardContent>
                            </Card>
                        </GridListTile>
                    </GridList>
                </main>
            </div>
        )
    }
}

// function UserL(props) {
//     return (
//         <div>
//             <div className="row">
//                 <div className="col-md-12 ml-2"><strong>Login: </strong> {props.user.login}</div>
//             </div>
//             < div
//                 className="row">
//                 < div
//                     className="col-md-12 ml-2">< strong> password
//                     : </strong> {props.user.password}</div>
//             </div>
//             <div className="row">
//                 <div className="col-md-12 ml-2"><strong>Email: </strong>{props.user.email}</div>
//             </div>
//             <div className="row">
//                 <div className="col-md-12 ml-2"><strong>Some other info some day</strong></div>
//             </div>
//         </div>
//     )
// }
//
function User(props) {
    return (
        <div>
            <Typography variant="h5" component="h2">
                {props.info.name}
            </Typography>
            {props.edit === "empty" ?
                (
                    <div>
                        <Input
                            placeholder={"Enter your status"}
                            // className={classes.input}
                            // inputProps={{
                            //     'aria-label': 'description',
                            // }}
                        />
                        <Button>Edit</Button>
                    </div>
                )
                : props.edit === "edit" ?
                    (
                        <div>
                            <Typography className={props.classes.title} color="textSecondary" gutterBottom>
                                {props.info.status}
                                <Button>Edit</Button>
                            </Typography>

                        </div>
                    )
                    :
                    (
                        <div>
                            <Typography className={props.classes.title} color="textSecondary" gutterBottom>
                                {props.info.status}
                            </Typography>
                        </div>
                    )
            }
            {props.info.block1 ?
                (<div>
                    <Divider/>
                    {props.info.dob !== "" ?
                        (
                            <Typography className={props.classes.subTitle} gutterBottom>
                                {"Date of birth: "}
                                <span className={props.classes.info}>{props.info.dob}</span>
                            </Typography>
                        )
                        :
                        (
                            <div/>
                        )}
                    {props.info.htown !== "" ?
                        (
                            <Typography className={props.classes.subTitle} gutterBottom>
                                {"Home town: "}
                                <span className={props.classes.info}> {props.info.htown}</span>
                            </Typography>
                        )
                        :
                        (
                            <div/>
                        )}
                </div>)
                :
                (
                    <div/>
                )
            }
            {props.info.block2 ?
                (<div>
                    <Typography className={props.classes.title}>
                        Contact info
                    </Typography>
                    <Divider/>
                    {props.info.instagram !== "" ?
                        (
                            <Typography className={props.classes.subTitle} gutterBottom>
                                {"Instagram: "}
                                <a href={"http://instagram.com/" + props.info.instagram} target="_blank"
                                   rel="noopener noreferrer">
                                    {props.info.instagram}
                                </a>
                            </Typography>)
                        :
                        (
                            <div/>
                        )}
                    {props.info.vk !== "" ?
                        (
                            <Typography className={props.classes.subTitle} gutterBottom>
                                {"Vkontakte: "}
                                <a href={"https://vk.com/" + props.info.vk} target="_blank" rel="noopener noreferrer">
                                    {props.info.vk}
                                </a>
                            </Typography>
                        ) :
                        (
                            <div/>
                        )}
                    {props.info.urlname1 !== "" ?
                        (
                            <Typography className={props.classes.subTitle} gutterBottom>
                                {props.info.urlname1 + ": "}
                                <a href={props.info.url1} target="_blank" rel="noopener noreferrer">
                                    {props.info.urlname1}
                                </a>
                            </Typography>)
                        : (
                            <div/>
                        )}
                    {props.info.urlname2 !== "" ?
                        (
                            <Typography className={props.classes.subTitle} gutterBottom>
                                {props.info.urlname2 + ": "}
                                <a href={props.info.url2} target="_blank" rel="noopener noreferrer">
                                    {props.info.urlname2}
                                </a>
                            </Typography>)
                        : (
                            <div/>
                        )}
                </div>)
                : (
                    <div/>
                )}
            {props.info.block3 ?
                (<div>
                    <Typography className={props.classes.title}>
                        Personal info
                    </Typography>
                    <Divider/>
                    {props.info.music !== "" ?
                        (
                            <Typography className={props.classes.subTitle} gutterBottom>
                                {"Music: "}
                                <span className={props.classes.info}>
                                            {props.info.music}</span>
                            </Typography>
                        )
                        :
                        (
                            <div/>
                        )}
                    {props.info.about !== "" ?
                        (
                            <Typography className={props.classes.subTitle} gutterBottom>
                                {"About yourself: "}
                                <span className={props.classes.info}
                                      color="textSecondary"> {props.info.about}
                                    {/*<Typography*/}
                                    {/*    className={this.state.classes.quoteAuthor}  gutterBottom> {" – Genesis P-Orridge"}</Typography>*/}
                                        </span>
                            </Typography>
                        )
                        :
                        (
                            <div/>
                        )}
                </div>)
                :
                (
                    <div/>
                )}
        </div>
    )
}