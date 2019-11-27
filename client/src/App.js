import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import { 
  PrivateRoute, 
  PropsRoute, 
  LoggedOutRoute 
} from './components/Routes';

import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import LogoutFunction from './pages/LogoutFunction.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import Auth from './utils/Auth';

class App extends Component {

  state = {
    authenticated: false
  }

  componentDidMount() {
    // Check if user is logged in on refresh
    this.toggleAuthenticateStatus();
  }

  toggleAuthenticateStatus = () => {
    // Check authenticated status and toggle state based on that
    this.setState({ authenticated: Auth.isUserAuthenticated() });
  }

  render() {
    return (
      <div>
        <Router>
            <PropsRoute exact path="/" component={HomePage} toggleAuthenticateStatus={this.toggleAuthenticateStatus} />
            <PrivateRoute path="/dashboard" component={DashboardPage} />
            <LoggedOutRoute path="/login" component={LoginPage} toggleAuthenticateStatus={this.toggleAuthenticateStatus} />
            {/* <LoggedOutRoute path="/signup" component={SignUpPage} /> */}
            <Route path="/logout" component={LogoutFunction}/>
        </Router>
      </div>
    );
  }
}

export default App;
