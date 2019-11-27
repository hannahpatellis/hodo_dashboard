import React from 'react';
import API from '../utils/API';

class SignUpPage extends React.Component {
  // set the initial component state
  state = {
    errors: {},
    user: {
      username: '',
      name: '',
      password: ''
    }
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm = event => {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const { name, username, password } = this.state.user;

    //const formData = `username=${username}&password=${password}`;
    API.signUp({ name, username, password }).then(res => {
      // change the component-container state
      // set a message
      localStorage.setItem('successMessage', res.data.message);

      // redirect user after sign up to login page
      this.props.history.push('/login');
      this.setState({
        errors: {}
      });

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
      <div className='container'>
        <div className='row'>
          <div className='admin-logo'>
            <div className='logo'></div>
          </div>
        </div>
        <div className='row mt-10p'>
          <div className='col-md-12 col-lg-4'></div>
          <div className='col-md-12 col-lg-4'>

            <h2>Admin signup</h2>

            <form action='/' onSubmit={this.processForm}>

              {this.state.errors.summary && <p className='error-message'>{this.state.errors.summary}</p>}

              <div>
                <label htmlFor='signup-form-name'>Name</label>
                <input
                  type='text'
                  name='name'
                  className='form-control'
                  id='signup-form-name'
                  aria-describedby='signup-nameHelp'
                  value={this.state.user.name}
                  onChange={this.changeUser}
                />
                <small id='signup-nameHelp' className='form-text text-danger'>{this.state.errors.name}</small>
              </div>

              <div className='mt-3'>
                <label htmlFor='signup-form-name'>Username</label>
                <input
                  type='text'
                  name='username'
                  className='form-control'
                  id='signup-form-username'
                  aria-describedby='signup-usernameHelp'
                  value={this.state.user.username}
                  onChange={this.changeUser}
                />
                <small id='signup-usernameHelp' className='form-text text-danger'>{this.state.errors.username}</small>
              </div>

              <div className='mt-3'>
                <label htmlFor='signup-form-password'>Password</label>
                <input
                  type='password'
                  name='password'
                  className='form-control'
                  id='signup-form-password'
                  aria-describedby='signup-passwordHelp'
                  value={this.state.user.password}
                  onChange={this.changeUser}
                />
                <small id='signup-passwordHelp' className='form-text text-danger'>{this.state.errors.password}</small>
              </div>

              <div>
                <button type='submit' className='btn btn-primary mt-4'>Signup</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpPage;
