import React from 'react';
import { Button, Card, Grid, Header, Image } from 'semantic-ui-react';

export const Main = ({ people }) => {
  return (
    <>
      <Header as="h1">People</Header>
      <Grid columns={2}>
        {people.map((people, i) => {
          return (
            <Grid.Column key={i}>
              <Card>
                <Card.Content>
                  
                    <Card.Header>
                    <Header as='h2'>
                    {people.name}
                    </Header>
                    </Card.Header>
                    <Card.Description>
                      <Image src={people.pictureUrl} />
                      <Button icon='heart' />
                    </Card.Description>
                  
                </Card.Content>
              </Card>
            </Grid.Column>
          );
        })}
      </Grid>
    </>
  );
};
