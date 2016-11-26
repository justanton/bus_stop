import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';

import MainAd from './MainAd.jsx'
import LocalAd from './LocalAd.jsx'
import OptionBar from './OptionBar.jsx'

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

  // componentDidMount() {
  //   setInterval(() => {
  //     document.getElementById('flashing-ad').style.display = 'block';
  //     setTimeout(() => {
  //       document.getElementById('flashing-ad').style.display = 'none'
  //     }, 1)
  //   }, 500);
  // }

  render() {
    return (
      <div className="container">
        <MainAd fullscreen={this.state.fullscreen} />
        <OptionBar fullscreen={this.state.fullscreen} />
        <LocalAd fullscreen={this.state.fullscreen} />

        {/*
          <div id="flashing-ad" className="flashing-ad"></div>

        <header>
          <h1>Community board</h1>

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
        </ul>*/}
      </div>
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort : { createdAt: -1 }}).fetch(),
  };
}, App);
