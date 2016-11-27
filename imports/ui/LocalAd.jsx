import React from 'react';
import Slider from 'react-slick';

class LocalAd extends React.Component {
    render() {
      var settings = {
        dots: false,
        accessibility: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
      }
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
              <div className="slider-container">
              <Slider {...settings}>
                <div><img src='http://placekitten.com/g/400/200' /></div>
                <div><img src='http://placekitten.com/g/400/200' /></div>
                <div><img src='http://placekitten.com/g/400/200' /></div>
              </Slider>
              </div>
            </section>
        )
    }
}

export default LocalAd
