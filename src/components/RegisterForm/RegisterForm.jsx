import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import TextInput from '../commons/TextInput/TextInput';
import Button from '../commons/Button/Button';
import AuthStore from '../../services/authStore';
import { SUCCESS_MESSAGE, FAILED_MESSAGE } from '../../consts/register-messages';
import TRANSLATIONS from '../../consts/translations';
import style from './style.scss';
import globalStyle from '../App.scss';

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      email: '',
      confirmPassword: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    const {
      login,
      password,
      email,
      confirmPassword,
    } = this.state;

    const payload = {
      login,
      password,
      email,
      confirmPassword,
    };

    AuthStore.register(payload).then(() => {
      if (AuthStore.isRegistered) {
        toast.success(SUCCESS_MESSAGE, {
          className: globalStyle.success,
        });
        this.props.history.push('/login');
      }
    }).catch(() => toast.error(FAILED_MESSAGE, {
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
      <div className={style.wrapper}>
        <form className={style.registerForm}>
          <TextInput
            placeholder={TRANSLATIONS.NAME}
            type="text"
            name="login"
            id="login"
            value={this.state.login}
            onChange={this.handleChange}
            className={style.textInput}
          />
          <TextInput
            placeholder={TRANSLATIONS.EMAIL}
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            className={style.textInput}
          />
          <TextInput
            placeholder={TRANSLATIONS.PASSWORD}
            type="password"
            name="password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
            className={style.textInput}
          />
          <TextInput
            placeholder={TRANSLATIONS.CONFIRM_PASSWORD}
            type="password"
            name="confirmPassword"
            id="confrimPassword"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            className={style.textInput}
          />
          <Button
            onClick={this.onClick}
            value={TRANSLATIONS.SIGNUP}
            className={style.signUpButton}
          />
        </form>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  history: PropTypes.object.isRequired,
};

export default RegisterForm;
