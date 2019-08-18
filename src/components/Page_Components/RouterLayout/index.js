import React, { Fragment, useCallback } from 'react';
import LayOut from '../../UI_Components/LayOut';
import { withRouter } from 'react-router-dom';

const RouterLayout = (props) => {
	const { match, history } = props;
	const isHome = match.path === '/';
	if (match.props) {
	}
	const backActionClick = useCallback(
		(e) => {
			history.goBack();
		},
		[ history ]
	);
	return (
		<Fragment>
			<LayOut {...props} isHome={isHome} backActionClick={backActionClick} />
		</Fragment>
	);
};

export default withRouter(RouterLayout);
