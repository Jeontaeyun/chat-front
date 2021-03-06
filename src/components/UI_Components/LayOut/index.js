import React, { Fragment } from 'react';
import styled from 'styled-components';

const LayOut = (props) => {
	const { title, content, info, isHome, backActionClick } = props;
	return (
		<Fragment>
			<BoxBorder>
				<FirstContianer>
					<Profile {...props} />
					<Title>{title}</Title>
					<Flex>{!isHome && <SendButton onClick={backActionClick} />}</Flex>
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

const basicProfile = '/basicProfile.jpg';
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
const Title = styled.div`
	flex: 0.99;
	padding-left: 0.5rem;
	color: white;
`;
const Profile = styled.div`
	margin: 1%;
	width: 35px;
	height: 35px;
	${(props) =>
		props.profile
			? `
	background-image: url('http://localhost:9000${props.profile}');
	 background-size : cover;
    background-repeat: no-repeat;
    background-position: center;
    bacground: white;
    background-position-y: -4px;
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

const FirstContianer = styled.div`
	flex: 0.05;
	display: flex;
	flex-direction: row;
	align-items: center;
	color: white;
	width: 100%;
	background: #2d3646;
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
const Flex = styled.div`
	flex: 0.01;
	margin-right: 0.5rem;
`;
const SendButton = styled.div`
	width: 20px;
	height: 20px;
	margin-right: 0;
	background: url('/sendicon.svg');
	background-size: contain;
	border-radius: 100%;
	transform: rotate(180deg);
	background-color: white;
	cursor: pointer;
	@media (max-height: 700px) {
		width: 15px;
		height: 15px;
	}
`;

export default LayOut;
