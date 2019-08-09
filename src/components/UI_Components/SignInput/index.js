import React, { Fragment, useRef, useCallback } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	width: 60%;
	margin: 1rem;
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

const Input = styled.input`
	border: none;
	border-bottom: 1px solid #2d3646;
	width: 60%;
	font-size: 1rem;
	height: 1.8rem;
	&:focus {
		outline: none;
	}
	&::placeholder {
		color: #2d3646;
		opacity: 0.3;
	}
`;

const SignInput = (props) => {
	const { label, value, placeholder, onChange } = props;
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
					{...props}
					placeholder={placeholder}
				/>
			</Container>
		</Fragment>
	);
};

SignInput.defaultProps = {
	label: '라벨을 입력하세요',
	value: null,
	placeholder: 'placeholder',
	onChange: () => {}
};

export default SignInput;
