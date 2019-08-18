import React, { Fragment, useState, useCallback } from 'react';
import styled from 'styled-components';
import SignInput from '../../UI_Components/SignInput';
import Button from '../../UI_Components/Button';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
	margin-top: 15rem;
	margin-bottom: 10rem;
`;
// Hooks 문법을 사용하여 코드가 더 간결하게 되ㅗ었다.
const LoginPage = (props) => {
	const user = JSON.parse(window.sessionStorage.getItem('localUser'));
	const isLogined = !!user;
	const { history } = props;
	const [ userId, setUserId ] = useState('');
	const [ userPassword, setUserPassword ] = useState('');
	const [ isId, setIsId ] = useState(false);
	const [ isPassword, setIsPassword ] = useState(false);
	const handleChangeId = useCallback((e) => {
		setUserId(e.target.value);
	}, []);
	const handleChangePassword = useCallback((e) => {
		setUserPassword(e.target.value);
	}, []);
	const handleSubmit = useCallback(
		async (e) => {
			if (userId === '') return setIsId(true);
			if (userPassword === '') return setIsPassword(true);
			const user = await axios.post(`/api/login`, { userId, userPassword }, { withCredentials: true });
			console.log(user);
			window.sessionStorage.setItem('localUser', user);
			return props.history.goBack();
		},
		[ userId, userPassword, props.history ]
	);
	const handleSubmitKey = useCallback(
		async (e) => {
			if (e.key === 'Enter') {
				if (userId === '') return setIsId(true);
				if (userPassword === '') return setIsPassword(true);
				const user = await axios.post(`/api/login`, { userId, userPassword }, { withCredentials: true });
				window.sessionStorage.setItem('localUser', JSON.stringify(user.data));
				console.log(user);
				return props.history.goBack();
			}
		},
		[ userId, userPassword, props.history ]
	);
	if (isLogined) {
		history.push('/');
	}
	return (
		<Fragment>
			<Container onKeyPress={handleSubmitKey}>
				<form>
					<SignInput
						label="아이디"
						placeholder="ID"
						value={userId}
						onChange={handleChangeId}
						error={isId}
						message="아이디를 입력하세요"
					/>
					<SignInput
						label="비밀번호"
						placeholder="Password"
						type="password"
						value={userPassword}
						onChange={handleChangePassword}
						error={isPassword}
						message="비밀번호를 입력하세요"
						autoComplete="on"
					/>
					<div style={{ marginTop: '6rem', textAlign: 'center' }}>
						<Button onClick={handleSubmit}>로그인</Button>
					</div>
				</form>
			</Container>
		</Fragment>
	);
};
export default withRouter(LoginPage);
