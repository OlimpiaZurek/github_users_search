import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import TRANSLATIONS from '../../consts/translations';
import style from './style.scss';

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      hasLabel: false,
      showResults: true,
    };

    this.delayedFunc = debounce(this.getData, this.props.waitInterval);
  }

  componentWillMount() {
    document.addEventListener('click', this.clickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.clickOutside);
  }

  onClick = (item) => {
    this.props.onItemSelected(item);
    this.setState({ hasLabel: true });
  }

  onFocus = () => (
    this.setState({ showResults: true })
  )

  getData = (value) => {
    this.props.dataSourceFn(value)
      .then(res => this.setState({ results: res }));
  }

  setRef = (ref) => {
    this.parentRef = ref;
  }

  clickOutside = (e) => {
    if (this.parentRef && !this.parentRef.contains(e.target.parentNode)) {
      this.setState({ showResults: false });
    }
  }

  handleChange = (e) => {
    e.persist();
    this.delayedFunc(e.target.value);
    this.props.callback(e.target.value);
  }

  hideLabel = () => {
    this.setState({ hasLabel: false });
  }

  render() {
    const { value, labelField, className } = this.props;
    const { results, hasLabel, showResults } = this.state;

    return (
      <div className={style.wrapper}>
        {hasLabel ?
          <input
            value={value !== null ? value[labelField] : null}
            onChange={() => {}}
            onClick={this.hideLabel}
            className={className}
          />
        :
          <div className={style.autocomplete} ref={this.setRef}>
            <input
              type="text"
              name="search"
              onChange={this.handleChange}
              placeholder={TRANSLATIONS.SEARCH}
              onFocus={this.onFocus}
              className={className}
            />
            {showResults &&
              <ul className={style.resultsWrapper}>
                {results.length > 0 ? results.map(result => (
                  <li
                    key={result.id}
                    onClick={() => this.onClick(result)}
                    className={style.items}
                  >
                    {result[labelField]}
                  </li>)) : null}
              </ul>

            }
          </div>
        }
      </div>
    );
  }
}

AutoComplete.defaultProps = {
  value: null,
  className: '',
};

AutoComplete.propTypes = {
  value: PropTypes.object,
  className: PropTypes.string,
  labelField: PropTypes.string.isRequired,
  onItemSelected: PropTypes.func.isRequired,
  dataSourceFn: PropTypes.func.isRequired,
  waitInterval: PropTypes.number.isRequired,
  callback: PropTypes.func.isRequired,
};

export default AutoComplete;
