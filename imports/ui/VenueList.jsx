import React, { Component, PropTypes } from 'react';

class VenueList extends Component {
  render() {
    let className;
    switch (this.props.mode) {
      case 'restaurant-venues':
        className = 'active';
        break;
      default:
        className = 'hidden';
        break;
    }
    return (
      <ul id="restaurant-venues" className={className}>
        {this.props.venues.map(venue => <li key={venue.id}>{venue.name}</li>)}
      </ul>
    )
  }
}

export default VenueList
