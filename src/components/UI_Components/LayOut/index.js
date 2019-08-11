import React, { Fragment, useCallback } from 'react';
import styled from 'styled-components';
import Title from '../Title';
import { withRouter } from 'react-router-dom';

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
	padding: 0.1rem;
	width: 20px;
	height: 20px;
	background: url('/sendicon.svg');
	background-size: contain;
	border-radius: 100%;
	transform: rotate(180deg);
	right: 0;
	background-color: white;
	top: 0.5rem;
	margin-right: 3%;
	margin-left: 3%;
	cursor: pointer;
`;

const LayOut = (props) => {
	const { title, content, info, history, match } = props;
	const isHome = match.path === '/';
	const backActionClick = useCallback((e) => {
		history.goBack();
	}, []);
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

export default withRouter(LayOut);
