import React, { Fragment, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Button from '../Button';

const Background = styled.div`
	background: rgba(45, 54, 70, 0.5);
	opacity: 0.4;
	width: 100%;
	height: 100%;
	z-index: 100;
	position: absolute;
	top: 0;
	left: 0;
`;

const Container = styled.div`
	background: white;
	width: 30rem;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 200;
	padding-top: 2rem;
	padding-bottom: 1rem;
	text-align: center;
	border-radius: 0.5rem;
	@media (max-width: 700px) {
		width: 20rem;
	}
	word-break: break-all;
`;

const Xbutton = styled.div`
	position: absolute;
	z-index: 300;
	right: 1rem;
	bottom: 0.3rem;
	cursor: pointer;
`;

const Content = styled.div`
	display: block;
	padding: 0 2rem;
	margin-top: 1rem;
`;
const ModalHead = styled.div`
	position: relative;
	border-bottom: 1px solid;
	margin-bottom: 1rem;
`;

const PositionButton = styled(Button)`
    margin-top: 2rem;
    `;

const Modal = (props) => {
	const { children, view, onAction, checkMessage } = props;
	const [ stateview, setStateview ] = useState(view);
	useEffect(
		() => {
			if (view) setStateview(true);
			else setStateview(false);
		},
		[ view ]
	);
	const onHide = useCallback(
		(e) => {
			setStateview(false);
		},
		[ stateview ]
	);
	return (
		<Fragment>
			{stateview && (
				<Fragment>
					<Background onClick={onHide} />
					<Container>
						<ModalHead>
							<Xbutton onClick={onHide}>X</Xbutton>
						</ModalHead>
						<Content>{children}</Content>
						<PositionButton onClick={onAction}>{checkMessage}</PositionButton>
					</Container>
				</Fragment>
			)}
		</Fragment>
	);
};

Modal.defaultProps = {
	view: true,
	checkMessage: '확인',
	children: '모달 내용'
};

export default Modal;
