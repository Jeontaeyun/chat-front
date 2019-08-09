import React, { Fragment, Component } from 'react';
import ChatBoxRender from '../ChatBoxRender';

class RoomPage extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.chats !== this.props.chats;
	}
	render() {
		const { chats } = this.props;
		const chatList = chats.map((chat, idx) => <ChatBoxRender key={idx} description={chat} />);
		return <Fragment>{chats && chatList}</Fragment>;
	}
}

export default RoomPage;
