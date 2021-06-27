import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { SWCard } from './SWCard';

export const Main = ({
  people,
  id,
  addToFavoritesHandler,
  title,
  planetLoadingHandler,
  searchError,
}) => {
  const onClick = (person) => {
    addToFavoritesHandler(person);
  };

  return (
    <>
      <Header as='h1'>{title}</Header>
      {people.length > 0 && !searchError ? (
        <Grid columns={2}>
          {people.map((person, i) => {
            const isFavorited = id.includes(person.id);
            return (
              <Grid.Column key={i}>
                <SWCard
                  key={person.id}
                  person={person}
                  onClick={onClick}
                  isFavorited={isFavorited}
                  isDisabled={isFavorited}
                  planetLoadingHandler={planetLoadingHandler}
                />
              </Grid.Column>
            );
          })}
        </Grid>
      ) : (
        <p>Никого не найдено</p>
      )}
    </>
  );
};
