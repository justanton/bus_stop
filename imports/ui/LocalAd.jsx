import React from 'react'

class LocalAd extends React.Component {
    render() {
      let className = this.props.active ? 'active' : ''
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
