import React, { useCallback, useState, Fragment } from 'react';
import DraggbaleProfile from '../DraggableProfile';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

const DraggableMain = (props) => {
	const [ rooms, setRooms ] = useState([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]);
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
						id={item}
						title={item}
						key={item}
						index={index}
						link={`/room/${item}`}
						moveRoom={moveRoom}
					/>
				))}
				<DraggbaleProfile />
			</DndProvider>
		</Fragment>
	);
};

export default DraggableMain;
