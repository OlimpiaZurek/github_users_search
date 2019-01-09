import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const SingleRepo = ({ name, starsCount }) => (
  <li className={style.list}>
    <p>{name}</p>
    <p>stargazers: {starsCount}</p>
  </li>
);

SingleRepo.propTypes = {
  name: PropTypes.string.isRequired,
  starsCount: PropTypes.number.isRequired,
};

export default SingleRepo;
