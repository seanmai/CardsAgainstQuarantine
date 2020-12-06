import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Login from './container/Login/Login';
import Lobby from './container/Lobby/Lobby';
import Room from './container/Room/Room';
import AdminPage from './container/AdminPage/AdminPage';

function App() {
  return (
    <Router>
      {/* <Route path="/" exact component={}/> */}

      {/* Routes to check UI containers */}
      <Route path='/login' exact component={Login}/>
      <Route path='/lobby' exact component={Lobby}/>
      <Route path='/room' exact component={Room}/>
      <Route path='/admin' exact component={AdminPage}/>
      
    </Router>
  );
}

export default App;
