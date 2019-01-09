import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link as RLink } from 'react-router-dom';
import SingleRepo from './SingleRepo';
import Loader from '../../components/commons/Loader/Loader';
import style from './style.scss';

class ReposList extends Component {
  constructor() {
    super();
    this.state = {
      rotate: false,
      busy: false,
    };
    this.onClick = this.onClick.bind(this);
    this.rotatingDone = this.rotatingDone.bind(this);
  }

  componentDidMount () {
    const elm = this.el;
    elm.addEventListener('animationend', this.rotatingDone);
  }
  componentWillUnmount () {
    const elm = this.el;
    elm.removeEventListener('animationend', this.rotatingDone);
  }

  onClick(login) {
    this.setState({ rotate: true, busy: true });
    this.props.refresh(login);
  }

  rotatingDone () {
    this.setState({ rotate: false, busy: false });
  }

  render() {
    const { repos, login } = this.props;
    return (
      <div className={style.reposListContainer}>
        <RLink to="/users"> <i className={style.left} /></RLink>
        <div
          onClick={() => this.onClick(login)}
          className={`${style.reloadIcon} ${this.state.rotate ? style.refreash : null}`}
          role="button"
          tabIndex="0"
          ref={(elm) => {
            this.el = elm;
        }}
        />
        <p className={style.title}>Repos</p>
        {this.state.busy ? <Loader /> :
        <ul>
          {repos && repos.map(({ name, stargazers_count: stargazersCount, id }) =>
            <SingleRepo name={name} starsCount={stargazersCount} key={id} />)}
        </ul>
        }
      </div>
    );
  }
}
ReposList.defaultProps = {
  repos: [],
};

ReposList.propTypes = {
  repos: PropTypes.array,
  refresh: PropTypes.func.isRequired,
  login: PropTypes.string.isRequired,
};

export default ReposList;
