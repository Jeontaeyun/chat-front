import React, { Fragment } from 'react';
import styled from 'styled-components';

/*
    새삼 react-dnd를 이용하면서 코드의 재사용성이 힘들다는 것을 알았다. 완벽히 독립적으로 작용하는 컴포넌트를 구현하는 것은
    꽤 생각을 많이 요구하는 것 같다. 여기서도 벌써 props와 container가 필요하다.
    또한, 리액트를 통한 state가 변해도 다시 리프레쉬를 하면 해당 데이터가 초기화 된다. 이를 저장하는 방법을 강구해야 한다.
    01. 서버에 저장
    02. 로컬 스토리지에 저장
    03. ???

    [내가 생각하는 로직]
    01. 드래그 앤 드랍 이벤트에 드래그 한 데이터 추출
    02. 드랍할 때 그 사이에 변하는 데이터의 순서 변경
    03. 이 값을 드랍 시 dispatch하는 구현법

*/
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

const MainProfile = (props) => {
	const { title, varibleNumber, master, max } = props;
	return (
		<Fragment>
			<Frame>
				<Profile {...props} />
				<RoomTitle>{title}</RoomTitle>
				<InfoContiner>
					<Info style={max && { color: '#FF7A9B', fontWeight: '900' }}>
						{max ? 'Full' : `${varibleNumber}명`}
					</Info>
					<Info>{`${master}이 만든 방`}</Info>
				</InfoContiner>
			</Frame>
		</Fragment>
	);
};
// Component Default Props
MainProfile.defaultProps = {
	title: '채팅방 이름입니다.채팅방 이름입니다.채팅방 이름입니다.채팅방 이름입니다.채팅방 이름입니다.채팅방 이름입니다.채팅방 이름입니다.채팅방 이름입니다.',
	src: false,
	varibleNumber: 0,
	master: 'Stark',
	draggable: true,
	max: true
};

export default MainProfile;
