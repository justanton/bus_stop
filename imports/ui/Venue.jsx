import React, { Component, PropTypes } from 'react';

class Venues extends Component {
  render() {
    return (
      <ul>
        {this.props.venues.map(venue => <li key={venue.id}>{venue.name}</li>)}
      </ul>
    )
  }
}

export default Venues
