import React from 'react'

class MainAd extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let className = this.props.fullscreen ? 'active full' : 'active';
    return (
    <section id="main-ad" className={className}>
      <h1>
        MAIN CAMPAIGN GOES HERE!
      </h1>
    </section>)
  }
}

export default MainAd;
