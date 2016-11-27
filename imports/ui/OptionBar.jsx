import React from 'react'

class OptionBar extends React.Component {
    constructor(props) {
      super(props)
    }
    render() {
        let className;
        switch (this.props.mode) {
            case 'main-fullscreen':
                className = 'hidden';
                break;
            default:
                className = 'active';
                break;
        }
        return (
            <section id="option-bar" className={className}>
                <button id="venues-btn" className="option-bar-btn" onClick={this.props.clickHandlers.venues}>
                    Show local restaurants
                </button>

                <button id="schedules-btn" className="option-bar-btn" onClick={this.props.clickHandlers.schedules}>
                    Show bus schedules
                </button>

                <button id="tickets-info-btn" className="option-bar-btn" onClick={this.props.clickHandlers.tickets}>
                    Show tickets info
                </button>

                <button id="news-travel" className="option-bar-long-btn" onClick={this.props.clickHandlers.news}>
                    Show news
                </button>

            </section>
        )
    }
}

export default OptionBar
