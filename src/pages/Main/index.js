import React from 'react';
import CreateInfo from '../../components/UI_Components/CreateInfo';
import DraggableMain from '../../components/Page_Components/DraggableMain';
import LayOut from '../../components/UI_Components/LayOut';


const Main = (props)=>{
        return(
            <>
                <LayOut title={'00님 감사합니다.'} content={<DraggableMain/>} info={<CreateInfo firstLink ="/newRoom" secondLink="/signup" thirdLink="/login"/>}/>
            </>
        );
};

export default Main;