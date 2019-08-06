import React from 'react';
import styled from 'styled-components';

const basicProfile = '/basicProfile.jpg';

const Frame = styled.div`
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    transition: background 0.1s ease-out;
    display:flex;
    flex-direction: row;
    align-items: center;

    height: 60px;
    cursor: pointer;
    &:hover{
        transition: background 0.1s ease-in;
        background: rgba(45,54,70,0.2);
    }
    & + & {
        border-top: 0.1px solid rgba(45,54,70,0.7);
    }
    &:first-of-type{
        margin-top: 0.3rem;
    }
    &:last-of-type{
        margin-bottom: 0.3rem;
    }
    
`;

const RoomTitle = styled.div`
    flex:0.8;
    margin-left: 3%;
`;

const Profile = styled.div`
    margin-left: 3%;
    width: 35px;
    height: 35px;
    ${props=> props.src? `
    background: white;
    ` : `
    background-image: url('${basicProfile}');
    background-size : cover;
    background-repeat: no-repeat;
    background-position: center;
    bacground: white;
    background-position-y: -4px;
    `}
    border-radius: 100%;

`;
const InfoContiner = styled.div`
    margin-right:3%;
    flex:0.2;
    display: flex;
    flex-direction:column;
    font-size: 0.8rem;
`;

const Info = styled.div`
    text-align: right;
    flex:0.5;
    
`


const MainProfile = (props)=>{
    const {title, varibleNumber, master} = props;
        return(
            <>
                <Frame draggable="true">
                    <Profile {...props}></Profile>
                    <RoomTitle>{title}</RoomTitle>
                    <InfoContiner>
                        <Info>{`${varibleNumber}명`}</Info>
                        <Info>{`${master}이 만든 방`}</Info>
                    </InfoContiner>
                </Frame>
            </>
        );
};
// Component Default Props
MainProfile.defaultProps = {
    title: "채팅방 이름입니다.",
    src: false,
    varibleNumber: 0,
    master: "Stark"
};

export default MainProfile;