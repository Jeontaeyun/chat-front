import React, { Fragment } from 'react';
import styled from 'styled-components';
import SignInput from '../../UI_Components/SignInput';
import Button from '../../UI_Components/Button';

const Container = styled.div`
	margin-top: 15rem;
	margin-bottom: 10rem;
`;
// Hooks 문법을 사용하여 코드가 더 간결하게 되ㅗ었다.
const LoginPage = (props) => {
	return (
		<Fragment>
			<Container>
				<SignInput label="아이디" placeholder="ID" />
				<SignInput label="비밀번호" placeholder="Password" type="password" />
				<div style={{ marginTop: '6rem', textAlign: 'center' }}>
					<Button>로그인</Button>
				</div>
			</Container>
		</Fragment>
	);
};
export default LoginPage;
