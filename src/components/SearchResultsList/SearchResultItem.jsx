import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../commons/Button/Button';
import style from './style.scss';

class SearchResultItem extends Component {
  constructor(props) {
    super(props);
    this.clicked = this.clicked.bind(this);
  }
    state = {
      alreadyClicked: false,
    };

    /* eslint-disable */
    // componentDidUpdate(prevProps, prevState) {
    //   if (prevState !== this.state) {
    //     return;
    //   }
    //   if (this.state.alreadyClicked && !this.props.profile.createdAt) {
    //     this.setState({
    //       alreadyClicked: false,
    //     });
    //   }
    // }
    /* eslint-enable */

    clicked() {
      const { profile, addUser } = this.props;
      this.setState({
        alreadyClicked: true,
      });
      addUser(profile.id, profile.login);
    }

    render() {
      const { profile: { id, login, createdAt } } = this.props;
      const { alreadyClicked } = this.state;

      return (
        <li key={id} className={style.searchResultsItems}>
          <span>{login}</span>
          {!createdAt && !alreadyClicked && (
            <Button
              onClick={this.clicked}
              className={style.addUser}
              value="+"
            />
          )}
        </li>
      );
    }
}

SearchResultItem.propTypes = {
  profile: PropTypes.object.isRequired,
  addUser: PropTypes.func.isRequired,
};

export default SearchResultItem;

