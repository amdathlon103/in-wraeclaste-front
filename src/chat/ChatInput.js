import React, {Component} from 'react'

class ChatInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chatMessage: '',
        };
    }

    handleSendMessage(){

        this.props.sendMessage('CHAT',this.state.chatMessage);

        this.setState({
            chatMessage:'',
        });
    }

    render() {
        return (
            <form
                action="."
                onSubmit={e => {
                    e.preventDefault();
                    this.handleSendMessage();
                }}
            >
                <input
                    type="text"
                    placeholder={'Enter message...'}
                    value={this.state.chatMessage}
                    onChange={e => this.setState({chatMessage: e.target.value})}
                />
                <input type="submit" value={'Send'}/>
            </form>
        )
    }
}

export default ChatInput