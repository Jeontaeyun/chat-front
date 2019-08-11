import React, { Fragment } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import { Link } from 'react-router-dom';

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
	const { firstLink, secondLink, thirdLink } = props;
	return (
		<Fragment>
			<CreateContainer>
				<StyleLink to={firstLink}>
					<Button>채팅방 만들기</Button>
				</StyleLink>
				<StyleLink to={secondLink}>
					<Button>회원가입</Button>
				</StyleLink>
				<StyleLink to={thirdLink}>
					<Button>로그인</Button>
				</StyleLink>
			</CreateContainer>
		</Fragment>
	);
};
// Component Default Props
CreateInfo.defaultProps = {};

export default CreateInfo;
