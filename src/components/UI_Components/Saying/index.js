import React, {useCallback} from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import Title from '../Title';
import MainProfile from '../MainProfile';
import ChattingInput from '../ChattingInput';
import CreateInfo from '../CreateInfo';

const BoxBorder = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    border : 0.2rem solid #2D3646;
    width: 70%;
    height: 90vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`;
const FirstContianer = styled.div`
    flex:0.1;
    display: block;
    position: relative;
    background: #2D3646;
    width: 100%;
`;
const SecondContianer = styled.div`
    flex:0.8;
    display: block;
    position: relative;
    width: 100%;
    overflow: scroll;
`;
const ThirdContianer = styled.div`
    flex:0.1;
    display: block;
    position: relative;
    width: 100%;
    background: rgba(45,54,70,0.8);
`;

const ChattingRoom = (props)=>{
    
        return(
            <>
                <BoxBorder>
                    <FirstContianer>
                    <Title>안녕하세요</Title>
                    </FirstContianer>
                    <SecondContianer>
                        {/*프로필이 들어가거나 채팅 목록이 들어갈 화면*/}
                        <MainProfile/>
                        <MainProfile/>
                        <MainProfile/>
                        <MainProfile/>
                    </SecondContianer>
                    <ThirdContianer>
                        <CreateInfo/>
                    </ThirdContianer>
                </BoxBorder>
            </>
        );
};

export default ChattingRoom;