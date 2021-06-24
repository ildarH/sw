import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Header, Icon, Image, Loader } from 'semantic-ui-react';
import { Http } from '../api/https';

export const SWCard = ({ person, onClick, isFavorited, isDisabled }) => {
  const [loading, setLoading] = useState(true);
  const [planet, setPlanet] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const planetResponse = await Http.get(person.homeworld);
      console.log('person.homeworld: ', person.homeworld);
      console.log('planetResponse: ', planetResponse);
      // const res = planetResponse.results.map((planet, i) => {
      //   return {
      //     name: planet.name,
      //     population: planet.population,
      //     climate: planet.climate,
      //     gravity: planet.gravity,
      //   };
      // });
      setPlanet({
        name: planetResponse.name,
        population: planetResponse.population,
        climate: planetResponse.climate,
        gravity: planetResponse.gravity,
      });
    };
    fetchData();
    setLoading(false);
  }, []);
  return (
    <Card raised>
      <Image src={person.pictureUrl} size='medium' />
      <Card.Content>
        <Card.Header>
          <Header as='h2'>{person.name}</Header>
        </Card.Header>
        <Card.Description>
          {loading ? (
            <Loader inverted size='medium' />
          ) : (
            <Container>
              {person.name} was born on {planet.name} wich population is {planet.population} and
              climate {planet.climate}. Gravity is {planet.gravity}
            </Container>
          )}
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
