import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import CreateCard from './components/create-card.component';
import CardsList from './components/cards-list.component';

import Login from './container/Login/Login';
import Lobby from './container/Lobby/Lobby';
import Room from './container/Room/Room';
import CreateRoom from './container/CreateRoom/CreateRoom';

import { connect } from 'react-redux';

function App() {
  return (
    <Router>
      {/* <Route path="/" exact component={}/> */}
      <Route path="/cards" exact component={CardsList}/>
      <Route path="/cards/create" exact component={CreateCard}/>

      {/* Routes to check UI containers */}
      <Route path='/login' exact component={Login}/>
      <Route path='/room' exact component={Room}/>
      <Route path='/create' exact component={CreateRoom}/>
      <Route path='/' exact component={Lobby}/>
    </Router>
  );
}

export default connect() (App);
