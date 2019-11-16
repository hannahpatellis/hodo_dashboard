import React from 'react';
import Auth from '../utils/Auth';

class LogoutFunction extends React.Component {

  componentDidMount() {
    // Deauthenticate user
    Auth.deauthenticateUser();
    // Change the current URL to / after logout
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <p>Logging out...</p>
      </div>
    );
  }
}

export default LogoutFunction;
