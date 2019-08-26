import React, { useCallback, useState, Fragment, useEffect } from 'react';
import DraggbaleProfile from '../DraggableProfile';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
	overflow-y: scroll;
	height: 100%;
`;

const DraggableMain = (props) => {
	const user = JSON.parse(window.sessionStorage.getItem('localUser'));
	const isLogined = !!user;
	const [ rooms, setRooms ] = useState([]);
	useEffect(() => {
		// useEffect안에서 데이터를 불러오고 싶다면 다음과 같이 하나의 함수로 만들어주고 호출해야한다.
		const fetchData = async () => {
			//withCredentials : true 설정을 해주어야 passport에서 매 요청마다 deserializeUser를 해준다.
			const result = await axios.get(`/api/room`, {withCredentials: true});
			setRooms(result.data);
		};
		fetchData();
	}, []);
	const moveRoom = useCallback(
		(dragIndex, hoverIndex) => {
			const dragRoom = rooms[dragIndex];
			setRooms(
				update(rooms, {
					$splice: [ [ dragIndex, 1 ], [ hoverIndex, 0, dragRoom ] ]
				})
			);
		},
		[ rooms ]
	);

	return (
		<Fragment>
			<Container>
				<DndProvider backend={HTML5Backend}>
					{/*react-dnd 라이브러리를 이용할 때 반드시 map에 index를 넣어주어야 한다.*/}
					{rooms.map((item, index) => (
						<DraggbaleProfile
							id={item._id}
							title={item.title}
							key={item._id}
							index={index._id}
							link={isLogined && item.max > item.numberUser && `/room/${item._id}`}
							max={item.max}
							moveRoom={moveRoom}
							info={`${item.owner.nickname}이 만든 방${item.password && '(비밀방)'}`}
							password={item.password}
							isLogined={isLogined}
							numberUser={item.numberUser}
							profile={item.owner.profile}
						/>
					))}
				</DndProvider>
			</Container>
		</Fragment>
	);
};

export default DraggableMain;
