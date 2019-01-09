import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  value,
  onClick,
  className,
  disabled,
}) => (
  <button
    type="submit"
    onClick={onClick}
    className={className}
    disabled={disabled}
  >
    {value}
  </button>
);

Button.defaultProps = {
  className: '',
  disabled: false,
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
