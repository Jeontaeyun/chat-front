import React, { Component, Fragment } from 'react';
import ChattingInput from '../../components/UI_Components/ChattingInput';
import RoomPage from '../../components/Page_Components/RoomPage';
import io from 'socket.io-client';
import RouterLayout from '../../components/Page_Components/RouterLayout';
import axios from 'axios';

class Room extends Component {
	state = {
		chats: []
	};
	componentWillMount() {
		const { room_id } = this.props.match.params;
		// 소켓 통신 이저너에 먼저 데이터 베이스에 저장된 chats를 호출한다.
		const fetchCaht = async () => {
			const { data } = await axios.get(`/api/room/${room_id}/chat`, { withCredentials: true });
			this.setState({ chats: this.state.chats.concat(data) });
		};
		fetchCaht();
	}
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
	handleSend = async (text) => {
		const { room_id } = this.props.match.params;
		const user = JSON.parse(window.sessionStorage.getItem('localUser'));
		await axios.post(`api/room/${room_id}/chat`, { user, chat: text }, { withCredentials: true });
		const socket = io.connect('http://localhost:8000/chat', { path: '/socket.io' });
		socket.emit('send', { chat: text, _id: user._id, nickname: user.nickname });
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
