import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { SWCard } from './SWCard';

export const Main = ({ people, addToFavoritesHandler }) => {

  const onClick = (person) => {
    addToFavoritesHandler(person);
  }
  return (
    <>
      <Header as='h1'>People</Header>
      <Grid columns={2}>
        {people.map((person, i) => {
          return (
            <Grid.Column key={i}>
              <SWCard person={person} onClick={onClick}/>
            </Grid.Column>
          );
        })}
      </Grid>
    </>
  );
};
