import React from 'react';
import clsx from 'clsx';
import '../bootstrap.css';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Group from '@material-ui/icons/Group';
import Person from '@material-ui/icons/Person';
import Button from "@material-ui/core/Button";
import useScrollTrigger from "@material-ui/core/useScrollTrigger/useScrollTrigger";
import {Slide} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";

export default class TopLineForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            uurl: "",
            classes: props.classes,
            theme: props.theme,
            logged: false,
            pageName: props.pageName,
            anchorEl: null,
            redirect: false,
            open: false
        }
    }

    // async getReq() {
    //     try {
    //         const response = await axios({
    //             method: 'GET',
    //             url: 'http://127.0.0.1:8080/socback/login/username',
    //             withCredentials: true,
    //         });
    //         this.setState({username: response.data})
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    async logoutReq() {
        try {
            await axios({
                method: 'GET',
                url: 'http://127.0.0.1:8080/socback/logout',
                crossDomain: true,
                withCredentials: true,
            });
        } catch (e) {
            console.log(e);
        }
    }


    componentDidMount() {
        // this.getReq();
        this.setState({username: this.props.cookies.get('USERID', {path: '/'})});
        // console.log(this.state.username);
        if (this.state.username !== "")
            this.setState({uurl: "/userinfo/" + this.props.cookies.get('USERID', {path: '/'})});
        // console.log(this.state.uurl);
        if (this.props.cookies.get('USERID', {path: '/'}) !== undefined) {
            this.setState({logged: true});
        }
    }

    handleLogout(event) {
        event.preventDefault();
        this.handleCloseAcc();
        const {cookies} = this.props;
        cookies.remove('USERID', {path: '/'});
        this.logoutReq();
        this.setState({username: ""});
        this.setState({logged: false});
        this.redirectHome();
    }

    handleMenuAcc(event) {
        this.setState({anchorEl: event.currentTarget});
    }

    handleCloseAcc() {
        this.setState({anchorEl: null});
    }


    redirectInfo() {
        this.setState({uurl: "/userinfo/" + this.props.cookies.get('USERID', {path: '/'})});
        this.setState({redirect: true})
    }

    redirect(url) {
        return (
            <Redirect to={url}/>
        )
    }

    handleDrawerOpen() {
        this.setState({open: true})
    }

    handleDrawerClose() {
        this.setState({open: false})
    }

    redirectLogin() {
        this.setState({uurl: "/login"});
        this.setState({redirect: true})
    }

    redirectHome() {
        this.setState({uurl: "/"});
        this.setState({redirect: true})
    }

    redirectList() {
        this.setState({uurl: "/list"});
        this.setState({redirect: true})
    }

    redirectChat() {
        this.setState({uurl: "/messages"});
        this.setState({redirect: true})
    }

    render() {

        // let open = Boolean(this.state.anchorEl);
        return (
            <div className={this.state.classes.root}>
                {this.state.redirect ?
                    this.redirect(this.state.uurl)
                    :
                    (<div/>)
                }
                <AppBar position="fixed"
                        className={clsx(this.state.classes.appBar, {
                            [this.state.classes.appBarShift]: this.state.open,
                        })}>
                    {this.state.logged ? (
                            <Toolbar>
                                <IconButton edge="start"
                                            className={this.state.classes.menuButton}
                                            color="inherit"
                                            aria-label="menu"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            className={clsx(this.state.classes.menuButton, {
                                                [this.state.classes.hide]: this.state.open,
                                            })}
                                            onClick={this.handleDrawerOpen.bind(this)}

                                >
                                    <MenuIcon/>
                                </IconButton>
                                {/*<Menu*/}
                                {/*    id="menu-appbar"*/}
                                {/*    anchorEl={this.state.anchorEll}*/}
                                {/*    anchorOrigin={{*/}
                                {/*        vertical: 'top',*/}
                                {/*        horizontal: 'left',*/}
                                {/*    }}*/}
                                {/*    keepMounted*/}
                                {/*    transformOrigin={{*/}
                                {/*        vertical: 'top',*/}
                                {/*        horizontal: 'left',*/}
                                {/*    }}*/}
                                {/*    open={Boolean(this.state.anchorEll)}*/}
                                {/*    onClose={this.handleCloseMenu.bind(this)}*/}
                                {/*>*/}
                                {/*    <MenuItem onClick={this.redirectHome.bind(this)}>Home</MenuItem>*/}
                                {/*    <MenuItem onClick={this.redirectInfo.bind(this)}>Profile</MenuItem>*/}
                                {/*    <MenuItem onClick={this.redirectList.bind(this)}>Users</MenuItem>*/}
                                {/*    <MenuItem onClick={this.redirectChat.bind(this)}>Messages</MenuItem>*/}

                                {/*</Menu>*/}
                                <Typography variant="h6" className={this.state.classes.title}>
                                    {this.state.pageName}
                                </Typography>
                                <Typography variant="subtitle1">
                                    {this.state.username}
                                </Typography>
                                <div>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="acc-appbar"
                                        aria-haspopup="true"
                                        onClick={this.handleMenuAcc.bind(this)}
                                        color="inherit"
                                    >
                                        <AccountCircle/>
                                    </IconButton>
                                    <Menu
                                        id="acc-appbar"
                                        anchorEl={this.state.anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(this.state.anchorEl)}
                                        onClose={this.handleCloseAcc.bind(this)}
                                    >
                                        <MenuItem onClick={this.redirectInfo.bind(this)}>Profile</MenuItem>
                                        <Divider/>
                                        {/*<MenuItem onClick={this.handleClose.bind(this)}>My account</MenuItem>*/}
                                        <MenuItem onClick={this.handleLogout.bind(this)}>Logout</MenuItem>
                                    </Menu>
                                </div>
                            </Toolbar>
                        )
                        :
                        (
                            <Toolbar>
                                <Typography variant="h6" className={this.state.classes.title}>
                                    {this.state.pageName}
                                </Typography>
                                <div>
                                    {/*<Button color="inherit" onClick={this.redirectLogin.bind(this)}>Login</Button>*/}
                                    {/*<Menu*/}
                                    {/*    id="menu-appbar"*/}
                                    {/*    anchorEl={this.state.anchorEl}*/}
                                    {/*    anchorOrigin={{*/}
                                    {/*        vertical: 'top',*/}
                                    {/*        horizontal: 'right',*/}
                                    {/*    }}*/}
                                    {/*    keepMounted*/}
                                    {/*    transformOrigin={{*/}
                                    {/*        vertical: 'top',*/}
                                    {/*        horizontal: 'right',*/}
                                    {/*    }}*/}
                                    {/*    open={Boolean(this.state.anchorEl)}*/}
                                    {/*    onClose={this.handleCloseAcc.bind(this)}*/}
                                    {/*>*/}
                                    {/*    /!*<MenuItem onClick={this.handleClose.bind(this)}>Profile</MenuItem>*!/*/}
                                    {/*    <MenuItem onClick={this.handleCloseAcc.bind(this)}>My account</MenuItem>*/}
                                    {/*</Menu>*/}
                                </div>
                            </Toolbar>
                        )}

                </AppBar>
                {this.state.logged ?
                    (<Drawer
                        variant="permanent"
                        className={clsx(this.state.classes.drawer, {
                            [this.state.classes.drawerOpen]: this.state.open,
                            [this.state.classes.drawerClose]: !this.state.open,
                        })}
                        classes={{
                            paper: clsx({
                                [this.state.classes.drawerOpen]: this.state.open,
                                [this.state.classes.drawerClose]: !this.state.open,
                            }),
                        }}
                        open={this.state.open}
                    >
                        <div className={this.state.classes.toolbar}>
                            <IconButton onClick={this.handleDrawerClose.bind(this)}>
                                {this.state.theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                            </IconButton>
                        </div>
                        <Divider/>
                        <List>
                            <ListItem button onClick={this.redirectInfo.bind(this)}>
                                <ListItemIcon><Person/></ListItemIcon>
                                <ListItemText primary="My account"/>
                            </ListItem>
                            <ListItem button onClick={this.redirectList.bind(this)}>
                                <ListItemIcon><Group/></ListItemIcon>
                                <ListItemText primary="Users"/>
                            </ListItem>
                            <ListItem button onClick={this.redirectChat.bind(this)}>
                                <ListItemIcon><MailIcon/></ListItemIcon>
                                <ListItemText primary="Messages"/>
                            </ListItem>
                            {/*{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (*/}
                            {/*    <ListItem button key={text}>*/}
                            {/*        <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>*/}
                            {/*        <ListItemText primary={text}/>*/}
                            {/*    </ListItem>*/}
                            {/*))}*/}
                        </List>
                        <Divider/>
                        <List>
                            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                                    <ListItemText primary={text}/>
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>)
                    :
                    (
                        <div/>
                    )
                }
                {/*<Toolbar/>*/}

            </div>

        )
    }

}

