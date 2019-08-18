import React, { Fragment } from 'react';
import styled from 'styled-components';

const BoxBorder = styled.div`
	transition: background 0.2s ease-in-out;
	display: inline-flex;
	text-align: center;
	border: 0.1rem solid #2d3646;
	flex-direction: column;
	justify-content: center;
	color: ${(props) => (props.disabled ? 'white' : '#2D3646')};
	background: ${(props) => (props.disabled ? '#2D3646' : 'white')};
	border-radius: 0.3rem;
	height: 2rem;
	cursor: ${(props) => !props.disabled && 'pointer'};
	${(props) =>
		props.disabled ? '' : '&:hover{transition: background 0.2s ease-in-out; background: #2D3646; color:white;}'};
`;

const Contents = styled.div`
	margin: 3rem;
	font-size: 1rem;
	@media (max-width: 1024px) {
		margin: auto 2rem;
		font-size: 0.7rem;
	}
	@media (max-width: 768px) {
		margin: auto 2rem;
		font-size: 0.08rem;
	}
	@media (max-width: 540px) {
		margin: auto 1rem;
		font-size: 0.03rem;
	}
`;

const ChattingRoom = (props) => {
	const { children, onClick } = props;
	return (
		<Fragment>
			<BoxBorder {...props} onClick={onClick}>
				<Contents>{children}</Contents>
			</BoxBorder>
		</Fragment>
	);
};
// Component Default Props
ChattingRoom.defaultProps = {
	children: 'DEFAULT',
	onClick: () => {},
	disabled: false,
	to: ''
};

export default ChattingRoom;
