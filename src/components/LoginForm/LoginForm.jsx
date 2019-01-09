import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link as RLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import TextInput from '../commons/TextInput/TextInput';
import Button from '../commons/Button/Button';
import AuthStore from '../../services/authStore';
import { SUCCESS_MESSAGE, FAILED_MESSAGE } from '../../consts/login-messages';
import TRANSLATIONS from '../../consts/translations';
import style from './style.scss';
import globalStyle from '../App.scss';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    const payload = {
      login: this.state.username,
      password: this.state.password,
    };

    AuthStore.logIn(payload).then(() => {
      if (AuthStore.isLogged) {
        toast.success(SUCCESS_MESSAGE, {
          className: globalStyle.success,
        });
        this.props.history.push('/users');
      }
    })
      .catch(() => toast.error(FAILED_MESSAGE, {
        className: globalStyle.failed,
      }));
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <form className={style.loginForm}>
        <div className={style.signInWrapper}>
          <span>{TRANSLATIONS.SIGNIN}</span>
          <TextInput
            placeholder={TRANSLATIONS.NAME}
            type="text"
            name="username"
            value={this.state.username}
            id="username"
            onChange={this.handleChange}
            className={style.textInput}
          />
          <TextInput
            placeholder={TRANSLATIONS.PASSWORD}
            type="password"
            name="password"
            value={this.state.password}
            id="password"
            onChange={this.handleChange}
            className={style.textInput}
          />
          <Button
            onClick={this.onClick}
            value={TRANSLATIONS.SIGNIN}
            className={style.signInButton}
          />
        </div>
        <div className={style.signUpWrapper}>
          <p>Sign Up</p>
          <p>{TRANSLATIONS.SIGNUP_MESSAGE}</p>
          <RLink to="/register">
            Sign Up
          </RLink>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  history: PropTypes.object.isRequired,
};

export default LoginForm;
