import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container, Dimmer, Loader } from 'semantic-ui-react';

import { Http } from './api/https';
import { addToFavorites, removeFromFavorites } from './redux/actions';

import { Navbar, Main, Favorites } from './components';

function App() {
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState([]);
  const dispatch = useDispatch();
  const selectFavorites = useSelector((state) => state.root.favorites);
  const selectId = useSelector((state) => state.root.id);

  console.log('selectFavorites: ', selectFavorites);
  console.log('selectId: ', selectId);

  useEffect(() => {
    const fetchData = async () => {
      const peopleResponse = await Http.get('people', 'info');
      // console.log(peopleResponse);
      const res = peopleResponse.results.map((people, i) => {
        const characterId = people.url.split('/').slice(-2).join('');
        const homeworld = people.homeworld.split('/').slice(-3).join('/')
        // console.log('homeworld: ', homeworld);
        return {
          id: characterId,
          gender: people.gender,
          homeworld,
          name: people.name,
          pictureUrl: `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`,
        };
      });
      console.log('filtred response: ', res);
      setPeople(res);
    };
    fetchData();
    setLoading(false);
  }, []);

  const addToFavoritesHandler = (person) => {
    dispatch(addToFavorites(person));
  };
  const removeFromFavoritesHandler = (person) => {
    dispatch(removeFromFavorites(person.id));
  };

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
                <Main people={people} id={selectId} addToFavoritesHandler={addToFavoritesHandler} />
              </Route>
              <Route exact path='/favorites'>
                <Favorites people={selectFavorites} onDelete={removeFromFavoritesHandler} />
              </Route>
            </Switch>
          )}
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
