import React, { Fragment, useRef, useCallback, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ImageAdder = (props) => {
	const { title, onChange } = props;
	const imageInput = useRef(null);
	const [ imageURL, setImageURL ] = useState('');
	const handleImageUpload = useCallback(() => {
		imageInput.current.click();
	}, []);
	const handleChangeImage = useCallback(
		async (e) => {
			const imageFormData = new FormData();
			const { files } = e.target;
			// 프로필 여러개 넣을 상황 방지
			if (files.length > 1) {
				return alert('파일을 하나만 넣어주세요');
			}
			imageFormData.append('image', files[0]);
			const result = await axios.post('http://localhost:9000/img', imageFormData);
			setImageURL(result.data.url);
			onChange(result.data.url);
		},
		[ onChange ]
	);
	return (
		<Fragment>
			<Background url={imageURL}>
				<ViewProfile onClick={handleImageUpload}>+</ViewProfile>
				<input type="file" multiple hidden ref={imageInput} onChange={handleChangeImage} />
			</Background>
			<Title>{title}</Title>
		</Fragment>
	);
};

ImageAdder.defaultProps = {
	title: '프로필'
};

const basicProfile = '/basicProfile.jpg';

const Background = styled.div`
	height: 18rem;
	width: 18rem;
    background: url('${(props) => (props.url ? `http://localhost:9000/${props.url}` : basicProfile)}');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
	border-radius: 50%;
	display: block;
	margin: 0 auto;
`;
const ViewProfile = styled.div`
	height: 100%;
	width: 100%;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 3rem;
	color: white;
	opacity: 0;
	:hover {
		opacity: 0.3;
		background: black;
	}
`;
const Title = styled.div`
	font-weight: 700;
	margin: 0 auto;
	text-align: center;
	margin-top: 1rem;
`;

export default ImageAdder;
