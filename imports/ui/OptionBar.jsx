import React from 'react'

class OptionBar extends React.Component {
    render() {
      let className = this.props.active ? 'active' : ''
        return (
            <section id="option-bar" className={className}>
                <h1>
                    OPTION BAR GOES HERE!

                </h1>
            </section>
        )
    }
}

export default OptionBar
