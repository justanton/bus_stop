import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';
// import Venue from './Venue.jsx'

var params = {};
params.query = 'Food';
params.near = 'Helsinki';
var resultV = Foursquare.find(params, function(error, result) {
  return result;
});

// App component - represents the whole app
class App extends Component {
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

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  renderVenues() {
    return this.props.map((venue) => (
      <li>{venue.name}</li>
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Community board</h1>
          <h2>Number of messages: {Tasks.find().count()}</h2>

          <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type your message here"
            />
          </form>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
        <ul>
          {this.renderVenues()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  venues: PropTypes.array.isRequired
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort : { createdAt: -1 }}).fetch(),
    venues: []
  };
}, App);
