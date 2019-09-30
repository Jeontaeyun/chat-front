import React, { useRef, Fragment, useState, useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styled from 'styled-components';
import ItemTypes from './ItemTypes';
import { Link } from 'react-router-dom';
import MainProfile from '../../UI_Components/MainProfile';
import Modal from '../../UI_Components/Modal';
import SignInput from '../../UI_Components/SignInput';
import { withRouter } from 'react-router-dom';

const DraggableProfile = (props) => {
	const { moveRoom, index, id, link, password, isLogined } = props;
	const ref = useRef(null);
	const [ isModal, setIsModal ] = useState(false);
	const [ roomPassword, setRoomPassword ] = useState('');
	const [ , drop ] = useDrop({
		accept: ItemTypes.ROOM,
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect = ref.current.getBoundingClientRect();
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			console.log(hoverIndex);
			moveRoom(dragIndex, hoverIndex);
			item.index = hoverIndex;
		}
	});
	const [ { isDragging }, drag ] = useDrag({
		item: { type: ItemTypes.ROOM, id, index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging()
		})
	});
	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));

	const handleModal = useCallback(
		(e) => {
			e.stopPropagation();
			setIsModal(!isModal);
		},
		[ isModal ]
	);
	const isAvailablePass = useCallback(
		(e) => {
			const isAvailable = roomPassword === password;
			if (isAvailable) return props.history.push(link + '/true');
			else console.log('다시입력해주세요');
		},
		[ roomPassword, password, props.history, link ]
	);

	/*
    스스로 피드백을 고민해 본 결과 이 부분에 뷰만 구상을 하고 HOC를 통해서 드래그앤 드랍 기능을 추가할 수 있지 않았을까?
    이렇게 뷰랑 로직을 분리해야지 스토리북을 사용하는 효과가 있다.
    */
	return (
		<Fragment>
			<Draggable ref={ref} style={{ opacity }} onClick={handleModal}>
				<Link to={!password ? link : '/'} style={{ textDecoration: 'none', color: 'black' }}>
					<MainProfile {...props} />
				</Link>
				{props.max > props.numberUser &&
				isLogined && (
					<Modal view={isModal} onCancle={handleModal} onAction={isAvailablePass}>
						비밀번호를 입력해주세요
						<SignInput
							label=""
							placeholder="Password"
							type="password"
							value={roomPassword}
							onChange={(e) => {
								setRoomPassword(e.target.value);
							}}
							autoComplate="on"
						/>
					</Modal>
				)}
			</Draggable>
		</Fragment>
	);
};

const Draggable = styled.div`
	& + & {
		border-top: 0.2px solid rgba(45, 54, 70, 0.5);
	}
`;

export default withRouter(DraggableProfile);
