import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container, Dimmer, Loader } from 'semantic-ui-react';

import {
  fetchPeopleData,
  addToFavorites,
  removeFromFavorites,
  searchRequest,
  clearResult,
} from './redux/actions';

import { Navbar, Main, Favorites } from './components';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const selectPeople = useSelector((state) => state.root.people);
  const selectSearchResponse = useSelector((state) => state.root.searchResponse);
  const selectFavorites = useSelector((state) => state.root.favorites);
  const selectId = useSelector((state) => state.root.id);

  useEffect(() => {
    dispatch(fetchPeopleData());
    setLoading(false);
  }, [dispatch]);

  const addToFavoritesHandler = (person) => {
    dispatch(addToFavorites(person));
  };
  const removeFromFavoritesHandler = (person) => {
    dispatch(removeFromFavorites(person.id));
  };
  const searchHandler = (request) => {
    dispatch(searchRequest(request));
  };
  const clearSearchHandler = () => {
    dispatch(clearResult());
  };

  return (
    <>
      <BrowserRouter>
        <Navbar onSearch={searchHandler} 

          clearResult={clearSearchHandler}
          isResult={!!selectSearchResponse ? true : false}
        />
        <Container>
          {loading ? (
            <Dimmer active inverted>
              <Loader inverted>Loading...</Loader>
            </Dimmer>
          ) : (
            <Switch>
              <Route exact path='/'>
                <Main
                  people={selectSearchResponse ? selectSearchResponse : selectPeople}
                  id={selectId}
                  title={selectSearchResponse ? 'Результат поиска' : 'Персонажи'}
                  addToFavoritesHandler={addToFavoritesHandler}

                />
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
