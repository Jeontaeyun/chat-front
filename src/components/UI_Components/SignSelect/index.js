import React, { Fragment, useState, useCallback, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

const boxFade = keyframes`
  0% {
    opacity: 0;
  };
  15% {
    opacity: 1;
  };
`;

const ListContainer = styled.ul`
	position: absolute;
	top: -2.3rem;
	width: 100%;
	background: white;
	padding: 2rem 0rem;

	list-style-type: none;
	border-radius: 0.4rem;
	/*ul 태그에는 패딩이 기본적으로 40px들어가 있어 이를 수정해주어야 한다.*/
	padding-left: 0;
	z-index: 100;
	animation: ${boxFade} 2s 1s linear alternate;
	box-shadow: 0.01rem 0.01rem 0.8rem 0.01rem #2d3646;
`;
const List = styled.li`
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;

	width: 100%;
	margin: 0 0;
	text-align: center;
	&:hover {
		transition: background 0.3s ease-in-out;
		color: white;
		background: #2d3646;
	}
	cursor: pointer;

	& + & {
		border-top: 0.2px solid rgba(45, 54, 70, 0.5);
	}
`;

const Container = styled.div`
	display: block;
	position: relative;
	width: 80%;
	margin: 0 auto;
`;

const Title = styled.div`
	position: relative;
	width: 100%;
	border-bottom: 1px solid #2d3646;
	font-size: 1rem;
	color: #2d3646;
	@media (max-width: 500px) {
		font-size: 0.8rem;
	}
`;

const SelectButton = styled.div`
	display: inline-block;
	position: absolute;
	width: 10px;
	height: 10px;
	background: url('/sendicon.svg');
	background-size: contain;
	transform: rotate(90deg);
	bottom: 0.5rem;
	right: 0.5rem;
	cursor: pointer;
`;
const Label = styled.div`
	display: block;
	height: 1.4rem;
	position: relative;
	color: ${(props) => (props.selectValue || props.onList ? '#FF7A9B' : '#2d3646')};
	font-weight: ${(props) => (props.selectValue || props.onList ? '600' : null)};
	${(props) => (props.selectValue || props.onList) && 'transition: font-size 0.2s ease-in ; font-size: 0.8rem'};
`;

const ValueContainer = styled.div`
	font-weight: 400;
	height: 1.4rem;
`;

const SignSelector = (props) => {
	const { list, label } = props;
	const [ selectValue, setSelectValue ] = useState('');
	const [ onList, setOnList ] = useState(false);
	const onSelectValue = useCallback(
		(item) => (e) => {
			setOnList(false);
			setSelectValue(item);
		},
		[ onList, setSelectValue ]
	);
	const onClickList = useCallback(
		(e) => {
			setOnList(true);
		},
		[ onList ]
	);
	const selectList = useMemo(
		() =>
			list.map((item, idx) => (
				<List key={idx} onClick={onSelectValue(item)}>
					{item}
				</List>
			)),
		[ onList ]
	);
	return (
		<Fragment>
			<Container>
				<Title>
					<Label selectValue={selectValue} onList={onList}>
						{label}
					</Label>
					{selectValue && <ValueContainer>{selectValue}</ValueContainer>}{' '}
					<SelectButton onClick={onClickList} />
				</Title>
				<input type="hidden" value={selectValue} />

				{onList && <ListContainer active={onList}>{selectList}</ListContainer>}
			</Container>
		</Fragment>
	);
};

SignSelector.defaultProps = {
	list: [],
	label: 'label'
};

export default SignSelector;
