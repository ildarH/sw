import React, { useEffect, useState } from 'react';
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
  fetchPlanetData,
} from './redux/actions';

import { Navbar, Main, Favorites } from './components';

const filter = (people, gender) => {
  const filteredPeople = [...people];
  if (!gender || gender === undefined) {
    return filteredPeople;
  } else {
    return filteredPeople.filter((person) => person.gender === gender);
  }
};

function App() {
  const dispatch = useDispatch();
  const [filterCondition, setFilterCondition] = useState('');
  const [filteredPeople, setFilteredPeople] = useState([]);
  const isLoading = useSelector((state) => state.people.isPeopleLoading);
  const currentPage = useSelector((state) => state.people.currentPage);
  const selectPeople = useSelector((state) => state.people.people);
  const selectSearchResponse = useSelector((state) => state.people.searchResponse);
  const selectSearchError = useSelector((state) => state.people.searchError)
  const selectFavorites = useSelector((state) => state.people.favorites);
  const selectId = useSelector((state) => state.people.id);
  const selectTotalPages = useSelector((state) => state.people.totalPage);
  const genderVariations = [...new Set(selectPeople.map((person) => person.gender))].map(
    (el, i) => {
      return {
        key: i,
        text: el,
        value: el,
      };
    },
  );

  useEffect(() => {
    dispatch(fetchPeopleData(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    setFilteredPeople(filter(selectPeople, filterCondition));
  }, [filterCondition, selectPeople]);

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
  const filterHandler = (condition) => {
    setFilterCondition(condition);
  };

  const planetLoadingHandler = (planetUrl) => {
    dispatch(fetchPlanetData(planetUrl));
  };

  return (
    <>
      <BrowserRouter>
        <Navbar
          onSearch={searchHandler}
          clearResult={clearSearchHandler}
          isResult={!!selectSearchResponse ? true : false}
          filterHandler={filterHandler}
          genderVariations={genderVariations}
          searchError={selectSearchError}
        />
        <Container>
          {isLoading ? (
            <Dimmer active inverted>
              <Loader inverted>Loading...</Loader>
            </Dimmer>
          ) : (
            <Switch>
              <Route exact path='/'>
                <Pagination
                  activePage={currentPage}
                  totalPages={selectTotalPages}
                  onPageChange={(e, { activePage }) => dispatch(setCurrentPage(activePage))}
                />
                <Main
                  people={selectSearchResponse ? selectSearchResponse : filteredPeople}
                  id={selectId}
                  searchError={selectSearchError}
                  title={selectSearchResponse ? 'Результат поиска' : 'Персонажи'}
                  addToFavoritesHandler={addToFavoritesHandler}
                  planetLoadingHandler={planetLoadingHandler}
                />
              </Route>
              <Route exact path='/favorites'>
                <Favorites
                  people={selectFavorites}
                  // planets={selectPlanets}
                  onDelete={removeFromFavoritesHandler}
                  planetLoadingHandler={planetLoadingHandler}
                />
              </Route>
            </Switch>
          )}
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
