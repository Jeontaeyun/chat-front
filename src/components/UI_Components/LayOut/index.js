import React, { Fragment } from 'react';
import styled from 'styled-components';
import Title from '../Title';

const BoxBorder = styled.div`
	display: flex;
	flex-direction: column;
	position: absolute;
	border: 0.2rem solid #2d3646;
	width: 70%;
	height: 90vh;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;
const FirstContianer = styled.div`
	flex: 0.05;
	display: block;
	position: relative;
	background: #2d3646;
	width: 100%;
`;
const SecondContianer = styled.div`
	flex: 0.9;
	display: block;
	position: relative;
	width: 100%;
	overflow: hidden;
`;
const ThirdContianer = styled.div`
	flex: 0.05;
	display: block;
	position: relative;
	width: 100%;
	background: rgba(45, 54, 70, 1);
`;
const SendButton = styled.div`
	position: absolute;
	width: 20px;
	height: 20px;
	background: url('/sendicon.svg');
	background-size: contain;
	border-radius: 100%;
	transform: rotate(180deg);
	right: 0;
	background-color: white;
	margin-top: 1.5%;
	margin-right: 3%;
	margin-left: 3%;
	cursor: pointer;
`;

const LayOut = (props) => {
	const { title, content, info, isHome, backActionClick } = props;
	return (
		<Fragment>
			<BoxBorder>
				<FirstContianer>
					<Title>{title}</Title>
					{!isHome && <SendButton onClick={backActionClick} />}
				</FirstContianer>
				<SecondContianer>{content}</SecondContianer>
				<ThirdContianer>{info}</ThirdContianer>
			</BoxBorder>
		</Fragment>
	);
};

LayOut.defaultProps = {
	match: null,
	history: null
};

export default LayOut;
