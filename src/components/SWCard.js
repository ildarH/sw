import React from 'react';
import { Button, Card, Header, Image } from 'semantic-ui-react';

export const SWCard = ({ person, onClick }) => {

  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Header as='h2'>{person.name}</Header>
        </Card.Header>
        <Card.Description>
          <Image src={person.pictureUrl} size='medium' />
          <Button icon='heart' onClick={() => onClick(person)} />
        </Card.Description>
      </Card.Content>
    </Card>
  );
};
