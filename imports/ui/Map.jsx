import React, { Component, PropTypes } from 'react';
import GoogleMap from './GoogleMap';

function handleMapOptions() {
  return {
    center: new google.maps.LatLng(60.1690454, 24.9407348),
    zoom: 15,
  };
}

function handleOnReady(name) {
  GoogleMaps.ready(name, map => {
    const marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance,
    });
  });
}

function Map() {
  return (
    <GoogleMap onReady={handleOnReady} mapOptions={handleMapOptions}>
      Loading!
    </GoogleMap>
  );
}

export default Map;
