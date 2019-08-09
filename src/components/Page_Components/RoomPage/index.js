import React, { Fragment, Component, createRef } from 'react';
import ChatBoxRender from '../ChatBoxRender';
import styled from 'styled-components';

const Container = styled.div`
	height: 100%;
	overflow: scroll;
`;
class RoomPage extends Component {
	autoScroll = createRef();
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.chats !== this.props.chats;
	}
	// 자동으로 채팅시 아래로 스크롤 없애주는 코드 컨테이너 div에 ref를 설정한 후
	// ref.current의 scrollHeight, clientHeight, scrollTop을 이용해서 구현한다.
	componentDidUpdate() {
		const { autoScroll } = this;
		const { scrollHeight, clientHeight } = autoScroll.current;
		if (clientHeight < scrollHeight) {
			this.autoScroll.current.scrollTop = scrollHeight - clientHeight;
		}
	}
	render() {
		const { chats } = this.props;
		const { autoScroll } = this;
		const chatList = chats.map((chat, idx) => <ChatBoxRender key={idx} description={chat} />);
		return (
			<Fragment>
				<Container ref={autoScroll}>{chats && chatList}</Container>
			</Fragment>
		);
	}
}

export default RoomPage;
