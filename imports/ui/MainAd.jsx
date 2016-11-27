import React from 'react';
import Map from './Map.jsx';

class MainAd extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let className;
    let mainComponent;
    switch (this.props.mode) {
      case 'main-fullscreen':
        className = 'active full'
        break;
      case 'main-menus':
        mainComponent = <Map />;
        className = 'active';
        break;
      case 'map':
        className = 'active';
        mainComponent = <Map />;
      default:
        className = 'hidden';
        mainComponent = <h1>
          MAIN CAMPAIGN GOES HERE!
        </h1>;
        break;
    }
    return (
    <section id="main-ad" className={className}>
      {mainComponent}
    </section>)
  }
}

export default MainAd;
