import React from 'react';
import PropTypes from 'prop-types';
import { Link as RLink } from 'react-router-dom';
import Button from '../commons/Button/Button';
import style from './style.scss';

const User = ({
  login,
  createdAt,
  expandRepos,
  removeUser,
}) => (
  <tr>
    <td>{login}</td>
    <td>{createdAt}</td>
    <td className={style.buttonsWrapper}>
      <RLink to={`/user/${login}`}>
        <div
          onClick={() => expandRepos(login)}
          role="button"
          tabIndex="0"
        >
          <i className={style.right} />
        </div>
      </RLink>
      <Button
        onClick={() => removeUser(login)}
        value="-"
        className={style.deleteButton}
      />
    </td>
  </tr>
);

User.propTypes = {
  login: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  expandRepos: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
};

export default User;
