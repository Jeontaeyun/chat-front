import React, { Fragment, useCallback } from 'react';
import styled from 'styled-components';
import Button from '../../UI_Components/Button';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

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

const CreateInfo = (props) => {
	const { firstLink, secondLink, thirdLink, isLogined, history } = props;
	const handleLogout = useCallback(async (e) => {
		try {
			await axios.post('http://localhost:8000/api/logout', { withCredentials: true });
			window.sessionStorage.removeItem('localUser');
			history.goBack();
		} catch (e) {
			console.error(e);
		}
	}, []);
	return (
		<Fragment>
			<CreateContainer>
				<StyleLink to={firstLink}>
					<Button>채팅방 만들기</Button>
				</StyleLink>
				{isLogined ? (
					<Fragment>
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

export default withRouter(CreateInfo);
