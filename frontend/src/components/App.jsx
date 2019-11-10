import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  HashRouter, Route, Switch, Redirect, NavLink,
} from 'react-router-dom';

// Local imports
// import styled from 'styled-components';
import { actions } from '../../store';

// Components
import Home from './Home';
import User from './User';
import Explore from './Explore';

// let TOKEN;
// if (location.href.includes('?token=')) {
//   TOKEN = location.href.split('?token=')[1];
//   window.localStorage.setItem('token', TOKEN);
// }


class App_ extends Component {
  // componentDidUpdate(prevProps) {
  //   const {
  //     loggedIn, products, loadStoreData, loadCart,
  //   } = this.props;

  //   if (
  //     prevProps.products.length !== products.length
  //     || prevProps.loggedIn !== loggedIn
  //   ) {
  //     loadStoreData();
  //     loadCart(loggedIn);
  //   }
  // }

  componentDidMount() {
    const { loggedIn, attemptSessionLogin, loadStoreData } = this.props;
    attemptSessionLogin().catch((ex) => console.log(ex));
    loadStoreData();
  }

  render() {
    return (
      <div>
        <HashRouter>
          <NavLink to="/">
      home
          </NavLink>
          <NavLink to="/explore">
      explore
          </NavLink>
          <NavLink to="/user">
      user
          </NavLink>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/explore" component={Explore} />
            <Route path="/user" component={User} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}
const mapStateToProps = ({ auth, brands, tags }) => ({
  loggedIn: !!auth.id,
  brands,
  tags,
});

const mapDispatchToProps = (dispatch) => ({
  attemptSessionLogin: () => dispatch(actions.attemptSessionLogin()),
  loadStoreData: () => {
    dispatch(actions.fetchBrands());
    dispatch(actions.fetchTags());
  },
});

const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App_);

export default App;
