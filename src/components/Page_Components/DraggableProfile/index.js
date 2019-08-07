import React, {useRef} from 'react';
import {useDrag, useDrop} from 'react-dnd';
import styled from 'styled-components';
import ItemTypes from './ItemTypes';
import {Link} from 'react-router-dom';
import MainProfile from '../../UI_Components/MainProfile';
/*
    새삼 react-dnd를 이용하면서 코드의 재사용성이 힘들다는 것을 알았다. 완벽히 독립적으로 작용하는 컴포넌트를 구현하는 것은
    꽤 생각을 많이 요구하는 것 같다. 여기서도 벌써 props와 container가 필요하다.
    또한, 리액트를 통한 state가 변해도 다시 리프레쉬를 하면 해당 데이터가 초기화 된다. 이를 저장하는 방법을 강구해야 한다.
    01. 서버에 저장
    02. 로컬 스토리지에 저장
    03. ???

    [내가 생각하는 로직]
    01. 드래그 앤 드랍 이벤트에 드래그 한 데이터 추출
    02. 드랍할 때 그 사이에 변하는 데이터의 순서 변경
    03. 이 값을 드랍 시 dispatch하는 구현법

*/

const Draggable = styled.div`
  & + & {
        border-top: 0.2px solid rgba(45,54,70, 0.5);
    }
`;

const DraggableProfile = (props)=>{
    const {moveRoom, index, id, link} =props;
    const ref = useRef(null);
    const [, drop] = useDrop({
    accept: ItemTypes.ROOM,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      console.log(hoverIndex);
      moveRoom(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
    });
    const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.ROOM, id, index},
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    });
    const opacity = isDragging ? 0 : 1 ;
    drag(drop(ref));
    /*
    스스로 피드백을 고민해 본 결과 이 부분에 뷰만 구상을 하고 HOC를 통해서 드래그앤 드랍 기능을 추가할 수 있지 않았을까?
    이렇게 뷰랑 로직을 분리해야지 스토리북을 사용하는 효과가 있다.
    */
    return(
            <>
              <Draggable ref ={ref} style ={{opacity}}>
                <Link to = {link} style ={{textDecoration: "none", color: "black"}}>
                    <MainProfile {...props}/>
                </Link>
              </Draggable>
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

export default DraggableProfile;