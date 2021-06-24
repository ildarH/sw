import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { SWCard } from './SWCard';

export const Favorites = ({ people, onDelete }) => {
	return (
		<>
			<Header as='h1'>People</Header>
			<Grid columns={2}>
				{people.map((people, i) => {
					return (
						<Grid.Column key={i}>
							<SWCard people={people} onClick={onDelete} />
						</Grid.Column>
					);
				})}
			</Grid>
		</>
	);
};
