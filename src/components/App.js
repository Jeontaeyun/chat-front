import React from 'react';
import { Main, Room, Login, Signup, CreateRoom } from '../pages';
import { Route } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

const App = () => {
	return (
		<div>
			<Route exact path="/" component={Main} />
			<Route path="/room/:room_id" component={Room} />
			<Route path="/signup" component={Signup} />
			<Route path="/login" component={Login} />
			<Route path="/newRoom" component={CreateRoom} />
		</div>
	);
};

export default App;
