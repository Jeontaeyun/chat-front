import React, { Fragment } from 'react';
import CreateInfo from '../../components/Page_Components/CreateInfo';
import DraggableMain from '../../components/Page_Components/DraggableMain';
import RouterLayout from '../../components/Page_Components/RouterLayout';

const Main = (props) => {
	const user = JSON.parse(window.sessionStorage.getItem('localUser'));
	const isLogined = !!user;
	return (
		<Fragment>
			<RouterLayout
				title={user ? `${user.nickname}님 감사합니다.` : `Chatting with Everyone`}
				content={<DraggableMain />}
				info={<CreateInfo firstLink="/newRoom" secondLink="/signup" thirdLink="/login" isLogined={isLogined} />}
			/>
		</Fragment>
	);
};

export default Main;
