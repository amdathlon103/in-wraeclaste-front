import React, {Component} from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import Loading from './Loading'
import TopLine from "../views/TopLine";

// const URL = 'http://localhost:8080/socback/ws'

var stompClient = null;

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            channelConnected: false,
            broadcastMessage: [],
            messages: [],
            curTime: '',
        }
    }

    // ws = new WebSocket(URL)

    connect = (userName) => {

        if (userName) {

            this.setState({
                username: userName
            });

            const Stomp = require('stompjs')

            var SockJS = require('sockjs-client')

            SockJS = new SockJS('http://localhost:8080/socback/ws')

            stompClient = Stomp.over(SockJS);

            stompClient.connect({}, this.onConnected, this.onError);

        }
    }

    onConnected = () => {

        this.setState({
            channelConnected: true
        })

        // Subscribing to the public topic
        stompClient.subscribe('/topic/public', this.onMessageReceived);

        // Registering user to server
        stompClient.send("/app/addUser",
            {},
            JSON.stringify({sender: this.state.username, type: 'JOIN'})
        )
    }

    sendMessage = (type, value) => {

        if (stompClient) {
            var chatMessage = {
                sender: this.state.username,
                content: type === 'TYPING' ? value : value,
                type: type

            };

            stompClient.send("/app/sendMessage", {}, JSON.stringify(chatMessage));

            // clear message text box after sending the message

        }
    }

    onMessageReceived = (payload) => {

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
            // do nothing...
        }
    }

    componentDidMount() {
        const {cookies} = this.props;
        this.connect(cookies.get('USERID'));
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
            <div>
                <TopLine cookies={this.props.cookies}/>
                {this.state.channelConnected ?
                    (
                        <div>
                            <label htmlFor="name">
                                Name:&nbsp;
                                {this.state.username}
                            </label>
                            <ChatInput
                                sendMessage={this.sendMessage}
                            />
                            {this.state.broadcastMessage.map((message, index) =>
                                <ChatMessage
                                    key={index}
                                    message={message.message}
                                    name={message.sender}
                                    time={message.dateTime}
                                />,
                            )}
                        </div>
                    ):
                    (
                        <Loading/>
                    )
                }
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