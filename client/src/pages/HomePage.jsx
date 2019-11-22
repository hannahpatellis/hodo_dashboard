import React from 'react';
import API from '../utils/API';

const logo = require('../images/hodo.png');

const houseIcons = {
  Gestalt: require('../images/Gestalt.png'),
  Heuristics: require('../images/Heuristics.png'),
  Context: require('../images/Context.png')
}

class HomePage extends React.Component {

  state = {
    data: [],
    places: [
      'st',
      'nd',
      'rd'
    ]
  }

  // Fetch house points and sort by point value
  getData = () => {
    API.dashboard()
      .then(res => {
        const data = res.data.sort((a, b) => {
          if (a.points > b.points)
            return -1;
          if (a.points < b.points)
            return 1;
          return 0;
        });
        this.setState({
          data: data
        });
      });
  }

  componentDidMount() {
    // Update authenticated state on logout
    this.props.toggleAuthenticateStatus();

    // Get the house points
    this.getData();
  }

  render() {
    return (
      <div className='stage'>

        <header className='stage-row'>
          <img className='header-logo' src={logo} alt='Houses of Design Olympics' width='450px' />
          <aside className='infobox'>

          </aside>
        </header>

        <main className='stage-row stage-row-houseCards'>
          {this.state.data.map((item, i) => (
            <section className='houseCard' key={i} style={{ border: `3px solid #${item.hex}` }}>
              <img className='houseCard-icon' src={houseIcons[item.house]} height='70px' alt={`House of ${item.house}`} />
              <h1 className='houseCard-spot'>{i+1}<sup>{this.state.places[i]}</sup> Place</h1>
              <h2 className='houseCard-name'>House of {item.house}</h2>
              <h3 className='houseCard-score'>{item.points}</h3>
              <h4 className='houseCard-weekscore'>{item.weekpoints} this week</h4>
            </section>
          ))}
        </main>

      </div>
    );
  }
};

export default HomePage;
