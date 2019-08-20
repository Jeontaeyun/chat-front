import React, { Fragment, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import ChatBox from '../../UI_Components/ChatBox';
import { withRouter } from 'react-router-dom';

const Container = styled.div`
	height: 100%;
	overflow: scroll;
`;
// Hooks 문법을 사용하여 코드가 더 간결하게 되ㅗ었다.
const RoomPage = (props) => {
	const user = JSON.parse(window.sessionStorage.getItem('localUser'));
	const autoScroll = useRef(null);
	const { chats } = props;
	useEffect(
		() => {
			const { scrollHeight, clientHeight } = autoScroll.current;
			if (clientHeight < scrollHeight) {
				autoScroll.current.scrollTop = scrollHeight - clientHeight;
			}
		},
		[ chats ]
	);
	const ChatBoxRender = React.memo((props) => <ChatBox {...props} />);
	const chatList = useMemo(
		() => {
			if (user) {
				return chats.map((chat, idx) => (
					<ChatBoxRender
						key={idx}
						me={user._id === chat.user._id}
						description={chat.chat}
						name={chat.user.nickname}
					/>
				));
			}
		},
		[ user, chats ]
	);
	return (
		<Fragment>
			<Container ref={autoScroll}>{chats && chatList}</Container>
		</Fragment>
	);
};
export default withRouter(RoomPage);
