import React, { Component, Fragment } from 'react';
import ChattingInput from '../../components/UI_Components/ChattingInput';
import LayOut from '../../components/UI_Components/LayOut';
import SignupPage from '../../components/Page_Components/SignupPage';

class Signup extends Component {
	render() {
		return (
			<Fragment>
				<LayOut title={'회원가입'} content={<SignupPage />} />
			</Fragment>
		);
	}
}

export default Signup;
