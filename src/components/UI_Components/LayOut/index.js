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

const LayOut = (props) => {
	const { title, content, info } = props;
	return (
		<Fragment>
			<BoxBorder>
				<FirstContianer>
					<Title>{title}</Title>
				</FirstContianer>
				<SecondContianer>{content}</SecondContianer>
				<ThirdContianer>{info}</ThirdContianer>
			</BoxBorder>
		</Fragment>
	);
};

export default LayOut;
