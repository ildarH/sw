import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { Http } from './api/http';

import { Navbar, Main, Favorites } from './components';

function App() {
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      let result = await Http.get('people');
      console.log(result);
      setPeople(result.results);
    };
    fetchPeople();
    setLoading(false);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Container>
          <Switch>
            <Route exact path='/'>
              <Main />
            </Route>
            <Route exact path='/favorites'>
              <Favorites />
            </Route>
          </Switch>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
