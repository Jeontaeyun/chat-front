import React, {useRef} from 'react';
import {useDrag, useDrop} from 'react-dnd';
import styled from 'styled-components';
import ItemTypes from './ItemTypes';
import {Link} from 'react-router-dom';

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
    const {title, varibleNumber, id, master, moveRoom, index, link} = props;
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
    return(
            <>
            <Link style= {{textDecoration: 'none', color: 'black'}} to = {link}>
                <Frame ref={ref} style={{opacity}} >
                    <Profile {...props}></Profile>
                    <RoomTitle>{title}</RoomTitle>
                    <InfoContiner>
                        <Info>{`${varibleNumber}명`}</Info>
                        <Info>{`${master}이 만든 방`}</Info>
                    </InfoContiner>
                </Frame>
            </Link>
            </>
    );
};
// Component Default Props
MainProfile.defaultProps = {
    title: "채팅방 이름입니다.",
    src: false,
    varibleNumber: 0,
    master: "Stark",
    draggable: true
};

export default MainProfile;