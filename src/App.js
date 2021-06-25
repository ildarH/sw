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
} from './redux/actions';

import { Navbar, Main, Favorites } from './components';

const filter = (people, gender) => {
  const filteredPeople = [...people]
  if(!gender || gender === undefined) {
    return filteredPeople
  } else {
    return filteredPeople.filter(person => person.gender === gender)
  }
}

function App() {
  const dispatch = useDispatch();
  const [filterCondition, setFilterCondition] = useState('')
  const [filteredPeople, setFilteredPeople] = useState([])
  const currentPage = useSelector((state) => state.root.currentPage);
  const loading = useSelector((state) => state.root.isLoading);
  const selectPeople = useSelector((state) => state.root.people);
  const selectSearchResponse = useSelector((state) => state.root.searchResponse);
  const selectFavorites = useSelector((state) => state.root.favorites);
  const selectId = useSelector((state) => state.root.id);
  const selectTotalPages = useSelector((state) => state.root.totalPage);
  const genderVariations = [...new Set(selectPeople.map(person => person.gender))].map((el, i) => {
    return {
      key: i,
      text: el,
      value: el
    }
  })

  useEffect(() => {
    dispatch(fetchPeopleData(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    setFilteredPeople(filter(selectPeople, filterCondition))
  }, [filterCondition, selectPeople])

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
    setFilterCondition(condition)
  }

  return (
    <>
      <BrowserRouter>
        <Navbar
          onSearch={searchHandler}
          clearResult={clearSearchHandler}
          isResult={!!selectSearchResponse ? true : false}
          filterHandler={filterHandler}
          genderVariations={genderVariations}
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
                  activePage={currentPage}
                  totalPages={selectTotalPages}
                  onPageChange={(e, { activePage }) => dispatch(setCurrentPage(activePage))}
                />
                <Main
                  people={selectSearchResponse ? selectSearchResponse : filteredPeople}
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
