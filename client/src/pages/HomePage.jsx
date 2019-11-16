import React from 'react';

class HomePage extends React.Component {

  componentDidMount() {
    // Update authenticated state on logout
    this.props.toggleAuthenticateStatus();
  }

  render() {
    return (
      <div>
        <p>Homepage</p>
      </div>
    );
  }
};

export default HomePage;
