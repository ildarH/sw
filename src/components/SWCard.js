import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Header, Icon, Image, Placeholder } from 'semantic-ui-react';

import { fetchPlanetData } from './../redux/actions';

export const SWCard = ({ person, onClick, isFavorited, isDisabled }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const selectPlanet = useSelector((state) => state.root.planet);

  useEffect(() => {
    dispatch(fetchPlanetData(person.homeworld));
    setLoading(false);
  }, [person, dispatch]);

  return (
    <Card raised>
      {loading ? (
        <Placeholder>
          <Placeholder.Image rectangular />
        </Placeholder>
      ) : (
        <Image src={person.pictureUrl} size='medium' />
      )}

      <Card.Content>
        {loading ? (
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line length='medium' />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length='long' />
              <Placeholder.Line length='long' />
              <Placeholder.Line length='long' />
            </Placeholder.Paragraph>
          </Placeholder>
        ) : (
          <>
            <Card.Header>
              <Header as='h2'>{person.name}</Header>
            </Card.Header>
            <Card.Description>
              {person.name} was born on {selectPlanet.name} which population is{' '}
              {selectPlanet.population} and climate is {selectPlanet.climate}. Gravity is{' '}
              {selectPlanet.gravity}. Terrain is {selectPlanet.terrain}.
            </Card.Description>
          </>
        )}
      </Card.Content>
      <Card.Content extra>
        <Button icon onClick={() => onClick(person)} disabled={loading || isDisabled}>
          <Icon name='heart' color={isFavorited ? 'red' : 'black'} />
        </Button>
      </Card.Content>
    </Card>
  );
};
