import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import ReposList from '../components/Repos/ReposList';
import Loader from '../components/commons/Loader/Loader';

@inject('myStore') @observer
class ReposListContainer extends Component {
  constructor(props) {
    super(props);

    this.refereshRepos = this.refereshRepos.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { match, myStore } = this.props;
    if (match.params.name !== prevProps.match.params.name) {
      myStore.addUserRepo(match.params.name, myStore.users);
    }
  }

  refereshRepos(userName) {
    const { myStore } = this.props;
    myStore.addUsersRepos(userName, myStore.users);
  }

  render() {
    const { match } = this.props;
    const { myStore } = this.props;
    const singleUser = myStore.users.find(user => user.login === match.params.name);

    return (
      <React.Fragment>
        {Array.isArray(myStore.users) && myStore.users.length > 0 ?
          <ReposList
            repos={singleUser.repos}
            refresh={this.refereshRepos}
            login={singleUser.login}
          /> : <Loader />
        }
      </React.Fragment>
    );
  }
}

ReposListContainer.wrappedComponent.propTypes = {
  myStore: PropTypes.object.isRequired,
};

ReposListContainer.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ReposListContainer;
