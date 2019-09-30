import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';

const MainProfile = (props) => {
	const { title, numberUser, info, max } = props;
	const [ isMax, setIsMax ] = useState(false);
	useEffect(
		() => {
			if (numberUser >= max) {
				setIsMax(true);
			} else {
				setIsMax(false);
			}
		},
		[ numberUser, max ]
	);
	return (
		<Fragment>
			<Frame>
				<Profile {...props} />
				<RoomTitle>{title}</RoomTitle>
				<InfoContiner>
					<Info style={isMax ? { color: '#FF7A9B', fontWeight: '900' } : null}>
						{isMax ? 'Full' : `${numberUser} / ${max}명`}
					</Info>
					<Info>{info}</Info>
				</InfoContiner>
			</Frame>
		</Fragment>
	);
};
// Component Default Props
MainProfile.defaultProps = {
	title: '채팅방 이름입니다.채팅방 이름입니다.채팅방 이름입니다.채팅방 이름입니다.채팅방 이름입니다.채팅방 이름입니다.채팅방 이름입니다.채팅방 이름입니다.',
	src: '',
	numberUser: 2,
	master: 'Stark',
	draggable: true,
	max: 3
};

const basicProfile = '/basicProfile.jpg';

const Frame = styled.div`
	margin-left: 0.3rem;
	margin-right: 0.3rem;
	transition: background 0.1s ease-out;
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 60px;
	cursor: pointer;
	&:hover {
		transition: background 0.1s ease-in;
		background: rgba(45, 54, 70, 0.2);
	}
	& + & {
		border-top: 0.2px solid rgba(45, 54, 70, 0.5);
	}
	&:first-of-type {
		margin-top: 0.3rem;
	}
	&:last-of-type {
		margin-bottom: 0.3rem;
	}
`;

const RoomTitle = styled.div`
	flex: 0.8;
	margin-left: 3%;
	white-space: nowrap;
	overflow: hidden;
	/*테두리에 닿을 정도가 되면 자동으로 ...을 넣어주는 CSS속성
      위의 white-space와 overflow속성이 모두 있어야 한다.*/
	text-overflow: ellipsis;
`;

const Profile = styled.div`
	margin-left: 3%;
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
const InfoContiner = styled.div`
	margin-right: 3%;
	flex: 0.2;
	display: flex;
	flex-direction: column;
	font-size: 0.8rem;
`;

const Info = styled.div`
	text-align: right;
	flex: 0.5;
`;

export default MainProfile;
