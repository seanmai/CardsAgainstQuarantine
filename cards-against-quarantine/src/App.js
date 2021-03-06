import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Login from './container/Login/Login';
import Lobby from './container/Lobby/Lobby';
import Room from './container/Room/Room';
import AdminPage from './container/AdminPage/AdminPage';
import CreateRoom from './container/CreateRoom/CreateRoom';
import Chat from './components/Chat/Chat'
import WaitRoom from './container/WaitRoom/WaitRoom'

import { connect } from 'react-redux';

function App() {
  return (
    <Router>
      {/* <Route path="/" exact component={}/> */}

      {/* Routes to check UI containers */}
      <Route path='/login' exact component={Login} />
      <Route path='/admin' exact component={AdminPage} />


      <Route path='/createroom' exact component={CreateRoom} />
      <Route path='/room' exact component={Room} />
      <Route path='/wait' exact component={WaitRoom} />


      <Route path='/' exact component={Lobby} />
      <Route path='/chat-test' exact component={Chat} />
    </Router>
  );
}

export default connect()(App);
