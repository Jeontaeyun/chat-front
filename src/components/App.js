import React from 'react';
import { Main, Room, Login, Signup } from '../pages';
import { Route } from 'react-router-dom';

const App = () => {
	return (
		<div>
			<Route exact path="/" component={Main} />
			<Route path="/room/:room_id" component={Room} />
			<Route path="/signup" component={Signup} />
			<Route path="/login" component={Login} />
		</div>
	);
};

export default App;
