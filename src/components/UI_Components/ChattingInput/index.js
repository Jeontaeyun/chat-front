import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import Button from '../Button';

const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
`;

const TextInput = styled.input`
    padding-right: 1rem;
    flex: 0.8;
    background: white;
    text-align: right;
    border: none;
    margin-right: 2%;
    color: #000;
    height: 98%;
    font-size: 0.9rem;
    color: white;
    background: rgba(45,54,70,0.8);
    &::placeholder{
        color: white;
    }
`;

const SendButton = styled(Button)`
    flex:0.2;
    margin-right: 3%;
`

const ChattingInput = (props)=>{
    const [text, setText] = useState("");
    const onChangeText = useCallback((e)=>{setText(e.target.value);},[text]);
    const onKeyPressText = useCallback((e)=>{if(e.key==='Enter'){e.preventDefault(); setText('');}},[text ]);
    const handleOnClick = useCallback((e)=> {
        // 이거 무슨 설정일까?
        e.preventDefault();
        // 메세지 보내는 메소드 실행하는 부분
        setText('');
    },[text]);
        return(
            <>
                <InputContainer>
                    <TextInput placeholder='Text to me' value={text} onChange={onChangeText} onKeyPress={onKeyPressText}/>
                    <SendButton onClick={handleOnClick}>Send</SendButton>
                </InputContainer>
            </>
        );
};

export default ChattingInput;