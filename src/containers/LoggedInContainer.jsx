import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { Redirect } from 'react-router-dom';
import AuthStore from '../services/authStore';

class LoggedInContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isStillDeterminingToken: true,
    };
    this.subscriber = this.subscriber.bind(this);
  }

  componentWillMount() {
    this.subscriber = PubSub.subscribe(
      'FINISHED_DETERMINING_TOKEN',
      this.subscriber,
    );

    if (AuthStore.isTokenDetermined()) {
      this.setState({ isStillDeterminingToken: false });
    }
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.subscriber);
  }

  subscriber() {
    this.setState({
      isStillDeterminingToken: false,
    });
  }

  render() {
    if (!this.state.isStillDeterminingToken) {
      return (
        <div>
          {AuthStore.getToken() ? (
            <Redirect to="/users" />
          ) : (
            <Redirect to="/login" />
          )}
        </div>
      );
    }
    return null;
  }
}

export default LoggedInContainer;
