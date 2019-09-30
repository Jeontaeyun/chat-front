import React, { Fragment, useState, useCallback } from 'react';
import styled from 'styled-components';
import SignInput from '../../UI_Components/SignInput';
import Button from '../../UI_Components/Button';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const LoginPage = (props) => {
	const { history } = props;
	const user = JSON.parse(window.sessionStorage.getItem('localUser'));
	const isLogined = !!user;
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

	const loginSubmit = useCallback(
		async (e) => {
			if (userId === '') return setIsId(true);
			if (userPassword === '') return setIsPassword(true);
			const user = await axios.post(
				`/api/login`,
				{
					userId,
					userPassword
				},
				{
					withCredentials: true
				}
			);
			window.sessionStorage.setItem('localUser', user);
			return props.history.goBack();
		},
		[ userId, userPassword, props.history ]
	);

	const loginSubmitKey = useCallback(
		async (e) => {
			if (e.key === 'Enter') {
				if (userId === '') return setIsId(true);
				if (userPassword === '') return setIsPassword(true);
				const user = await axios.post(
					`/api/login`,
					{
						userId,
						userPassword
					},
					{
						withCredentials: true
					}
				);
				window.sessionStorage.setItem('localUser', JSON.stringify(user.data));
				return props.history.goBack();
			}
		},
		[ userId, userPassword, props.history ]
	);

	if (isLogined) {
		return history.push('/');
	} else {
		return (
			<Fragment>
				<Container onKeyPress={loginSubmitKey}>
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
							<Button onClick={loginSubmit}>로그인</Button>
						</div>
					</form>
				</Container>
			</Fragment>
		);
	}
};

const Container = styled.div`
	margin-top: 15rem;
	margin-bottom: 10rem;
`;

export default withRouter(LoginPage);
