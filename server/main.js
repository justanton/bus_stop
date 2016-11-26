import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Foursquare.init({
 id: 'MH1EC4KC0LZHIGZH1LMABEYIOK1D2IK20ILGEE45INMQP01N',
 secret: 'AY24CZI2V4YVP33IE2XATAIWYOM0RTSHKIUYRBT2ZSDZLRXB',
 authOnly: false // need auth for using or no?
});
