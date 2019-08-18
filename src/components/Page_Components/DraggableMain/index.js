import React, { useCallback, useState, Fragment } from 'react';
import DraggbaleProfile from '../DraggableProfile';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

const DraggableMain = (props) => {
	const [ rooms, setRooms ] = useState([
		{ _id: 1, title: '태윤이와 함께하는 카카오톡', owner: 'Stark', max: 7 },
		{ _id: 2, title: '오랜만이야', owner: 'Jaina', max: 7 },
		{ _id: 3, title: '함께 채팅해요', owner: 'Stark', max: 7 }
	]);
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
			<DndProvider backend={HTML5Backend}>
				{/*react-dnd 라이브러리를 이용할 때 반드시 map에 index를 넣어주어야 한다.*/}
				{rooms.map((item, index) => (
					<DraggbaleProfile
						id={item._id}
						title={item.title}
						key={item._id}
						index={index._id}
						link={`/room/${item._id}`}
						moveRoom={moveRoom}
					/>
				))}
			</DndProvider>
		</Fragment>
	);
};

export default DraggableMain;
