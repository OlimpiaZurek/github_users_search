import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link as RLink } from 'react-router-dom';
import { searchUser } from '../../services/api';
import AutoComplete from './../AutoComplete/AutoComplete';
import searchIcon from '../../assets/images/searchIcon_white.png';
import style from './style.scss';

class UserSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: null,
      currentQuery: '',
    };
  }

  onClick = () => {
    this.getData(this.state.currentQuery);
    this.props.callback();
  }

  onChange = (value) => {
    this.setState({
      selectedValue: value,
    });
  };

  getData = (query) => {
    return searchUser(query);
  }

  handleChange = (value) => {
    this.setState({
      currentQuery: value,
    });
  }


  render() {
    const { selectedValue, currentQuery } = this.state;
    const username = selectedValue !== null ? selectedValue.login : currentQuery;
    return this.props.open ? (
      <div className={style.container}>
        <span className={style.close} onClick={this.onClick} role="button" tabIndex="0" />
        <AutoComplete
          dataSourceFn={this.getData}
          value={selectedValue}
          onItemSelected={this.onChange}
          labelField="login"
          waitInterval={250}
          className={style.input}
          callback={this.handleChange}
        />
        <RLink to={`/search/${username}`} className={style.searchIconLink}>
          <img
            src={searchIcon}
            alt="searcIcon"
            className={style.searchUser}
            onClick={this.onClick}
          />
        </RLink>
      </div>
    ) : null;
  }
}

UserSearch.propTypes = {
  open: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired,
};

export default UserSearch;
