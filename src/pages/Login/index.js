import React, { Component, Fragment } from 'react';
import LayOut from '../../components/UI_Components/LayOut';
import LoginPage from '../../components/Page_Components/LoginPage';

class Login extends Component {
	render() {
		return (
			<Fragment>
				<LayOut title={'로그인'} content={<LoginPage />} />
			</Fragment>
		);
	}
}

export default Login;
