import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import styled from 'styled-components';

const sendIcon = './sendicon.svg';

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
	padding-right: 1rem;
	flex: 0.95;
	background: white;
	text-align: left;
	padding-left: 2%;
	border: none;
	color: #2d3646;
	height: 98%;
	font-size: 0.9rem;
	border-radius: 3rem;
`;

const SendButton = styled.div`
	display: inline-block;
	position: absolute;
	z-index: 10;
	width: 20px;
	height: 20px;
	background: ${(props) => props.send && `url('${sendIcon}'); background`};
	border-radius: 100%;
	right: 0;
	margin-right: 3%;
	${(props) => (props.send ? 'cursor : pointer' : null)};
`;

const ChattingInput = (props) => {
	const inputRef = useRef(null);
	useEffect(() => {
		inputRef.current.focus();
	}, []);
	const [ text, setText ] = useState('');
	const onChangeText = useCallback(
		(e) => {
			setText(e.target.value);
		},
		[ text ]
	);
	const onKeyPressText = useCallback(
		(e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				setText('');
			}
		},
		[ text ]
	);
	const handleOnClick = useCallback(
		(e) => {
			// 이거 무슨 설정일까?
			e.preventDefault();
			// 메세지 보내는 메소드 실행하는 부분
			setText('');
		},
		[ text ]
	);
	return (
		<Fragment>
			<InputContainer>
				<TextInput ref={inputRef} value={text} onChange={onChangeText} onKeyPress={onKeyPressText} />
				<SendButton onClick={handleOnClick} send={text} />
			</InputContainer>
		</Fragment>
	);
};

export default ChattingInput;
