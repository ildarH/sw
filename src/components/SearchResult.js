import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import { SWCard } from './SWCard';

export const SearchResult = ({ people, id, addToFavorites }) => {
  const onClick = (person) => {
    addToFavorites(person);
  };
  return (
    <>
      <Header as='h1'>Результат поиска</Header>
      {people ? (
        <Grid columns={2}>
        {people.map((person, i) => {
          const isFavorited = id.includes(person.id);
          return (
            <Grid.Column key={i}>
              <SWCard
                person={person}
                onClick={onClick}
                isFavorited={isFavorited}
                isDisabled={isFavorited}
              />
            </Grid.Column>
          );
        })}
      </Grid>
      ): (
        <Container>
          Никого не найдено :(
        </Container>
      )}
      
    </>
  );
};
