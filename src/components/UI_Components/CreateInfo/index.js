import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

const CreateContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const InfoButton = styled(Button)`
    margin-right: 1.5%;
    margin-left: 1.5%;
`;

const CreateInfo= (props)=>{
        return(
            <>
                <CreateContainer>
                    <InfoButton>채팅방 만들기</InfoButton>
                    <InfoButton>회원가입</InfoButton>
                    <InfoButton>로그인</InfoButton>
                </CreateContainer>
            </>
        );
};
// Component Default Props
CreateInfo.defaultProps = {
};

export default CreateInfo;