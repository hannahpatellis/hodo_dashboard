import React from 'react';
import Auth from '../utils/Auth';
import API from '../utils/API';
import { Link } from 'react-router-dom'

class DashboardPage extends React.Component {
  state = {
    secretData: '',
    user: {}
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    API.dashboard(Auth.getToken())
    .then(res => {
      this.setState({
          secretData: res.data.message,
          user: res.data.user
        });
    })
  }

  render() {
    return (
      <div>
        <Link to="/logout">Log out</Link>
      </div>
    );
  }

}

export default DashboardPage;
