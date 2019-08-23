import React, { Component, Fragment } from 'react';
import ChattingInput from '../../components/UI_Components/ChattingInput';
import RoomPage from '../../components/Page_Components/RoomPage';
import io from 'socket.io-client';
import RouterLayout from '../../components/Page_Components/RouterLayout';
import axios from 'axios';
import Modal from '../../components/UI_Components/Modal';
import SignInput from '../../components/UI_Components/SignInput';
import { withRouter } from 'react-router-dom';
import { RotateSpinner } from 'react-spinners-kit';

class Room extends Component {
	constructor() {
		super();
		this.handleSend = async (text) => {
			// 비밀번호 걸려 있으면 아무 것도 못하게 하는 코드
			if (this.state.room.password) return;
			// 큐 자료구조를 이용하여 같은 말을 3번 반복했을 때 20 초간 채팅 금지 구현
			let isRepeat = this.state.checkArray[0] && this.state.checkArray[0] === this.state.checkArray[1] && this.state.checkArray[1] === this.state.checkArray[2];
			if(isRepeat){
				let timer = 20;
				alert(`반복적으로 같은 메세지를 보낼 경우 채팅이 ${timer}초간 금지됩니다.`);
				setTimeout(()=>{
					timer= 20;
					return this.state.checkArray = [];
				},20000);
				return;
			}else{
				this.state.checkArray.push(text);
				if(this.state.checkArray.length>3){
				this.state.checkArray.shift();
				}
			}
			

			const { room_id } = this.props.match.params;
			const user = JSON.parse(window.sessionStorage.getItem('localUser'));
			await axios.post(`api/room/${room_id}/chat`, { user, chat: text }, { withCredentials: true });
			this.state.socket.emit('send', { chat: text, _id: user._id, nickname: user.nickname });
		};
		this.state = {
			checkArray: [],
			chats: [],
			room: {},
			roomPassword: '',
			socket: null,
			loading: true
		};
	}

	componentWillMount() {
		const { room_id, visible } = this.props.match.params;
		this.setState({ socket: io.connect('http://localhost:8000/chat', { path: '/socket.io' }) });
		// 소켓 통신 이저너에 먼저 데이터 베이스에 저장된 chats를 호출한다.
		const fetchRoom = async () => {
			const { data } = await axios.get(`/api/room/${room_id}/`, { withCredentials: true });
			const filteredData = Object.assign({}, { ...data });
			if (visible === 'true') {
				filteredData.password = '';
			}
			this.setState({ room: filteredData });
		};
		const fetchChat = async () => {
			const { data } = await axios.get(`/api/room/${room_id}/chat`, { withCredentials: true });
			this.setState({ chats: this.state.chats.concat(data) });
			setTimeout(() => {
				this.setState({ loading: false });
			}, 1000);
		};
		fetchRoom();
		fetchChat();
	}
	// 이렇게 구현을 해주어 해당 컴포넌트가 있을 때만 해당 소켓으로 통신할 수 있게 해준다.
	componentDidMount() {
		this.state.socket.on('chat', (data) => {
			this.setState({
				chats: [ ...this.state.chats, data ]
			});
		});
		// URL 형식을 바꾸는 방법은 어떤 것일 까?
	}
	componentDidUpdate(nextProps, nextState) {
		return nextState.chats !== this.state.chats;
	}

	onAction() {
		const isAvailablePass = this.state.roomPassword === this.state.room.password;
		if (isAvailablePass) return this.setState({ room: { ...this.state.room, password: '' } });
		else return;
	}

	render() {
		const { handleSend } = this;
		const { chats } = this.state;
		return (
			<Fragment>
				<RouterLayout
					title={this.state.room.title}
					content={
						<Fragment>
							{this.state.loading && (
								<div
									style={{
										width: '100%',
										height: '100%',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center'
									}}
								>
									<RotateSpinner loading={this.state.loading} color="#ff7a9b" />
								</div>
							)}
							<RoomPage chats={chats} />
							<Modal view={this.state.room.password} onAction={this.onAction.bind(this)}>
								{/*클래스 컴포넌트에서 state를 바꾸고 싶은데 프롭스로 상속한다면 this를 바인딩 해주어야 한다. 서로의 this가 다르다.*/}
								비밀번호를 입력해주세요
								<SignInput
									label=""
									placeholder="Password"
									type="password"
									value={this.state.roomPassword}
									onChange={(e) => {
										this.setState({ roomPassword: e.target.value });
									}}
									autoComplate="on"
								/>
							</Modal>
						</Fragment>
					}
					info={<ChattingInput onSend={handleSend} />}
					backActionClick={() => {
						this.state.socket.disconnect();
						this.props.history.push('/');
					}}
				/>
			</Fragment>
		);
	}
}

export default withRouter(Room);
