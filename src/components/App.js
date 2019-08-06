import React from 'react';
import {Main, Room} from '../pages';
import {Route} from 'react-router-dom';

const App = ()=>{
  return (
    <div>
        <Route exact path = '/' component = {Main}/> 
        <Route path = '/room/:room_id' component = {Room}/>
    </div>
  );
}

export default App;
