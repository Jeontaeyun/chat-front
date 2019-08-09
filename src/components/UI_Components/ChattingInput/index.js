import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
	position: relative;
	top: 50%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 80%;
	transform: translateY(-50%);
`;

const TextInput = styled.input`
	padding-right: 2rem;
	flex: 0.95;
	background: white;
	text-align: left;
	padding-left: 2%;
	border: none;
	color: #2d3646;
	height: 98%;
	font-size: 0.9rem;
	border-radius: 3rem;
	&:focus {
		outline: none;
	}
`;

const SendButton = styled.div`
	display: inline-block;
	position: absolute;
	width: 20px;
	height: 20px;
	background: url('/sendicon.svg');
	border-radius: 100%;
	right: 0;
	margin-right: 3%;
	margin-left: 3%;
	cursor: pointer;
`;

const ChattingInput = (props) => {
	// onSend는 text를 처리하는 로직을 넣어주는 부분이다.
	const { onSend } = props;
	const inputRef = useRef(null);
	const [ text, setText ] = useState('');

	useEffect(() => {
		inputRef.current.focus();
	}, []);
	const onChangeText = useCallback(
		(e) => {
			setText(e.target.value);
		},
		[ text ]
	);
	const onKeyPressText = useCallback(
		(e) => {
			if (e.key === 'Enter') {
				// null값 방지해주는 조건문
				if (text !== '') {
					e.preventDefault();
					onSend(text);
					return setText('');
				}
			}
		},
		[ text ]
	);
	const handleOnClick = useCallback(
		(e) => {
			// 이거 무슨 설정일까?
			if (text !== '') {
				e.preventDefault();
				onSend(text);
				return setText('');
			}
		},
		[ text ]
	);
	return (
		<Fragment>
			<InputContainer>
				<TextInput ref={inputRef} value={text} onChange={onChangeText} onKeyPress={onKeyPressText} />
				{text && <SendButton onClick={handleOnClick} />}
			</InputContainer>
		</Fragment>
	);
};

ChattingInput.default = {
	onSend: () => {}
};

export default ChattingInput;
