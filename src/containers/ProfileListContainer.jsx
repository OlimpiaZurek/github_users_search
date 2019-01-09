import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import SearchResultsList from '../components/SearchResultsList/SearchResultsList';
import TitleBlock from '../components/commons/TitleBlock/Titleblock';
import Loader from '../components/commons/Loader/Loader';

@inject('myStore') @observer
class ProfileListContainer extends Component {
  componentDidMount() {
    this.props.myStore.searchProfiles(this.props.match.params.name);
  }

  componentDidUpdate(prevProps) {
    const { match, myStore } = this.props;
    if (match.params.name !== prevProps.match.params.name) {
      myStore.searchProfiles(match.params.name);
    }
  }

  handleClick = (id, login) => {
    this.props.myStore.addUser(id, login);
  }

  render() {
    const { myStore, match } = this.props;

    return (
      <React.Fragment>
        <TitleBlock title="Search result for:" text={match.params.name} />
        {myStore.profiles.length === 0 ? <Loader /> :
        <SearchResultsList
          profiles={myStore.profiles}
          addUser={this.handleClick}
        />
        }
      </React.Fragment>
    );
  }
}

ProfileListContainer.wrappedComponent.propTypes = {
  myStore: PropTypes.object.isRequired,
};

ProfileListContainer.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ProfileListContainer;
