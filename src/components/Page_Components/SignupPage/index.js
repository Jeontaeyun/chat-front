import React, { Fragment } from 'react';
import styled from 'styled-components';
import SignInput from '../../UI_Components/SignInput';
import SignSelector from '../../UI_Components/SignSelect';
import Button from '../../UI_Components/Button';

const Container = styled.div`
	margin-top: 6em;
	& > div {
		margin-top: 2rem;
	}
`;

// Hooks 문법을 사용하여 코드가 더 간결하게 되ㅗ었다.
const SignupPage = (props) => {
	return (
		<Fragment>
			<Container>
				<SignInput label="아이디" placeholder="ID" />
				<SignInput label="비밀번호" placeholder="Password" type="password" />
				<SignInput label="별명" placeholder="Nickname" />
				<SignSelector label="직업" list={[ '학생', '선생님', '개발자', '디자이너', '기획자', '등등' ]} />
				<div style={{ marginTop: '6rem', textAlign: 'center' }}>
					<Button>회원가입</Button>
				</div>
			</Container>
		</Fragment>
	);
};
export default SignupPage;
