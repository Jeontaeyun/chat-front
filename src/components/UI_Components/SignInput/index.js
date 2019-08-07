import React, { Fragment } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	width: 60%;
	height: 2.3rem;
`;

const Title = styled.div`
	margin-bottom: 0;
	font-size: 0.8rem;
	@media (max-width: 500px) {
		font-size: 0.8rem;
	}
`;

const Input = styled.input`
	border: none;
	border-bottom: 1px solid #2d3646;
	width: 60%;
	font-size: 1rem;
	height: 1.8rem;
	&:focus {
		outline: none;
	}
`;

const SignInput = (props) => {
	const { label, value, onChange } = props;
	return (
		<Fragment>
			<Container>
				<Title>{label}</Title>
				<Input value={value} onChange={onChange} {...props} />
			</Container>
		</Fragment>
	);
};

SignInput.defaultProps = {
	label: '라벨을 입력하세요',
	value: null,
	onChange: () => {}
};

export default SignInput;
