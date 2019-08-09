import React, { Fragment } from 'react';
import ChatBox from '../../UI_Components/ChatBox';

const RoomPage = (props) => {
	const { chats } = props;
	const chatList = chats.map((chat, idx) => {
		return <ChatBox key={idx} description={chat} />;
	});
	return <Fragment>{chats && chatList}</Fragment>;
};

export default RoomPage;
