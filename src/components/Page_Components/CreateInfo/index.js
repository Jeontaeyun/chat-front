import React, { Fragment, useCallback } from 'react';
import styled from 'styled-components';
import Button from '../../UI_Components/Button';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

const CreateInfo = (props) => {
	const { firstLink, secondLink, thirdLink, isLogined, history } = props;
	const handleLogout = useCallback(
		async (e) => {
			try {
				await axios.post('/api/logout', { withCredentials: true });
				window.sessionStorage.removeItem('localUser');
				// component.forceUpdate()를 함수형에서 할 수 있는 방법은 없을까?
				history.push('/');
			} catch (e) {
				console.error(e);
			}
		},
		[ history ]
	);
	return (
		<Fragment>
			<CreateContainer>
				{isLogined ? (
					<Fragment>
						<StyleLink to={firstLink}>
							<Button>채팅방 만들기</Button>
						</StyleLink>
						<Button onClick={handleLogout}>로그아웃</Button>
					</Fragment>
				) : (
					<Fragment>
						<StyleLink to={secondLink}>
							<Button>회원가입</Button>
						</StyleLink>
						<StyleLink to={thirdLink}>
							<Button>로그인</Button>
						</StyleLink>
					</Fragment>
				)}
			</CreateContainer>
		</Fragment>
	);
};
// Component Default Props
CreateInfo.defaultProps = {
	isLogined: false
};

const CreateContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	height: 100%;
`;

const StyleLink = styled(Link)`
    text-decoration: none;
    color: #2D3646;
    &:hover {
        color: white;
    }
    margin:auto 5%;
`;
export default withRouter(CreateInfo);
