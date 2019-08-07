import React from 'react';
import styled from 'styled-components';
import Title from '../Title';

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
    flex:0.05;
    display: block;
    position: relative;
    background: #2D3646;
    width: 100%;
`;
const SecondContianer = styled.div`
    flex:0.9;
    display: block;
    position: relative;
    width: 100%;
    overflow: scroll;
`;
const ThirdContianer = styled.div`
    flex:0.05;
    display: block;
    position: relative;
    width: 100%;
    background: rgba(45,54,70,1);
`;

const LayOut = (props)=>{
    const {title, content, info} = props;
        return(
            <>
                <BoxBorder>
                    <FirstContianer>
                    <Title>{title}</Title>
                    </FirstContianer>
                    <SecondContianer>
                        {content}
                    </SecondContianer>
                    <ThirdContianer>
                        {info}
                    </ThirdContianer>
                </BoxBorder>
            </>
        );
};

export default LayOut;