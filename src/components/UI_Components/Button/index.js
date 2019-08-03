import React from 'react';
import styled from 'styled-components';

const BoxBorder = styled.div`
    transition: background 0.2s ease-in-out;
    display: inline-flex;
    text-align: center;
    border : ${props => props.disabled? "0.1rem solid #2D3646" : "0.1rem solid #FF357B"};
    flex-direction: column;
    justify-content: center;
    color: ${props => props.disabled? "#2D3646" : "white"};
    background: ${props => props.disabled? "white" :"#FF357B"};
    border-radius: 0.3rem;
    height: 2rem;
    cursor: ${props => !props.disabled && 'pointer'};
    ${props => props.disabled? "" :"&:hover{transition: background 0.2s ease-in-out; background: #D82D68;}"};
`;

const Contents = styled.div`
    margin: 3rem;
`;

const ChattingRoom = (props)=>{
        const {children, onClick} = props;
        return(
            <>
                <BoxBorder {...props} onClick = {onClick}>
                    <Contents>{children}</Contents>
                </BoxBorder>
            </>
        );
};
// Component Default Props
ChattingRoom.defaultProps = {
    children: "DEFAULT",
    onClick: () => {},
    disabled: false
};

export default ChattingRoom;