import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import CreateCard from './components/create-card.component';
import CardsList from './components/cards-list.component';

import Login from './container/Login/Login';
import Lobby from './container/Lobby/Lobby';
import Room from './container/Room/Room';

function App() {
  return (
    <Router>
      {/* <Route path="/" exact component={}/> */}
      <Route path="/cards" exact component={CardsList}/>
      <Route path="/cards/create" exact component={CreateCard}/>

      {/* Routes to check UI containers */}
      <Route path='/login' exact component={Login}/>
      <Route path='/lobby' exact component={Lobby}/>
      <Route path='/room' exact component={Room}/>
      
    </Router>
  );
}

export default App;
