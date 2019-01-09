import React from 'react';
import SearchButton from '../SearchButton/SearchButton';
import LogOutButton from '../LogoutButton/LogoutButton';
import style from './style.scss';

const Header = () => (
  <div className={style.header}>
    <SearchButton />
    <LogOutButton />
  </div>
);

export default Header;
