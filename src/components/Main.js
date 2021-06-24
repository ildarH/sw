import React from 'react';
import { Button, Card, Grid, Image } from 'semantic-ui-react';

export const Main = ({ people }) => {
  return (
    <>
      <h1>People</h1>
      <Grid columns={2}>
        {people.map((people, i) => {
          return (
            <Grid.Column key={i}>
              <Card>
                <Card.Content>
                  <Card.Content>
                    <Card.Header>{people.name}</Card.Header>
                    <Card.Description>
                      {people.homeworld}
                      {/* <Image src /> */}
                      <Button icon='heart' />
                    </Card.Description>
                  </Card.Content>
                </Card.Content>
              </Card>
            </Grid.Column>
          );
        })}
      </Grid>
    </>
  );
};
