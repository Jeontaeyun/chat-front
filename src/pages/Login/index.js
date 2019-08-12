import React, { Component, Fragment } from 'react';
import LoginPage from '../../components/Page_Components/LoginPage';
import RouterLayout from '../../components/Page_Components/RouterLayout';

class Login extends Component {
	render() {
		return (
			<Fragment>
				<RouterLayout title={'로그인'} content={<LoginPage />} />
			</Fragment>
		);
	}
}

export default Login;
