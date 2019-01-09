import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import UsersList from '../components/UsersList/UsersList';

@inject('myStore') @observer
class UsersListContainer extends Component {
  constructor(props) {
    super(props);
    this.handleUserRepo = this.handleUserRepo.bind(this);
    this.removeUser = this.removeUser.bind(this);
  }

  handleUserRepo(userName) {
    const { myStore } = this.props;
    myStore.addUsersRepos(userName, myStore.users);
  }

  removeUser(userName) {
    const { myStore } = this.props;
    myStore.removeUser(userName);
  }

  render() {
    const { myStore } = this.props;
    return (
      <UsersList
        users={myStore.users}
        expandRepos={this.handleUserRepo}
        removeUser={this.removeUser}
      />
    );
  }
}

UsersListContainer.wrappedComponent.propTypes = {
  myStore: PropTypes.object.isRequired,
};

export default UsersListContainer;
