import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session'
import { EJSON } from 'meteor/ejson'
import ReactDOM from 'react-dom';

export default class RecomendationButton extends Component {
  analyzeImage() {
    console.log(Session.get("analyzeImageResult"));
    Session.set("analyzeImageResult", {});
    event.preventDefault();
    Meteor.call("analyzeImage", function(error, result){
      if(error){
        alert('Error');
      }else{
        Session.set("analyzeImageResult", result);
      }
    });
  }

  render() {
    return (
      <div>
        <button className = 'getRecomendation' onClick={this.analyzeImage.bind(this)}>Get recomendation</button>
      </div>
    );
  }
}
