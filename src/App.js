import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container, Dimmer, Loader, Pagination } from 'semantic-ui-react';

import {
  fetchPeopleData,
  addToFavorites,
  removeFromFavorites,
  searchRequest,
  clearResult,
  setCurrentPage,
} from './redux/actions';

import { Navbar, Main, Favorites } from './components';

function App() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.root.currentPage);
  const loading = useSelector((state) => state.root.isLoading);
  const selectPeople = useSelector((state) => state.root.people);
  const selectSearchResponse = useSelector((state) => state.root.searchResponse);
  const selectFavorites = useSelector((state) => state.root.favorites);
  const selectId = useSelector((state) => state.root.id);
  const selectTotalPages = useSelector((state) => state.root.totalPage);

  useEffect(() => {
    dispatch(fetchPeopleData(currentPage));
  }, [dispatch, currentPage]);

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
        <Navbar
          onSearch={searchHandler}
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
                <Pagination
                  // defaultActivePage={1}
                  activePage={currentPage}
                  totalPages={selectTotalPages}
                  onPageChange={(e, { activePage }) => dispatch(setCurrentPage(activePage))}
                />
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
