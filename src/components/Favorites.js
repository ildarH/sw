import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { SWCard } from './SWCard';

export const Favorites = ({ people, onDelete }) => {

  return (
    <>
      <Header as='h1'>Favorites</Header>
      {people.length ? (
        <Grid columns={2}>
        {people.map((person, i) => {
          return (
            <Grid.Column key={i}>
              <SWCard person={person} onClick={onDelete} />
            </Grid.Column>
          );
        })}
      </Grid>
      ) : (
        <p>Пока никого нет </p>
      )}
      
    </>
  );
};
