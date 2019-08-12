import React, { Component, Fragment } from 'react';
import ChattingInput from '../../components/UI_Components/ChattingInput';
import RoomPage from '../../components/Page_Components/RoomPage';
import io from 'socket.io-client';
import RouterLayout from '../../components/Page_Components/RouterLayout';

const socket = io.connect('http://localhost:8000/chat', { path: '/socket.io' });

class Room extends Component {
	state = {
		chats: []
	};
	handleSend = (text) => {
		socket.emit('send', text);
	};
	shouldComponentUpdate(nextProps, nextState) {
		return nextState !== this.state;
	}
	componentDidMount() {
		socket.on('chat', (data) => {
			this.setState({
				chats: [ ...this.state.chats, data ]
			});
		});
	}
	render() {
		const { handleSend } = this;
		const { chats } = this.state;
		return (
			<Fragment>
				<RouterLayout
					title={'채팅방 이름'}
					content={<RoomPage chats={chats} />}
					info={<ChattingInput onSend={handleSend} />}
				/>
			</Fragment>
		);
	}
}

export default Room;
