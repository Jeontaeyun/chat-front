import React, { Fragment, useCallback } from 'react';
import LayOut from '../../UI_Components/LayOut';
import { withRouter } from 'react-router-dom';

const RouterLayout = (props) => {
	const { match, history, backActionClick } = props;
	const isHome = match.path === '/';
	const user = JSON.parse(window.sessionStorage.getItem('localUser'));
	const defaultBackAction = useCallback(
		(e) => {
			history.push('/');
		},
		[ history ]
	);
	return (
		<Fragment>
			<LayOut
				{...props}
				profile = {!!user && user.profile}
				isHome={isHome}
				backActionClick={backActionClick ? backActionClick : defaultBackAction}
			/>
		</Fragment>
	);
};

export default withRouter(RouterLayout);
