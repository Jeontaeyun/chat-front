import React from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import Title from '../Title';
import MainProfile from '../MainProfile';

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


const ChattingRoom = (props)=>{
        const {children} = props;
        return(
            <>
                <BoxBorder>
                    <FirstContianer>
                    <Title>안녕하세요</Title>
                    </FirstContianer>
                    <SecondContianer>
                        {/*프로필이 들어가거나 채팅 목록이 들어갈 화면*/}
                        <MainProfile/>
                    </SecondContianer>
                    {children}
                </BoxBorder>
            </>
        );
};

export default ChattingRoom;