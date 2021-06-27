import React, { useState } from 'react';
import { Menu, Input, Button, Dropdown } from 'semantic-ui-react';
import { Link, useRouteMatch } from 'react-router-dom';

export const Navbar = ({
  onSearch,
  isResult,
  clearResult,
  filterHandler,
  genderVariations,
  searchError,
}) => {
  const [searchValue, setSearchValue] = useState('');

  let favorites = useRouteMatch('/favorites');
  let isActive = favorites?.path === '/favorites';

  const clickHandler = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <Menu inverted borderless style={{ minHeight: '5em' }}>
      {isResult || searchError ? (
        <>
          <Menu.Item>Результат поиска</Menu.Item>
          <Button
            onClick={() => {
              setSearchValue('');
              clearResult();
            }}>
            Очистить
          </Button>
        </>
      ) : (
        <>
          <Menu.Item active={!isActive}>
            <Link to='/'>Главная</Link>
          </Menu.Item>
          <Menu.Item active={isActive}>
            <Link to='/favorites'>Избранное</Link>
          </Menu.Item>

          {isActive ? null : (
            <>
              <Menu.Item>
                <Input
                  type='text'
                  value={searchValue}
                  size='small'
                  disabled={isActive}
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
              </Menu.Item>

              <Menu.Item>
                <Dropdown
                  clearable
                  options={genderVariations}
                  selection
                  compact
                  disabled={isActive}
                  onChange={(e, data) => filterHandler(data.value)}
                />
              </Menu.Item>
            </>
          )}
        </>
      )}
    </Menu>
  );
};
