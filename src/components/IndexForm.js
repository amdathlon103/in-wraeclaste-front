import React from 'react';
import '../bootstrap.css';
import {
    Redirect
} from 'react-router-dom';
import NewTopbar from "../views/NewTopbar";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

export default class IndexForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            uurl: "",
            anchorEl1: null,
            anchorEl2: null,
        }
    }

    componentDidMount() {
        if (this.props.cookies.get('USERID', {path: '/'}) !== undefined)
            this.setState({uurl: "/userinfo/" + this.props.cookies.get('USERID', {path: '/'})});
    }

    handlePopoverOpenSign(event) {
        this.setState({anchorEl2: event.currentTarget});
    }

    handlePopoverCloseSign() {
        this.setState({anchorEl2: null});
    }

    handlePopoverOpenLog(event) {
        this.setState({anchorEl1: event.currentTarget});
    }

    handlePopoverCloseLog() {
        this.setState({anchorEl1: null});
    }

    redirectLog(){
        this.setState({uurl: "/login"})
    }

    redirectSign(){
        this.setState({uurl: "/signup"})
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
                    <div className={this.state.classes.toolbar}/>
                    <Container align="center">
                        <Typography variant="h2">Welcome!</Typography>
                        <Typography variant="h4">Glad to see you here!</Typography>
                        {/*<div className="col-8">*/}
                        <Button variant="contained"
                                size="large"
                                color="primary"
                                className={this.state.classes.margin}
                                aria-owns={Boolean(this.state.anchorEl1) ? 'mouse-over-popover-log' : undefined}
                                aria-haspopup="true"
                                onMouseEnter={this.handlePopoverOpenLog.bind(this)}
                                onMouseLeave={this.handlePopoverCloseLog.bind(this)}
                                onClick={this.redirectLog.bind(this)}
                        >
                            Sign In
                        </Button>
                        <Popover
                            id="mouse-over-popover-log"
                            className={this.state.classes.popover}
                            classes={{
                                paper: this.state.classes.paper,
                            }}
                            open={Boolean(this.state.anchorEl1)}
                            anchorEl={this.state.anchorEl1}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            onClose={this.handlePopoverCloseLog.bind(this)}
                            disableRestoreFocus
                        >
                            <Typography>Use this if you have an account.</Typography>
                        </Popover>
                        <Button variant="contained"
                                size="large"
                                color="primary"
                                className={this.state.classes.margin}
                                aria-owns={Boolean(this.state.anchorEl2) ? 'mouse-over-popover-sign' : undefined}
                                aria-haspopup="true"
                                onMouseEnter={this.handlePopoverOpenSign.bind(this)}
                                onMouseLeave={this.handlePopoverCloseSign.bind(this)}
                                onClick={this.redirectSign.bind(this)}
                        >
                            Sign Up
                        </Button>
                        <Popover
                            id="mouse-over-popover-sign"
                            className={this.state.classes.popover}
                            classes={{
                                paper: this.state.classes.paper,
                            }}
                            open={Boolean(this.state.anchorEl2)}
                            anchorEl={this.state.anchorEl2}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            onClose={this.handlePopoverCloseSign.bind(this)}
                            disableRestoreFocus
                        >
                            <Typography>Use this if you don't have an account.</Typography>
                        </Popover>
                    </Container>
                    {/*</div>*/}
                </main>
            </div>
        )
    }
}