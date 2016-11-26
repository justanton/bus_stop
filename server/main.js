import { Meteor } from 'meteor/meteor';
import { EJSON } from 'meteor/ejson'
import '../imports/api/tasks.js';

Meteor.startup(() => {
  // code to run on server at startup
  // Load future from fibers
  var Future = Npm.require("fibers/future");
  // Load exec
  var exec = Npm.require("child_process").exec;
  var result = new Object();

  Meteor.methods({
    analyzeImage: function () {
      const commandForGetImage = 'imagesnap -w 2.00 junction.jpeg > /dev/null';
      const curlPost = 'curl -vsb -X POST --data-binary "@junction.jpeg" -H "Content-Type: application/octet-stream" -H "Host: api.projectoxford.ai" -H "Ocp-Apim-Subscription-Key: 715e3a1cf9d348618ac479efdee8f9b0" "https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,smile,facialHair,glasses"';

      // This method call won't return immediately, it will wait for the
      // asynchronous code to finish, so we call unblock to allow this client
      // to queue other method calls (see Meteor docs)
      this.unblock();
      var future=new Future();
      var command= commandForGetImage + ' && ' + curlPost;
      exec(command,function(error,stdout,stderr){
        if(error){
          console.log(error);
          throw new Meteor.Error(500,command+" failed");
        }
        stdout = stdout.replace("[", "");
        stdout = stdout.replace("]", "");
        result = EJSON.parse(stdout);
        var faceAttributes = result['faceAttributes'];
        console.log(faceAttributes);
        return faceAttributes;
      });
    }
  });
});
