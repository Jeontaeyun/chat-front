import React, { Component, Fragment } from 'react';
import ChattingInput from '../../components/UI_Components/ChattingInput';
import RoomPage from '../../components/Page_Components/RoomPage';
import io from 'socket.io-client';
import RouterLayout from '../../components/Page_Components/RouterLayout';

class Room extends Component {
	state = {
		chats: []
	};

	shouldComponentUpdate(nextProps, nextState) {
		return nextState !== this.state;
	}
	// 이렇게 구현을 해주어 해당 컴포넌트가 있을 때만 해당 소켓으로 통신할 수 있게 해준다.
	componentDidMount() {
		const socket = io.connect('http://localhost:8000/chat', { path: '/socket.io' });
		socket.on('chat', (data) => {
			this.setState({
				chats: [ ...this.state.chats, data ]
			});
		});
		// URL 형식을 바꾸는 방법은 어떤 것일 까?
	}
	handleSend = (text) => {
		const socket = io.connect('http://localhost:8000/chat', { path: '/socket.io' });
		socket.emit('send', text);
	};

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
