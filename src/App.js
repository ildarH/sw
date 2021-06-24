import React, { useState, useEffect} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container, Dimmer, Loader } from 'semantic-ui-react';

import { Http } from './api/https';

import { Navbar, Main, Favorites } from './components';


function App() {
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      const apiResponse = await Http.get('people', 'info');
      console.log(apiResponse);
      const res = apiResponse.results.map((people, i) => {
        const characterId = people.url.split('/').slice(-2).join('')
        return {
          gender: people.gender,
          homeworld: people.homeworld,
          name: people.name,
          pictureUrl: `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`
        }
      })
      console.log('filtred response: ', res);
      setPeople(res);
    };
    fetchPeople();
    setLoading(false);
  }, []);

  
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Container>
          {loading ? (
            <Dimmer active inverted>
              <Loader inverted>Loading...</Loader>
            </Dimmer>
          ) : (
            <Switch>
            <Route exact path='/'>
              <Main people={people} />
            </Route>
            <Route exact path='/favorites'>
              <Favorites />
            </Route>
          </Switch>
          )}

        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
