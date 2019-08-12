import React, { Component, Fragment } from 'react';
import SignupPage from '../../components/Page_Components/SignupPage';
import RouterLayout from '../../components/Page_Components/RouterLayout';

class Signup extends Component {
	render() {
		return (
			<Fragment>
				<RouterLayout title={'회원가입'} content={<SignupPage />} />
			</Fragment>
		);
	}
}

export default Signup;
