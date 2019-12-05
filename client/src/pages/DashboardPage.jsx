import React from 'react';
import Auth from '../utils/Auth';
import API from '../utils/API';
import { Link } from 'react-router-dom';

const houseIcons = {
  Gestalt: require('../images/Gestalt.png'),
  Heuristics: require('../images/Heuristics.png'),
  Context: require('../images/Context.png'),
  Aesthetics: require('../images/Aesthetics.png'),
  GestaltOwl: require('../images/Gestalt-Owl.png'),
  HeuristicsOwl: require('../images/Heuristics-Owl.png'),
  ContextOwl: require('../images/Context-Owl.png'),
  AestheticsOwl: require('../images/Aesthetics-Owl.png')
}

class DashboardPage extends React.Component {
  state = {
    data: [],
    user: {},
    Gestalt: 0,
    Heuristics: 0,
    Context: 0,
    Aesthetics: 0
  }

  getData = () => {
    API.dashboard()
      .then(res => {
        let dataHolder = res.data;

        dataHolder.sort((a, b) => {
          const houseA = a.house.toLowerCase();
          const houseB = b.house.toLowerCase();
        
          let comparison = 0;
          if (houseA > houseB) {
            comparison = 1;
          } else if (houseA < houseB) {
            comparison = -1;
          }
          return comparison;
        });
        
        this.setState({
          data: dataHolder
        });
      });
  }

  handlePointInputChange = event => {
    const house = event.target.name;
    const value = event.target.value;

    this.setState({
      [house]: value
    });
  }

  handlePointChange = (house, points) => {
    API.points(house, points, Auth.getToken())
      .then(res => {
        this.getData();
      });
  }

  handleOwl = house => {
    API.owl(house, Auth.getToken())
      .then(res => {
        this.getData();
      });
  }

  handleWeekReset = () => {
    const confirmation = window.confirm('Are you sure you want to reset the week count for all houses?');
    
    if(confirmation) {
      API.weekreset(Auth.getToken())
        .then(res => {
          this.getData();
        });
    }
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className='container'>
        <div className='row admin-nav'>
          <div className='admin-logo'>
            <div className='logo'></div>
          </div>
          <div className='admin-nav-right'>
            <Link to='/logout' className='admin-nav-right'>Logout</Link>
            <hr />
            <a href='#' onClick={this.handleWeekReset}>Reset week</a>
          </div>
        </div>
        <div className='row mt-10p'>

          {this.state.data ? this.state.data.map(item => (
            <div className='col-12 col-md-12 col-lg-3 col-xl-3 mb-5' key={item.house}>

              <div className='card'>
                <div className='card-body text-center'>
                  <img className='admin-houseimg' height='85' src={item.owl ? houseIcons[item.house+'Owl'] : houseIcons[item.house]} alt={item.house} />
                  <h5>House of {item.house}</h5>
                  <h6 className='mb-2 text-muted'>House TA: {item.head}</h6>
                  <h1><strong>{item.points}</strong></h1>
                  <p>Points this week: {item.weekpoints}</p>

                  <hr />

                  <div className='input-group'>
                    <div className='input-group-prepend'>
                      <button onClick={() => this.handlePointChange(item.house, -1)} className='btn btn-outline-secondary' type='button' id={`admin-minus-${item.house}`}>-1</button>
                      <button onClick={() => this.handlePointChange(item.house, 1)} className='btn btn-outline-secondary' type='button' id={`admin-plus-${item.house}`}>+1</button>
                    </div>
                    <input type='text' onChange={this.handlePointInputChange} name={item.house} className='form-control' placeholder='' aria-label='Number of points to add' value={this.state[item.house]} />
                    <div className='input-group-append'>
                      <button onClick={() => this.handlePointChange(item.house, this.state[item.house])} className='btn btn-primary' type='button' id={`admin-add-${item.house}`}>+{this.state[item.house]}</button>
                    </div>
                  </div>

                  <hr />

                  <button type='button' onClick={() => this.handleOwl(item.house)} className={item.owl ? 'btn btn-secondary btn-lg btn-block' : 'btn btn-primary btn-lg btn-block'}>{item.owl ? 'Has The Owl' : 'Give The Owl'}</button>
                </div>
              </div>

            </div>
          )) : ''}

        </div>
      </div>
    );
  }

}

export default DashboardPage;
