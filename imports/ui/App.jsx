import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session'
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

    this.state = { mode: 'main-menus', venues: []}

    modes = ['main-fullscreen', 'main-menus', 'restaurant-venues']
    this.analyzeImageAndGetPlaces();
    count = 1;
    this.handleClickVenues = this.handleClickVenues.bind(this)
    // setInterval(() => {
    //   this.setState(Object.assign(this.state, {mode: modes[count % modes.length]}));
    //   console.log("State changed: mode = " + this.state.mode)
    //   count += 1;
    // }, 10000);
    // this.handleOptionClick = this.handleOptionClick.bind(this)
  }

  analyzeImageAndGetPlaces() {
    event.preventDefault();
    Meteor.call("analyzeImage", function(error, result){
      if(error){
        alert('Error');
      }else{
        Session.set("age", result["age"]);
        Session.set("gender", result["gender"])
        Session.set("glasses", result["glasses"])
      }
    });
    setTimeout(function(){
      console.log(Session.get("gender"));
      console.log(Session.get("age"));
      console.log(Session.get("glasses"));
      this.getVenues();
    }, 6000);
  }

  getVenues() {
    var query = "";
    if(Session.get("gender") == "male")
      query += "pubs";
    else {
      query += "restaurant"
    }
    var params = {};
    params.query = query;
    params.near = 'Helsinki';
    Foursquare.find(params, (error, result) => {
      console.log(result.response.venues)
      if (error) console.log(error);
      else this.setState(Object.assign(this.state, {venues: result.response.venues}))
    })
    return 0;
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
          {/*renderVenues() {
            return this.state.venues.map((venue) => (
              <li key={venue.id}>{venue.name}</li>
            ));
          }


          new_form() {
            Session.set("user_message", document.getElementById("mess_board").value);
          }

          render() {

            let applicationDiv;
            switch (this.state.mode) {
              case 'restaurant-venues':
                applicationDiv = (<div><ul>
                  {this.renderVenues()}
                </ul></div>);
                break;
              default:
                applicationDiv = null;
                break;
            }
            return (
            <div className="container">
              <header>
                  <h1>Community Voice</h1>
                  <h2>Number of messages: { Tasks.find().count()} </h2>

                  <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                    <input
                      type="text"
                      id="mess_board"
                      onSubmit={this.new_form}
                      onChange={this.new_form}
                      ref="textInput"
                      placeholder="Write your message here"
                    />
                  </form>

                  <MainAd mode={this.state.mode} />

                    {applicationDiv}

                  <OptionBar mode={this.state.mode} />
                  <LocalAd mode={this.state.mode} />

              </header>

              {console.log(Session.get("user_message"))};*/}
        {/*<MainAd fullscreen={this.state.fullscreen} />
        <OptionBar fullscreen={this.state.fullscreen} />
        <LocalAd fullscreen={this.state.fullscreen} />*/}

        {/*<ul>
          {this.renderTasks()}
          {this.renderVenues()}
        </ul>*/}
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort : { createdAt: -1 }}).fetch(),
  };
}, App);
