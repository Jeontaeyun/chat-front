import React, { Fragment, useState, useCallback } from 'react';
import styled from 'styled-components';
import SignInput from '../../UI_Components/SignInput';
import Button from '../../UI_Components/Button';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import SignSelector from '../../UI_Components/SignSelect';

const Container = styled.div`
	margin-top: 15rem;
	margin-bottom: 10rem;
`;
// Hooks 문법을 사용하여 코드가 더 간결하게 되ㅗ었다.
const CreateRoomPage = (props) => {
	const user = JSON.parse(window.sessionStorage.getItem('localUser'));
	const isLogined = !!user;
	const { history } = props;
	const [ roomName, setRoomName ] = useState('');
	const [ roomPassword, setRoomPassword ] = useState('');
	const [ roomMax, setRoomMax ] = useState(10);
	const [ isName, setIsName ] = useState(false);

	const handleChangeRoomName = useCallback((e) => {
		setRoomName(e.target.value);
	}, []);
	const handleChangeRoomPassword = useCallback((e) => {
		setRoomPassword(e.target.value);
	}, []);
	const handleChangeRoomMax = useCallback((e) => {
		setRoomMax(e.target.value);
	}, []);
	const handleSubmit = useCallback(
		async (e) => {
			if (roomName === '') return setIsName(true);
			axios.post(
				`/api/room`,
				{ title: roomName, password: roomPassword, max: roomMax, owner: user._id },
				{ withCredentials: true }
			);
			console.log(roomName, roomPassword, roomMax);
		},
		[ roomName, roomPassword, roomMax, user ]
	);
	const handleSubmitKey = useCallback(
		async (e) => {
			if (e.key === 'Enter') {
				if (roomName === '') return setIsName(true);
				console.log('hi');
			}
		},
		[ roomName ]
	);
	if (!isLogined) {
		history.push('/');
	}
	return (
		<Fragment>
			<Container onKeyPress={handleSubmitKey}>
				<form>
					<SignInput
						label="방 제목"
						placeholder="안녕하세요 새로운 방입니다."
						value={roomName}
						onChange={handleChangeRoomName}
						error={isName}
						message="방 제목을 입력하세요"
					/>
					<SignInput
						label="비밀번호"
						placeholder="Password"
						type="password"
						value={roomPassword}
						onChange={handleChangeRoomPassword}
						autoComplete="on"
					/>
					<SignSelector
						label="제한 인원 수 (기본 10명)"
						list={[ 2, 3, 4, 5, 6, 7, 8, 9, 10 ]}
						value={roomMax}
						onChange={handleChangeRoomMax}
					/>
					<div style={{ marginTop: '6rem', textAlign: 'center' }}>
						<Button onClick={handleSubmit}>방 생성</Button>
					</div>
				</form>
			</Container>
		</Fragment>
	);
};
export default withRouter(CreateRoomPage);
