import React from 'react'

class LocalAd extends React.Component {
    render() {
      let className;
      switch (this.props.mode) {
        case 'main-fullscreen':
          className = 'hidden'
          break;
        default:
          className = 'active'
          break;
      }
        return (
            <section id="local-ad" className={className}>
                <h1>

                    LOCAL CAMPAIGN GOES HERE!
                </h1>
            </section>
        )
    }
}

export default LocalAd
