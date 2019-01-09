import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UserSearch from './Search/UsersSearch';

class Portal extends Component {
  constructor(props) {
    super(props);

    this.rootSelector = document.getElementById('root-modal');
    this.container = document.createElement('div');
  }

  componentDidMount() {
    this.rootSelector.appendChild(this.container);
  }

  componentWillUnmount() {
    this.rootSelector.removeChild(this.container);
  }

  render() {
    return ReactDOM.createPortal(<UserSearch {...this.props} />, this.container);
  }
}

export default Portal;
