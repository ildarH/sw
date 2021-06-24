import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container, Dimmer, Loader } from 'semantic-ui-react';

import { Http } from './api/https';
import { addToFavorites, removeFromFavorites } from './redux/actions'

import { Navbar, Main, Favorites } from './components';


function App() {
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState([]);
  const dispatch = useDispatch()
  const selectFavorites = useSelector(state => state.root.favorites)

  console.log('selectFavorites: ', selectFavorites)

  useEffect(() => {
    const fetchPeople = async () => {
      const apiResponse = await Http.get('people', 'info');
      console.log(apiResponse);
      const res = apiResponse.results.map((people, i) => {
        const characterId = people.url.split('/').slice(-2).join('')
        return {
          id: characterId,
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

  const addToFavoritesHandler = (people) => {
    dispatch(addToFavorites(people))
  }
  const removeFromFavoritesHandler = (id) => {
    dispatch(removeFromFavorites(id))
  }

  
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
              <Main people={people} addToFavoritesHandler={addToFavoritesHandler} />
            </Route>
            <Route exact path='/favorites'>
              <Favorites people={selectFavorites} removeFromFavoritesHandler={removeFromFavoritesHandler} />
            </Route>
          </Switch>
          )}

        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
