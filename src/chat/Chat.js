import React, {Component} from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import Loading from './Loading'
import NewTopbar from "../views/NewTopbar";
import axios from "axios";

// const URL = 'http://localhost:8080/socback/ws'

var stompClient = null;
var SECURED_CHAT = '/secured/chat';
var SECURED_CHAT_HISTORY = '/secured/history';
var SECURED_CHAT_ROOM = '/secured/room';
var SECURED_CHAT_SPECIFIC_USER = '/secured/user/queue/specific-user';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            username: '',
            channelId: '',
            sender: '',
            recipient: '',
            channelConnected: false,
            broadcastMessage: [],
            messages: [],
            curTime: '',
            stompClient: null
        }
    }

    // ws = new WebSocket(URL)

    connect = (userName) => {

        if (userName) {

            const Stomp = require('stompjs');

            var SockJS = require('sockjs-client');


            var socket = new SockJS('http://localhost:8080/socback/ws');
            var stompClient = Stomp.over(socket);
            this.setState({stompClient: stompClient});
            console.log('send request');
            this.getChannel().then(this.Success.bind(this), this.Failure.bind(this));
            console.log('remaining code');

            // stompClient.connect({}, this.onConnected(stompClient), this.onError);

        }
    }

    onConnected = (sessionId) => {

        this.setState({
            channelConnected: true,
            sessionId: sessionId
        })

        // var sessionId = "";
        // var url = stompClient.ws._transport.url;
        // url = url.replace(
        //     "ws://localhost:8080/socback/app/secured/room/",  "");
        // url = url.replace("/websocket", "");
        // url = url.replace(/^[0-9]+\//, "");
        // console.log("Your current session is: " + url);
        // sessionId = url;

        // Subscribing to the public topic
        stompClient.subscribe('secured/user/queue/specific-user'
            + '-user' + sessionId, this.onMessageReceived);

        // Registering user to server
        // stompClient.send("/app/addUser",
        //     {},
        //     JSON.stringify({sender: this.state.username, type: 'JOIN'})
        // )
    }

    sendMessage = (type, value) => {

        console.log('huh?');
        var stompClient = this.state.stompClient;
        var channelId = this.state.channelId;
        if (stompClient) {
            var chatMessage = {
                sender: this.state.sender,
                recipient: this.state.recipient,
                contents: value
            };

            console.log(JSON.stringify(chatMessage));
            stompClient.send('/app/private.chat.' + channelId, {}, JSON.stringify(chatMessage));

            // clear message text box after sending the message

        }
    }

    onMessageReceived = (payload) => {
        console.log(payload);
        var message = JSON.parse(payload.body);

        if (message.type === 'JOIN') {
            this.state.broadcastMessage.push({
                message: "joined chat room",
                sender: message.sender,
                dateTime: message.dateTime
            })
            this.setState({
                broadcastMessage: this.state.broadcastMessage,

            })

            // this.state.roomNotification.push({ 'sender': message.sender + " ~ joined", 'status': 'online', 'dateTime': message.dateTime })

            // this.setState({
            //     roomNotification: this.state.roomNotification,
            //     bellRing: true
            // })

        }
        // else if (message.type === 'LEAVE') {
        //     this.state.roomNotification.map((notification, i) => {
        //         if (notification.sender === message.sender + " ~ joined") {
        //             notification.status = "offline";
        //             notification.sender = message.sender + " ~ left";
        //             notification.dateTime = message.dateTime;
        //         }
        //     })
        //     this.setState({
        //         roomNotification: this.state.roomNotification,
        //         bellRing: true
        //     })
        // }
        // else if (message.type === 'TYPING') {
        //
        //     this.state.roomNotification.map((notification, i) => {
        //         if (notification.sender === message.sender + " ~ joined") {
        //             if (message.content)
        //                 notification.status = "typing...";
        //             else
        //                 notification.status = "online";
        //         }
        //
        //     })
        //     this.setState({
        //         roomNotification: this.state.roomNotification
        //     })
        // }
        else if (message.type === 'CHAT') {

            // this.state.roomNotification.map((notification, i) => {
            //     if (notification.sender === message.sender + " ~ joined") {
            //         notification.status = "online";
            //     }
            // })
            this.state.broadcastMessage.push({
                message: message.content,
                sender: message.sender,
                dateTime: message.dateTime
            })
            this.setState({
                broadcastMessage: this.state.broadcastMessage,

            })
        } else {
            console.log('OwO?');
            this.state.broadcastMessage.push({
                contents: message.contents,
                sender: message.sender,
                time: message.time
            });
            console.log(this.state.broadcastMessage);
            this.setState({
                broadcastMessage: this.state.broadcastMessage,
            })
        }
    }

    async getChannel() {
        // const str = btoa(this.state.user.login + ':' + this.state.user.password);
        console.log('request start');
        console.log(this.state);
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://127.0.0.1:8080/socback/app/private-chat/channel',
                withCredentials: true,  //IMPORTANT!!!
                data: {
                    userOneFullName: this.state.sender,
                    userTwoFullName: this.state.recipient
                },
                headers: {
                    'Content-Type': 'application/json'
                }
                // headers: {
                //     'Authorization': 'Basic ' + str
                // },
            });
            if (response.status === 401) {
                // this.setState({errors: err});
                //nothing
            } else if (response.status === 200) {
                console.log(response);
                this.setState({channelId: response.data});
                console.log(this.state);
                return Promise.resolve();
            }

            console.log(this.state);
            return Promise.reject();
        } catch (error) {
            console.log('error??');
            return Promise.reject();
            // if(error.response.status===401)
            //     this.setState({errors: err});
            // console.error(error);
            //do nothing
        }
    }

    Success() {
        console.log('succ')
        var sessionId = this.state.channelId;
        var chat = this;
        var stompClient = this.state.stompClient;

        stompClient.connect({}, function (frame) {
            chat.setState({
                channelConnected: true
            });
            stompClient.subscribe('/topic/private.chat.' + sessionId, chat.onMessageReceived);
        }, this.onError)
        this.getMessages();
        // console.log(this.state);
        // console.log('hui');
        // this.renderInfo();
    }

    Failure() {
        // this.setState({uurl: '/userinfo/undefined'})
        console.log('failure')
    }

    async getMessages() {
        var channelId = this.state.channelId;
        var chat = this;
        try {
            const response = await axios({
                method: 'GET',
                url: 'http://127.0.0.1:8080/socback/app/private-chat/channel/'+channelId,
                withCredentials: true
            });
            if (response.status === 200) {
                console.log(response.data);
                response.data.forEach( function (message) {
                    chat.state.broadcastMessage.push({
                        contents: message.contents,
                        sender: message.sender,
                        time: message.time
                    });
                chat.setState({
                    broadcastMessage: chat.state.broadcastMessage,
                })
                });
                console.log(this.state.broadcastMessage);
                return Promise.resolve();
            }
            // console.log(this.state);
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    }

    fakeConnect() {
        var user = this.state.sender;
        this.connect(user);
        this.setState({
            curTime: new Date().toLocaleString()
        })
        // this.ws.onopen = () => {
        //     // on connecting, do nothing but log it to the console
        //     console.log('connected')
        // }
        //
        // this.ws.onmessage = evt => {
        //     // on receiving a message, add it to the list of messages
        //     const message = JSON.parse(evt.data)
        //     this.addMessage(message)
        // }
        //
        // this.ws.onclose = () => {
        //     console.log('disconnected')
        //     // automatically try to reconnect on connection loss
        //     this.setState({
        //         ws: new WebSocket(URL),
        //     })
        // }
    }

    componentWillMount() {
        const {cookies} = this.props;
        this.setState({sender: cookies.get('USERID')});
    }

    componentDidMount() {
    }

    addMessage = message =>
        this.setState(state => ({messages: [message, ...state.messages]}))

    submitMessage = messageString => {
        // on submitting the ChatInput form, send the message, add it to the list and reset the input
        const message = {name: this.state.name, message: messageString}
        this.ws.send(JSON.stringify(message))
        this.addMessage(message)
    }

    render() {
        return (
            <div className={this.state.classes.root}>
                <NewTopbar cookies={this.props.cookies}/>
                <main className={this.state.classes.content}>
                    <div className={this.state.classes.toolbar}/>
                    {/*{this.state.channelConnected ?*/}
                    {/*    (*/}
                            <div>
                                <form
                                    action="."
                                    onSubmit={e => {
                                        e.preventDefault();
                                        this.fakeConnect();
                                    }}
                                >
                                <label htmlFor="you">
                                    You:&nbsp;
                                    {this.state.sender}
                                </label>
                                <label htmlFor="they">
                                    &nbsp;They:&nbsp;
                                </label>
                                <input
                                    type="text"
                                    value={this.state.recipient}
                                    onChange={e => this.setState({recipient: e.target.value})}
                                />
                                <input type="submit" value={'Connect'}/>
                                </form>

                                {this.state.broadcastMessage.map((message, index) =>
                                    <ChatMessage
                                        key={index}
                                        message={message.contents}
                                        name={message.sender}
                                        time={message.time}
                                    />,
                                )}
                                <ChatInput
                                    sendMessage={this.sendMessage}
                                />
                            </div>
                    {/*    )*/}
                    {/*:*/}
                    {/*    (*/}
                    {/*        <Loading/>*/}
                    {/*    )*/}
                    {/*}*/}
                </main>
            </div>
        )
    }
}

export default Chat

//old
// {/*<div>*/}
// {/*    <label htmlFor="name">*/}
// {/*        Name:&nbsp;*/}
// {/*        <input*/}
// {/*            type="text"*/}
// {/*            id={'name'}*/}
// {/*            placeholder={'Enter your name...'}*/}
// {/*            value={this.state.name}*/}
// {/*            onChange={e => this.setState({ name: e.target.value })}*/}
// {/*        />*/}
// {/*    </label>*/}
// {/*    <ChatInput*/}
// {/*        ws={this.ws}*/}
// {/*        onSubmitMessage={messageString => this.submitMessage(messageString)}*/}
// {/*    />*/}
// {/*    {this.state.messages.map((message, index) =>*/}
// {/*        <ChatMessage*/}
// {/*            key={index}*/}
// {/*            message={message.message}*/}
// {/*            name={message.name}*/}
// {/*        />,*/}
// {/*    )}*/}
// {/*</div>*/}