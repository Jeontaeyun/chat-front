import React, { Fragment, Component } from 'react';
import ChatBox from '../../UI_Components/ChatBox';

class ChatBoxRender extends Component {
	// 리스트 형 컴포넌트일 때 이처럼 shouldCOmponent를 통해서 리액트 렌더링 최적화를 할 수 있다.
	// 리스트 형 컴포넌트를 렌더링 해주는 설계를 할 때 리렌더링 최적화가 반드시 필요하다.
	// 리스트가 적다면 모르지만 수백, 수천개 일 때 렌더링 이슈가 생긴다.
	// 리액트 훅스가 있어도 클래스형을 써야하는 이유이다.
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.description !== this.props.description;
	}
	render() {
		return (
			<Fragment>
				<ChatBox {...this.props} />
			</Fragment>
		);
	}
}

export default ChatBoxRender;
