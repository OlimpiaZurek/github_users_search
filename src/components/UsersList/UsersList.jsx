import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import User from './User.comp';
import TRANSLATIONS from '../../consts/translations';
import style from './style.scss';

const UsersList = ({
  users,
  expandRepos,
  removeUser,
}) => (
  <table className={style.table}>
    <thead>
      <tr>
        <th>Name</th>
        <th>Created at</th>
        <th>Repos</th>
      </tr>
    </thead>
    <tbody>
      {users.length > 0 ? users.map(({
         login, id, createdAt,
        }) => {
        return (
          <User
            login={login}
            key={id}
            createdAt={moment.utc(createdAt).format('MM/DD/YYYY')}
            expandRepos={() => expandRepos(login)}
            removeUser={() => removeUser(login)}
          />
          );
        })
       :
      <tr>
        <td colSpan="3" className={style.emptyList}>{TRANSLATIONS.NO_USERS}</td>
      </tr>
        }
    </tbody>
  </table>
);

UsersList.defaultProps = {
  users: [],
};

UsersList.propTypes = {
  users: PropTypes.array,
  expandRepos: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
};

export default UsersList;
