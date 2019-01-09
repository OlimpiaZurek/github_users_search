import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const TitleBlock = ({ title, text }) => (
  <div className={style.title}>
    {title} <span className={style.text}>{text}</span>
  </div>
);

TitleBlock.defaultProps = {
  text: '',
};

TitleBlock.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
};

export default TitleBlock;
