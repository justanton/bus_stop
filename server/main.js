import { Meteor } from 'meteor/meteor';
import { EJSON } from 'meteor/ejson'
import '../imports/api/tasks.js';

Meteor.startup(() => {
  // code to run on server at startup
  // Load future from fibers

  Meteor.methods({
    analyzeImage: function () {
      // Load exec
      var exec = Npm.require("child_process").execSync;
      var result = new Object();
      var faceAttributes = new Object();
      const commandForGetImage = 'imagesnap -w 2.00 junction.jpeg > /dev/null';
      const curlPost = 'curl -vsb -X POST --data-binary "@junction.jpeg" -H "Content-Type: application/octet-stream" -H "Host: api.projectoxford.ai" -H "Ocp-Apim-Subscription-Key: 715e3a1cf9d348618ac479efdee8f9b0" "https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,smile,facialHair,glasses"';

      // This method call won't return immediately, it will wait for the
      // asynchronous code to finish, so we call unblock to allow this client
      // to queue other method calls (see Meteor docs)
      var command= commandForGetImage + ' && ' + curlPost;
      var stdout = exec(command, {encoding:'utf8'});
      stdout = stdout.replace("[", "");
      stdout = stdout.replace("]", "");
      result = EJSON.parse(stdout);
      faceAttributes = result['faceAttributes'];
      return faceAttributes;
    }
  });
});

Foursquare.init({
 id: 'MH1EC4KC0LZHIGZH1LMABEYIOK1D2IK20ILGEE45INMQP01N',
 secret: 'AY24CZI2V4YVP33IE2XATAIWYOM0RTSHKIUYRBT2ZSDZLRXB',
 authOnly: false // need auth for using or no?
});
