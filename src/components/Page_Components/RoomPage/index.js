import React, { Fragment, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import ChatBox from '../../UI_Components/ChatBox';

const Container = styled.div`
	height: 100%;
	overflow: scroll;
`;
// Hooks 문법을 사용하여 코드가 더 간결하게 되ㅗ었다.
const RoomPage = (props) => {
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
			return chats.map((chat, idx) => <ChatBoxRender key={idx} description={chat} />);
		},
		[ chats ]
	);
	return (
		<Fragment>
			<Container ref={autoScroll}>{chats && chatList}</Container>
		</Fragment>
	);
};
export default RoomPage;
