import React, { Component } from 'react';
import Portal from '../Portal';
import searchIcon from '../../assets/images/searchIcon.png';
import style from './style.scss';

class SearchButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPortal: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({ showPortal: !this.state.showPortal });
  }

  render() {
    return (
      <div className={style.buttonWrapper}>
        <img
          src={searchIcon}
          alt="searcIcon"
          className={style.searchIcon}
          onClick={this.onClick}
        />
        <Portal open={this.state.showPortal} callback={this.onClick} />
      </div>
    );
  }
}

export default SearchButton;
