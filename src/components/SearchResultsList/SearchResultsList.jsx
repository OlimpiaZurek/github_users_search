import React from 'react';
import PropTypes from 'prop-types';
import { Link as RLink } from 'react-router-dom';
import SearchResultItem from './SearchResultItem';
import TRANSLATIONS from '../../consts/translations';
import style from './style.scss';

const SearchResultsList = ({ profiles, addUser }) => (
  <React.Fragment>
    <RLink to="/users"> <i className={style.left} /></RLink>
    <ul className={style.searchResultsList}>
      {profiles ? profiles.map(profile =>
        <SearchResultItem addUser={addUser} profile={profile} key={profile.id} />)
      : <div>{TRANSLATIONS.NOT_FOUND}</div>
      }
    </ul>
  </React.Fragment>
);

SearchResultsList.defaultProps = {
  profiles: [],
};

SearchResultsList.propTypes = {
  profiles: PropTypes.array,
  addUser: PropTypes.func.isRequired,
};

export default SearchResultsList;
