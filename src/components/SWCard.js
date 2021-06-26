import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Accordion, Button, Card, Header, Icon, Image, Placeholder } from 'semantic-ui-react';

import { fetchPlanetData } from './../redux/actions';

export const SWCard = ({ person, onClick, isFavorited, isDisabled }) => {

  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(-1);
  const dispatch = useDispatch();

  useEffect(() => {
    const {planet} = person
    if(planet?.name || null) {
      setLoading(false)
    }
  },[person])

  const handleClick = (e, titleProps) => {
    const {planet} = person
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
    
    if(Object.keys(planet).length === 0 && planet.constructor === Object) {
      dispatch(fetchPlanetData(person.planetUrl));
    }
    
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
              {loading ? (
                <Placeholder>
                  <Placeholder.Paragraph>
                    <Placeholder.Line length='medium' />
                    <Placeholder.Line length='long' />
                    <Placeholder.Line length='short' />
                  </Placeholder.Paragraph>
                </Placeholder>
              ) : (
                <p>
                  {person.name} was born on {person.planet.name} which population is{' '}
                  {person.planet.population} and climate is {person.planet.climate}. Gravity is{' '}
                  {person.planet.gravity}. Terrain is {person.planet.terrain}.
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
