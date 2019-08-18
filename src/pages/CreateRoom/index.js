import React, { Component, Fragment } from 'react';
import CreateRoomPage from '../../components/Page_Components/CreateRoomPage';
import RouterLayout from '../../components/Page_Components/RouterLayout';

class CreateRoom extends Component {
	render() {
		return (
			<Fragment>
				<RouterLayout title="방 생성" content={<CreateRoomPage />} />
			</Fragment>
		);
	}
}

export default CreateRoom;
