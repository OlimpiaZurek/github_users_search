import React from 'react';
import { Link as RLink } from 'react-router-dom';
import Button from '../commons/Button/Button';
import AuthStore from '../../services/authStore';
import TRANSLATIONS from '../../consts/translations';
import style from './style.scss';

const LogoutButton = () => (
  <RLink to="/login">
    <Button
      onClick={() => { AuthStore.logOut(); }}
      value={TRANSLATIONS.LOGOUT}
      className={style.logout}
    />
  </RLink>
);

export default LogoutButton;
