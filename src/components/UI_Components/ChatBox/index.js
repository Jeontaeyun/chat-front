import React, { Fragment } from 'react';
import styled from 'styled-components';

const basicProfile = '/basicProfile.jpg';

const TotalContainer = styled.div`
	display: flex;
	flex-direction: ${(props) => (props.me ? 'row-reverse; justify-content: flex-start' : 'row')};
	width: 100%;
	& + & {
		margin-top: 0.8rem;
	}

	&:first-of-type {
		margin-top: 0.6rem;
	}

	&:last-of-type {
		margin-bottom: 0.6rem;
	}
`;

const ChatContainer = styled.div`
	flex: 0.5;
	${(props) => (props.me ? 'text-align: right' : null)};
`;

const Title = styled.div`
	${(props) => (props.me ? 'padding-right: 0.3rem' : 'padding-left: 0.3rem')};
	font-size: 0.8rem;
`;

const Description = styled.div`
	display: inline-block;
	width: auto;
	padding: 0.8rem;
	border: 1px solid #2d3646;
	border-radius: 0.3rem;
	font-size: 0.8rem;
	/*CSS 자체에서 줄 바꿈을 처리해주는 속성. word-berak를 기억해두자.*/
	word-break: break-all;
`;

const Profile = styled.div`
	margin: 1%;
	width: 35px;
	height: 35px;
	${(props) =>
		props.src
			? `
    background: white;
    `
			: `
    background-image: url('${basicProfile}');
    background-size : cover;
    background-repeat: no-repeat;
    background-position: center;
    bacground: white;
    background-position-y: -4px;
    `} border-radius: 100%;
`;

const ChatBox = (props) => {
	const { name, description } = props;
	return (
		<Fragment>
			<TotalContainer {...props}>
				<Profile {...props} />
				<ChatContainer {...props}>
					<Title {...props}>{name}</Title>
					<Description {...props}>{description}</Description>
				</ChatContainer>
			</TotalContainer>
		</Fragment>
	);
};

ChatBox.defaultProps = {
	me: false,
	name: 'Stark'
};

export default ChatBox;
