import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';
import VenueList from './VenueList.jsx'


import MainAd from './MainAd.jsx'
import LocalAd from './LocalAd.jsx'
import OptionBar from './OptionBar.jsx'

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {mode: 'main-menus', venues: []}

    this.getVenues();

    modes = ['main-fullscreen', 'main-menus', 'restaurant-venues']

    count = 1;

    this.handleClickVenues = this.handleClickVenues.bind(this)
    // setInterval(() => {
    //   this.setState(Object.assign(this.state, {mode: modes[count % modes.length]}));
    //   console.log("State changed: mode = " + this.state.mode)
    //   count += 1;
    // }, 10000);
    // this.handleOptionClick = this.handleOptionClick.bind(this)
  }
  getVenues() {
    var params = {};
    params.query = 'Food';
    params.near = 'Helsinki';
    Foursquare.find(params, (error, result) => {
      console.log(result.response.venues)
      if (error) console.log(error);
      else this.setState(Object.assign(this.state, {venues: result.response.venues}))
    })
  }
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  handleClickVenues() {
    this.setState({mode: 'restaurant-venues'})
  }

  handleClickNews() {
    console.log('Clicked news')
  }

  handleClickTickets() {
    console.log('Clicked Tickets')
  }

  handleClickSchedules() {
    console.log('Clicked schedules')
  }

  render() {

    return (
      <div className="container">
        <MainAd mode={this.state.mode} />
        <VenueList mode={this.state.mode} venues={this.state.venues} />


        <OptionBar mode={this.state.mode} clickHandlers={{venues: this.handleClickVenues, news: this.handleClickNews, tickets: this.handleClickTickets, schedules: this.handleClickSchedules}}/>
        <LocalAd mode={this.state.mode} />


      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort : { createdAt: -1 }}).fetch()
  };
}, App);
