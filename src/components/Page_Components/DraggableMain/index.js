import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import MainProfile from '../../UI_Components/MainProfile';
import {DndProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

const styledContainer = styled.div`
    width: 100%;
`;
const DraggableMain = (props)=>{
    
    const [rooms, setRooms] = useState([1,2,3,4,5,6,7,8,9,10,11,12]);
    const moveRoom = useCallback((dragIndex, hoverIndex)=> {
        const dragRoom = rooms[dragIndex];
        setRooms(
            update(rooms, {
                $splice: [[dragIndex, 1], [hoverIndex, 0, dragRoom]],
            })
        );
    }, [rooms]);

    return(
            <styledContainer>
            <DndProvider backend = {HTML5Backend}>
                {/*react-dnd 라이브러리를 이용할 때 반드시 map에 index를 넣어주어야 한다.*/}
                {rooms.map((item, index)=> <MainProfile id={item} title = {item} key={item} index={index} link={`/room/${item}`} moveRoom = {moveRoom}/>)}
            </DndProvider>
            </styledContainer>
    );
}
        
export default DraggableMain;