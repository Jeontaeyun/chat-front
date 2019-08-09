import React, { useEffect, useState, Fragment } from 'react';
import ChattingInput from '../../components/UI_Components/ChattingInput';
import LayOut from '../../components/UI_Components/LayOut';
import RoomPage from '../../components/Page_Components/RoomPage';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:8000/chat', { path: '/socket.io' });
const Room = (props) => {
	const [ chats, setChats ] = useState([]);
	useEffect(
		() => {
			socket.on('chat', (data) => {
				// 이 부분 성능 최적화를 해야할 것 같다.
				setChats([ ...chats, data ]);
			});
			return;
		},
		[ chats ]
	);
	const handleSend = (text) => {
		socket.emit('send', text);
	};
	return (
		<Fragment>
			<LayOut
				title={'채팅방 이름'}
				content={<RoomPage chats={chats} />}
				info={<ChattingInput onSend={handleSend} />}
			/>
		</Fragment>
	);
};

export default Room;
