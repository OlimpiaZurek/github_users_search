import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const TextInput = ({
  type,
  name,
  value,
  placeholder,
  onChange,
  error,
  className,
}) => (
  <div className={style.input}>
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={className}
    />
    {error && <div className={style.error}>{error}</div>}
  </div>
);

TextInput.defaultProps = {
  type: 'text',
  value: '',
  placeholder: '',
  className: '',
  error: '',
};

TextInput.propTypes = {
  type: PropTypes.oneOf(['text', 'number', 'password']),
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  error: PropTypes.string,
};

export default TextInput;
