import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { SWCard } from './SWCard';

export const Main = ({ people }) => {

  const onClick = (id) => {
    console.log('fav #', id);
  }
  return (
    <>
      <Header as='h1'>People</Header>
      <Grid columns={2}>
        {people.map((people, i) => {
          return (
            <Grid.Column key={i}>
              <SWCard people={people} onClick={onClick}/>
            </Grid.Column>
          );
        })}
      </Grid>
    </>
  );
};
