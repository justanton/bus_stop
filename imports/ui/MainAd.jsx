import React from 'react'

class MainAd extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let className;
    switch (this.props.mode) {
      case 'main-fullscreen':
        className = 'active full'
        break;
      case 'main-menus':
        className = 'active';
        break;
      default:
        className = 'hidden';
        break;
    }
    return (
    <section id="main-ad" className={className}>
      <h1>
        MAIN CAMPAIGN GOES HERE!
      </h1>
    </section>)
  }
}

export default MainAd;
