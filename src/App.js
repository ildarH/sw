import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container, Dimmer, Loader } from 'semantic-ui-react';

import { fetchPeopleData, addToFavorites, removeFromFavorites } from './redux/actions';

import { Navbar, Main, Favorites } from './components';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const selectPeople = useSelector(state => state.root.people)
  const selectFavorites = useSelector((state) => state.root.favorites);
  const selectId = useSelector((state) => state.root.id);

  useEffect(() => {
    dispatch(fetchPeopleData())
    setLoading(false);
  }, [dispatch]);

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
                <Main people={selectPeople} id={selectId} addToFavoritesHandler={addToFavoritesHandler} />
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
