import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Button, Card, Header, Icon, Image, Placeholder } from 'semantic-ui-react';

import { fetchPlanetData } from './../redux/actions';

export const SWCard = ({ person, onClick, isFavorited, isDisabled }) => {
  const [isInfoLoading, setIsInfoLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(-1);
  const dispatch = useDispatch();
  const selectPlanet = useSelector((state) => state.root.planet);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
    dispatch(fetchPlanetData(person.homeworld));
    setIsInfoLoading(false);
  };

  return (
    <Card raised>
      <Image src={person.pictureUrl} size='medium' />

      <Card.Content>
        <Card.Header>
          <Header as='h2'>{person.name}</Header>
        </Card.Header>
        <Card.Description>
          <Accordion>
            <Accordion.Title active={activeIndex === 0} index={0} onClick={handleClick}>
              <Icon name='dropdown' />
              Подробнее
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              {isInfoLoading ? (
                <Placeholder>
                  <Placeholder.Paragraph>
                    <Placeholder.Line length='medium' />
                    <Placeholder.Line length='long' />
                    <Placeholder.Line length='short' />
                  </Placeholder.Paragraph>
                </Placeholder>
              ) : (
                <p>
                  {person.name} was born on {selectPlanet.name} which population is{' '}
                  {selectPlanet.population} and climate is {selectPlanet.climate}. Gravity is{' '}
                  {selectPlanet.gravity}. Terrain is {selectPlanet.terrain}.
                </p>
              )}
            </Accordion.Content>
          </Accordion>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button icon onClick={() => onClick(person)} disabled={isDisabled}>
          <Icon name='heart' color={isFavorited ? 'red' : 'black'} />
        </Button>
      </Card.Content>
    </Card>
  );
};
