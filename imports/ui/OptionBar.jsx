import React from 'react'

class OptionBar extends React.Component {
    render() {
      let className;
      switch (this.props.mode) {
        case 'main-menus':
          className = 'active';
          break;
        default:
          className = 'hidden';
          break;
      }
        return (
            <section id="option-bar" className={className}>
                    <button id="venues-btn" className="option-bar-btn"></button>
                    <button id="schedules-btn" className="option-bar-btn"></button>
                    <button id="tickets-info-btn" className="option-bar-btn"></button>
                    <button id="news-travel" className="option-bar-long-btn"></button>
            </section>
        )
    }
}

export default OptionBar
