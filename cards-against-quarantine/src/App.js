import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import CreateCard from './components/create-card.component';
import CardsList from './components/cards-list.component';



function App() {
  return (
    <Router>
      {/* <Route path="/" exact component={}/> */}
      <Route path="/cards" exact component={CardsList}/>
      <Route path="/cards/create" exact component={CreateCard}/>
    </Router>
  );
}

export default App;
