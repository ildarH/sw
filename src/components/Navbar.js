import React, { useState } from 'react';
import { Menu, Input, Button } from 'semantic-ui-react';
import { Link, useRouteMatch } from 'react-router-dom';

export const Navbar = ({ onSearch, isResult, clearResult }) => {
  const [searchValue, setSearchValue] = useState('');

  let favorites = useRouteMatch('/favorites');
  let isActive = favorites?.path === '/favorites';

  const clickHandler = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <Menu inverted borderless>
      <Menu.Item active={!isActive}>
        <Link to='/'>{isResult ? 'Результат' : 'Главная'}</Link>
      </Menu.Item>
      <Menu.Item active={isActive}>
        {isResult ? 'Избранное' : <Link to='/favorites'>Избранное</Link>}
      </Menu.Item>
      <Menu.Item>
        {isResult ? (
          <Button
            onClick={() => {
              setSearchValue('');
              clearResult();
            }}>
            Очистить
          </Button>
        ) : (
          <Input
            type='text'
            value={searchValue}
            size='small'
            placeholder='Поиск...'
            onChange={(e) => setSearchValue(e.target.value)}>
            <input />

            <Button
              type='submit'
              disabled={searchValue.length > 0 ? false : true}
              onClick={(e) => clickHandler(e)}>
              Поиск
            </Button>
          </Input>
        )}
      </Menu.Item>
    </Menu>
  );
};
