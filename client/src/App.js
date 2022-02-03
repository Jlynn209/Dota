import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import DisplayHeroes from './views/DisplayHeroes';
import DisplayHeroStats from './views/DisplayHeroStats';


function App() {

  return(
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <DisplayHeroes/>
          </Route>
          <Route exact path="/hero/:id">
            <DisplayHeroStats/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
