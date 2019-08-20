import React, { Fragment, useCallback } from 'react';
import LayOut from '../../UI_Components/LayOut';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';

const RouterLayout = (props) => {
	const { match, history } = props;
	const isHome = match.path === '/';
	const isRoom = match.path.split('/')[1] === 'room';

	const backActionClick = useCallback(
		(e) => {
			if (isRoom) {
				const socket = io.connect('http://localhost:8000/chat', { path: '/socket.io' });
				socket.emit('disconnect', {});
			}
			history.push('/');
		},
		[ history, isRoom ]
	);
	return (
		<Fragment>
			<LayOut {...props} isHome={isHome} backActionClick={backActionClick} />
		</Fragment>
	);
};

export default withRouter(RouterLayout);
