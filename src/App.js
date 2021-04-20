import './App.css';
import Header from './Header'
import Main from './Main'
import Country from './Country'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <Router>
        <div className="App">
            <Header />
            <Switch>
              <Route path="/" exact>
                <Main />
              </Route>
              <Route path="/:countryCode">
                <Country />
              </Route>
            </Switch>
        </div>
      </Router>
  );
}

export default App;
