import React, { Fragment } from 'react';
import CreateInfo from '../../components/UI_Components/CreateInfo';
import DraggableMain from '../../components/Page_Components/DraggableMain';
import RouterLayout from '../../components/Page_Components/RouterLayout';

const Main = (props) => {
	return (
		<Fragment>
			<RouterLayout
				title={'00님 감사합니다.'}
				content={<DraggableMain />}
				info={<CreateInfo firstLink="/newRoom" secondLink="/signup" thirdLink="/login" />}
			/>
		</Fragment>
	);
};

export default Main;
