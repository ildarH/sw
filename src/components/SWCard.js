import React from 'react';
import { Button, Card, Header, Image } from 'semantic-ui-react';

export const SWCard = ({ people, onClick }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Header as='h2'>{people.name}</Header>
        </Card.Header>
        <Card.Description>
          <Image src={people.pictureUrl} />
          <Button icon='heart' onClick={() => onClick(people.id)} />
        </Card.Description>
      </Card.Content>
    </Card>
  );
};
