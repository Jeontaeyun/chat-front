import React, { Fragment, useRef, useCallback } from 'react';
import styled from 'styled-components';

const SignInput = (props) => {
	const { label, value, placeholder, onChange, type, message, error } = props;
	const titleRef = useRef('');

	const handleFocus = useCallback((e) => {
		titleRef.current.style.color = '#FF7A9B';
	}, []);

	const handleBlur = useCallback((e) => {
		titleRef.current.style.color = '#2d3646';
	}, []);

	return (
		<Fragment>
			<Container>
				<Title ref={titleRef}>{label}</Title>
				<Input
					value={value}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onChange={onChange}
					placeholder={placeholder}
					htmlType={type}
					{...props}
				/>
				{error && <Error>{message}</Error>}
			</Container>
		</Fragment>
	);
};

SignInput.defaultProps = {
	label: '라벨을 입력하세요',
	value: null,
	placeholder: 'placeholder',
	onChange: () => {},
	type: 'text',
	error: false,
	message: ''
};

const Container = styled.div`
	width: 80%;
	margin: 1rem auto;
`;

const Title = styled.div`
	margin-bottom: 0;
	font-size: 0.8rem;
	color: #2d3646;
	font-weight: 600;
	@media (max-width: 500px) {
		font-size: 0.8rem;
	}
`;

const Error = styled.div`
	margin-top: 0.3rem;
	font-size: 0.8rem;
	color: red;
	font-weight: 800;
	@media (max-width: 500px) {
		font-size: 0.8rem;
	}
`;

const Input = styled.input`
	border: none;
	border-bottom: 1px solid #2d3646;
	width: 100%;
	font-size: 1rem;
	height: 1.8rem;
	&:focus {
		outline: none;
		border-bottom: 1px solid #ff7a9b;
		transition: border-bottom 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	}
	&::placeholder {
		color: #2d3646;
		opacity: 0.3;
	}
`;

export default SignInput;
