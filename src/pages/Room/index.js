import React, { createRef, Component, Fragment } from 'react';
import ChattingInput from '../../components/UI_Components/ChattingInput';
import LayOut from '../../components/UI_Components/LayOut';
import RoomPage from '../../components/Page_Components/RoomPage';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:8000/chat', { path: '/socket.io' });

class Room extends Component {
	state = {
		chats: []
	};
	handleSend = (text) => {
		socket.emit('send', text);
	};
	shouldComponentUpdate(nextProps, nextState) {
		console.log(nextState, this.state);
		return nextState !== this.state;
	}
	onScroll = () => {
		console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
	};
	componentDidMount() {
		const { onScroll } = this;
		socket.on('chat', (data) => {
			this.setState({
				chats: [ ...this.state.chats, data ]
			});
		});
		this.ref.addEventListener('scroll', onScroll);
		return () => {
			this.ref.removeEventListener('scroll', onScroll);
		};
	}
	render() {
		const ref = createRef();
		const { handleSend } = this;
		const { chats } = this.state;
		console.log(1);
		return (
			<Fragment>
				<LayOut
					ref={ref}
					title={'채팅방 이름'}
					content={<RoomPage chats={chats} />}
					info={<ChattingInput onSend={handleSend} />}
				/>
			</Fragment>
		);
	}
}

export default Room;
