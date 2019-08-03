import React from 'react';
import styled from 'styled-components';

const TitleBorder = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    color: white;
    position: absolute;
    width: 100%;
    background: #2D3646;
`;
const Contents = styled.div`
    padding-left: 1rem;
`;


const Title = (props)=>{
        const {children} = props;
        return(
            <>
                <TitleBorder>
                    <Contents>{children}</Contents>
                </TitleBorder>
            </>
        );
};
// Component Default Props
Title.defaultProps = {
    title: "채팅방 제목입니다."
};

export default Title;