import React, { Fragment, useState, useCallback } from 'react';
import styled from 'styled-components';
import SignInput from '../../UI_Components/SignInput';
import SignSelector from '../../UI_Components/SignSelect';
import Button from '../../UI_Components/Button';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
	margin-top: 6em;
	& > div {
		margin-top: 2rem;
	}
`;

// Hooks 문법을 사용하여 코드가 더 간결하게 되었다.
const SignupPage = (props) => {
	const user = JSON.parse(window.sessionStorage.getItem('localUser'));
	const isLogined = !!user;
	const { history } = props;
	const [ userId, setUserId ] = useState('');
	const [ userPassword, setUserPassword ] = useState('');
	const [ userNickname, setUserNickname ] = useState('');
	const [ userJob, setUserJob ] = useState('');
	const [ isIdError, setIsIdError ] = useState(false);
	const [ isPasswordError, setIsPasswordError ] = useState(false);
	const [ isNicknameError, setIsNicknameError ] = useState(false);
	const [ isJobError, setIsJobError ] = useState(false);
	const onChangeId = useCallback(
		(e) => {
			setUserId(e.target.value);
			if (userId === '') setIsIdError(true);
			else setIsIdError(false);
		},
		[ userId ]
	);
	const onChangePassword = useCallback(
		(e) => {
			setUserPassword(e.target.value);
			if (userPassword === '') setIsPasswordError(true);
			else setIsPasswordError(false);
		},
		[ userPassword ]
	);
	const onChangeNickname = useCallback(
		(e) => {
			setUserNickname(e.target.value);
			if (userNickname === '') setIsNicknameError(true);
			else setIsNicknameError(false);
		},
		[ userNickname ]
	);
	const onChangeJob = useCallback((e) => {
		setUserJob(e.target.value);
		if (e.target.value === '') setIsJobError(true);
		else setIsJobError(false);
	}, []);
	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();
			if (userId === '') return setIsIdError(true);
			if (userPassword === '') return setIsPasswordError(true);
			if (userNickname === '') return setIsNicknameError(true);
			if (userJob === '') return setIsJobError(true);
			const result = await axios.post(
				`/api/user`,
				{ userId, userPassword, userNickname, userJob },
				{ withCredentials: true }
			);
			console.dir(result);
			return props.history.goBack();
		},
		[ userId, userNickname, userPassword, userJob, props.history ]
	);
	const handleKeyPress = useCallback(
		async (e) => {
			try {
				if (e.key === 'Enter') {
					if (userId === '') return setIsIdError(true);
					if (userPassword === '') return setIsPasswordError(true);
					if (userNickname === '') return setIsNicknameError(true);
					if (userJob === '') return setIsJobError(true);
					const result = await axios.post(
						`/api/user`,
						{ userId, userPassword, userNickname, userJob },
						{ withCredentials: true }
					);
					window.sessionStorage.setItem('awfweljk', result.data[0]);
					return props.history.goBack();
				}
			} catch (e) {
				console.dir(e);
			}
		},
		[ userId, userNickname, userPassword, userJob, props.history ]
	);
	if (isLogined) {
		history.push('/');
	}
	return (
		<Fragment>
			<Container onKeyPress={handleKeyPress}>
				<form>
					<SignInput
						label="아이디"
						placeholder="ID"
						value={userId}
						onChange={onChangeId}
						error={isIdError}
						message="아이디를 입력해주세요"
					/>
					<SignInput
						label="비밀번호"
						placeholder="Password"
						type="password"
						value={userPassword}
						onChange={onChangePassword}
						autoComplete="on"
						error={isPasswordError}
						message="비밀번호를 입력해주세요"
					/>
					<SignInput
						label="별명"
						placeholder="Nickname"
						value={userNickname}
						onChange={onChangeNickname}
						error={isNicknameError}
						message="별명을 입력해주세요"
					/>
					<SignSelector
						label="직업"
						list={[ '학생', '선생님', '개발자', '디자이너', '기획자', '등등' ]}
						onChange={onChangeJob}
						value={userJob}
						error={isJobError}
						message="직업을 선택해주세요"
					/>
					<div style={{ marginTop: '6rem', textAlign: 'center' }}>
						<Button onClick={handleSubmit}>회원가입</Button>
					</div>
				</form>
			</Container>
		</Fragment>
	);
};
export default withRouter(SignupPage);
