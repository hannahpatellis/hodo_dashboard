import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import API from '../utils/API';

const logo = require('../images/hodo.png');
const gDocsLogo = require('../images/googledocs.png');

const houseIcons = {
  Gestalt: require('../images/Gestalt.png'),
  Heuristics: require('../images/Heuristics.png'),
  Context: require('../images/Context.png')
}

class HomePage extends React.Component {

  state = {
    data: [],
    challenges: [],
    places: [
      'st',
      'nd',
      'rd'
    ],
    challengeDocLocation: 'https://docs.google.com/document/d/1HdUdlh1OV3E-MDHv7CJiWm_A8QZRs32HTmq5iRC18pc/edit?usp=sharing',
    guideDocLocation: 'https://docs.google.com/document/d/11wNJKiOVrN9Y4y1gZhS1_mbAiu7zTDaqEHncf4reiGg/edit?usp=sharing'
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

  getChallenges = () => {
    API.challenges()
      .then(res => {
        // const data = res.data.sort((a, b) => {
        //   if (a.points > b.points)
        //     return -1;
        //   if (a.points < b.points)
        //     return 1;
        //   return 0;
        // });
        this.setState({
          challenges: res.data
        });
      });
  }

  componentDidMount() {
    // Update authenticated state on logout
    this.props.toggleAuthenticateStatus();

    // Get the house points
    this.getData();

    // Get the challenges
    this.getChallenges();
  }

  render() {
    return (
      <div className='stage'>

        <header className='stage-row'>
          <div className='logo'></div>
          {/* <img className='header-logo' src={logo} alt='Houses of Design Olympics' width='450px' /> */}
          <aside className='infobox'>

          </aside>
        </header>

        <main className='stage-row stage-row-houseCards'>
          {this.state.data.map((item, i) => (
            <section className='houseCard' key={i} style={{ border: `3px solid #${item.hex}` }}>
              <img className='houseCard-icon' src={houseIcons[item.house]} height='70px' alt={`House of ${item.house}`} />
              <h1 className='houseCard-spot'>{i + 1}<sup>{this.state.places[i]}</sup> Place</h1>
              <h2 className='houseCard-name'>House of {item.house}</h2>
              <h3 className='houseCard-score'>{item.points}</h3>
              <h4 className='houseCard-weekscore'>{item.weekpoints} this week</h4>
            </section>
          ))}
        </main>

        <section className='stage-row'>
          <h1>How to play</h1>
          <div className='stage-row-description'>
            <article className='stage-row-card'>
              <p>At the beginning of class you were split up into houses. Complete any of the challenges listed below and earn points for you house. When the House Cup comes, the house with the most points gets some prizes! Plus, there’s fun and food. Every week the house that earns the most points for that week “gets The Owl.” Whatever house has The Owl gets and extra 48 hours to turn in their homework for that week.</p>
            </article>
            <aside className='stage-row-card stage-row-card-outline'>
              <div className='outline-row'>
                <div className='outline-image'><a href={this.state.guideDocLocation}><img src={gDocsLogo} alt='Read the full rundown on Google Docs' /></a></div>
                <div className='outline-text'><a href={this.state.guideDocLocation}>Read the full rundown on <br />Google Docs</a></div>
              </div>
              <div className='outline-row'>
                <div className='outline-image'><a href={this.state.challengeDocLocation}><img src={gDocsLogo} alt='Get the challenges on Google Docs' /></a></div>
                <div className='outline-text'><a href={this.state.challengeDocLocation}>Get the challenges on <br />Google Docs</a></div>
              </div>
            </aside>
          </div>
        </section>

        <section className='stage-row'>
          <h1>Challenges</h1>
          <div className='stage-row-challenges'>
            <Accordion allowMultipleExpanded={true}>
              {this.state.challenges.map((item, i) => (
                <AccordionItem key={i}>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <span className='challenges-title'>{item.title}</span> <span className='challenges-pointValue'><strong>{item.points}{item.plus ? '+' : ''} points</strong></span>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <ul>
                      {item.details.map((detail, id) => (
                        <li>{detail}</li>
                      ))}
                    </ul>
                  </AccordionItemPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

      </div>
    );
  }
};

export default HomePage;
