import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

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
    challenges: [],
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
              <p>At the beginning of class you were split up into houses. Complete any of the challenges listed below and earn points for you house. When the Houses of Design Olympics Cup comes, the house with the most points gets some prizes! Plus, there’s fun and food. Every week, the house that earns the most points for that week “gets The Owl.” Whatever house has The Owl gets and extra 48 hours to turn in their homework for that week.</p>
            </article>
            <aside className='stage-row-card stage-row-card-outline'>
              <ul>
                <li>Read the full rundown on <br />Google Docs</li>
                <li>Get challenges on <br />Google Docs</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className='stage-row'>
          <h1>Challenges</h1>
          <div className='stage-row-challenges'>
            <Accordion>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    What harsh truths do you prefer to ignore?
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p>
                    Exercitation in fugiat est ut ad ea cupidatat ut in
                    cupidatat occaecat ut occaecat consequat est minim minim
                    esse tempor laborum consequat esse adipisicing eu
                    reprehenderit enim.
                    </p>
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    Is free will real or just an illusion?
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p>
                    In ad velit in ex nostrud dolore cupidatat consectetur
                    ea in ut nostrud velit in irure cillum tempor laboris
                    sed adipisicing eu esse duis nulla non.
                    </p>
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

      </div>
    );
  }
};

export default HomePage;
