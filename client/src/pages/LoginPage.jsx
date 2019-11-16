import React from 'react';
import Auth from '../utils/Auth';
import API from '../utils/API';

class LoginPage extends React.Component {
  state = {
    errors: {},
    successMessage: '',
    user: {
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }
    this.setState({ successMessage });
  }

  componentWillUnmount() {
    this.setState({
      errors: {}
    });
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm = event => {
    // Prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // Create a string for an HTTP body message
    const { username, password } = this.state.user;

    API.login({ username, password }).then(res => {
      // Save the token
      Auth.authenticateUser(res.data.token);

      // Update authenticated state
      this.props.toggleAuthenticateStatus();

      // Redirect signed in user to dashboard
      this.props.history.push('/dashboard');
    }).catch(({ response }) => {
      const errors = response.data.errors ? response.data.errors : {};
      errors.summary = response.data.message;

      this.setState({
        errors
      });
    });
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser = event => {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  render() {
    return (
      <div>
        <form action="/" onSubmit={this.processForm}>
          <h1>Login</h1>

          {this.state.successMessage && <p className="success-message">{this.state.successMessage}</p>}
          {this.state.errors.summary && <p className="error-message">{this.state.errors.summary}</p>}

          <div>
            <label htmlFor="login-form-username">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              id="login-form-username"
              placeholder="Enter username"
              aria-describedby="login-usernameHelp"
              value={this.state.user.username}
              onChange={this.changeUser}
            />
            <small id="login-usernameHelp" class="form-text text-danger">{this.state.errors.username}</small>
          </div>

          <div>
            <label htmlFor="login-form-username">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="login-form-password"
              placeholder="Enter password"
              aria-describedby="login-passwordHelp"
              value={this.state.user.password}
              onChange={this.changeUser}
            />
            <small id="login-passwordHelp" className="form-text text-danger">{this.state.errors.password}</small>
          </div>

          <div>
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;
