import React from 'react'
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardActionArea from "@material-ui/core/CardActionArea";
import NewTopbar from "../views/NewTopbar";
import { Redirect} from "react-router-dom";
import {GridList} from "@material-ui/core";

export default class FriendListForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            classes: props.classes,
            uurl: "/friendlist",
        }
    }

    async getReq() {
        try {
            const response = await axios({
                method: 'GET',
                url: 'http://127.0.0.1:8080/socback/app/getFriendList',
                withCredentials: true
            });
            if (response.status === 200) {
                if(response.data.status ===1) {
                    // console.log(response.data);
                    this.setState({friends: response.data.body});
                    // this.setState({friends: response.data});
                    // console.log(this.state);
                }
            }

        } catch (e) {
            if (e.response.status === 401 || e.response.status === 403)
                return Promise.reject(e);
            console.error(e);
        }
    }

    redirectFriend(login){
        // console.log(login)
        this.setState({uurl: "/profile/" + login})
    }

    redirect(url) {
        return (
            <Redirect to={url}/>
        )
    }

    renderFriends() {
        return this.state.friends.map(friend => {
            return (
                <Friend friend={friend} key={friend.id} redirectFriend={this.redirectFriend.bind(this)} classes={this.state.classes}/>
            )
        })
    }

    nice() {

    }

    fail() {
        // this.setState({uurl: '/noacc'})
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        this.getReq().then(this.nice.bind(this), this.fail.bind(this));
    }

    render() {
        return (
            <div className={this.state.classes.root}>
                <NewTopbar cookies={this.props.cookies} pageName="Friend list"/>
                {/*<Toolbar />*/}
                <main className={this.state.classes.content}>
                    <div className={this.state.classes.toolbar}/>
                        {this.redirect(this.state.uurl)}
                        <GridList className={this.state.classes.gridList}>
                            {this.renderFriends()}
                        </GridList>
                        {/*<div className="row justify-content-md-center">*/}
                        {/*    <button className="btn btn-primary mr-3" onClick={this.refresh.bind(this)}>Refresh</button>*/}
                        {/*    <Link to="" className="btn btn-primary mr-3">Get back</Link>*/}
                        {/*</div>*/}
                </main>
            </div>
        )
    }

}

function Friend(props) {
    return (
        <Card className={props.classes.card} onClick={()=>props.redirectFriend(props.friend.login)}>
            <CardActionArea>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {props.friend.login}
                    </Typography>
                    <Typography className={props.classes.title} color="textSecondary" gutterBottom>
                        some info...
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small">Add friend</Button>
            </CardActions>
        </Card>
    )
}