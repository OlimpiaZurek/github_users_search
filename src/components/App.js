import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { ToastContainer } from 'react-toastify';
import Store from '../services/store';
import Header from '../components/Header/Header';
import UsersListContainer from '../containers/UsersListContainer';
import ReposListContainer from '../containers/ReposListContainer';
import ProfileListContainer from '../containers/ProfileListContainer';
import LoginForm from '../components/LoginForm/LoginForm';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import LoggedInContainer from '../containers/LoggedInContainer';

const store = new Store();

const Protected = () => (
  <div>
    <Header />
    <Route exact path="/users" component={UsersListContainer} />
    <Route exact path="/user/:name" component={ReposListContainer} />
    <Route exact path="/search/:name" component={ProfileListContainer} />
  </div>
);

const App = () => {
  return (
    <Provider myStore={store}>
      <Router>
        <div>
          <Route exact path="/" component={LoggedInContainer} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
          <Route exact path="/users" component={Protected} />
          <Route exact path="/user/:name" component={Protected} />
          <Route exact path="/search/:name" component={Protected} />
          <ToastContainer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
