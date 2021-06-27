import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Accordion,
  Button,
  Card,
  Header,
  Icon,
  Image,
  Message,
  Placeholder,
  Divider,
} from 'semantic-ui-react';

export const SWCard = ({ person, onClick, isFavorited, isDisabled, planetLoadingHandler }) => {
  const isPlanetLoading = useSelector((state) => state.planet.isPlanetLoading);
  const planetError = useSelector((state) => state.planet.planetError);
  const filterPlanet =
    useSelector((state) =>
      state.planet.planet.find((planet) => planet.planetUrl === person.planetUrl),
    ) || null;
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
    if (!filterPlanet) {
      planetLoadingHandler(person.planetUrl);
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
              {isPlanetLoading ? (
                <Placeholder>
                  <Placeholder.Paragraph>
                    <Placeholder.Line length='full' />
                    <Placeholder.Line length='full' />
                    <Placeholder.Line length='full' />
                    <Placeholder.Line length='long' />
                  </Placeholder.Paragraph>
                </Placeholder>
              ) : planetError ? (
                <>
                  <Message negative compact>
                    <Message.Content>
                      <p>{planetError}</p>
                      <Divider />
                      <Button compact icon onClick={() => planetLoadingHandler(person.planetUrl)}>
                        <Icon name='redo' />
                      </Button>
                    </Message.Content>
                  </Message>
                </>
              ) : (
                filterPlanet && (
                  <p>
                    {person.name} was born on {filterPlanet.name} which population is{' '}
                    {filterPlanet.population} and climate is {filterPlanet.climate}. Gravity is{' '}
                    {filterPlanet.gravity}. Terrain is {filterPlanet.terrain}.
                  </p>
                )
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
