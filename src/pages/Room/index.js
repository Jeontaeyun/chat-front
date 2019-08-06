import React from 'react';
import ChattingInput from '../../components/UI_Components/ChattingInput';
import LayOut from '../../components/UI_Components/LayOut';
import RoomPage from '../../components/Page_Components/RoomPage';

const Main = (props)=>{
        return(
            <>
               <LayOut title={'채팅방 이름'} content={<RoomPage/>} info={<ChattingInput/>}/>
            </>
        );
};

export default Main;