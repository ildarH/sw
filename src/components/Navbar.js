import React from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <Menu inverted>
            <Container>
                <Link to='/'>
                    <Menu.Item name='Главная' />
                </Link>
                <Link to='/favorites'>
                    <Menu.Item name='любимые герои' />
                </Link>
            </Container>
        </Menu>
    );
};
