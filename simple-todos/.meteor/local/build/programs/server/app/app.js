var require = meteorInstall({"imports":{"api":{"tasks.js":["meteor/meteor","meteor/mongo","meteor/check",function(require,exports){

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
// imports/api/tasks.js                                                      //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////
                                                                             //
exports.__esModule = true;                                                   //
exports.Tasks = undefined;                                                   //
                                                                             //
var _meteor = require('meteor/meteor');                                      // 1
                                                                             //
var _mongo = require('meteor/mongo');                                        // 2
                                                                             //
var _check = require('meteor/check');                                        // 3
                                                                             //
var Tasks = exports.Tasks = new _mongo.Mongo.Collection('tasks');            // 5
                                                                             //
if (_meteor.Meteor.isServer) {                                               // 7
  // This code only runs on the server                                       //
  // Only publish tasks that are public or belong to the current user        //
  _meteor.Meteor.publish('tasks', function () {                              // 10
    function tasksPublication() {                                            // 10
      return Tasks.find({                                                    // 11
        $or: [{ 'private': { $ne: true } }, { owner: this.userId }]          // 12
      });                                                                    //
    }                                                                        //
                                                                             //
    return tasksPublication;                                                 //
  }());                                                                      //
}                                                                            //
                                                                             //
_meteor.Meteor.methods({                                                     // 20
  'tasks.insert': function () {                                              // 21
    function tasksInsert(text) {                                             //
      (0, _check.check)(text, String);                                       // 22
                                                                             //
      // Make sure the user is logged in before inserting a task             //
      if (!_meteor.Meteor.userId()) {                                        // 21
        throw new _meteor.Meteor.Error('not-authorized');                    // 26
      }                                                                      //
                                                                             //
      Tasks.insert({                                                         // 29
        text: text,                                                          // 30
        createdAt: new Date(),                                               // 31
        owner: _meteor.Meteor.userId(),                                      // 32
        username: _meteor.Meteor.user().username                             // 33
      });                                                                    //
    }                                                                        //
                                                                             //
    return tasksInsert;                                                      //
  }(),                                                                       //
  'tasks.remove': function () {                                              // 36
    function tasksRemove(taskId) {                                           //
      (0, _check.check)(taskId, String);                                     // 37
                                                                             //
      var task = Tasks.findOne(taskId);                                      // 39
      if (task['private'] && task.owner !== _meteor.Meteor.userId()) {       // 40
        // If the task is private, make sure only the owner can delete it    //
        throw new _meteor.Meteor.Error('not-authorized');                    // 42
      }                                                                      //
                                                                             //
      Tasks.remove(taskId);                                                  // 45
    }                                                                        //
                                                                             //
    return tasksRemove;                                                      //
  }(),                                                                       //
  'tasks.setChecked': function () {                                          // 47
    function tasksSetChecked(taskId, setChecked) {                           //
      (0, _check.check)(taskId, String);                                     // 48
      (0, _check.check)(setChecked, Boolean);                                // 49
                                                                             //
      var task = Tasks.findOne(taskId);                                      // 51
      if (task['private'] && task.owner !== _meteor.Meteor.userId()) {       // 52
        // If the task is private, make sure only the owner can check it off
        throw new _meteor.Meteor.Error('not-authorized');                    // 54
      }                                                                      //
                                                                             //
      Tasks.update(taskId, { $set: { checked: setChecked } });               // 57
    }                                                                        //
                                                                             //
    return tasksSetChecked;                                                  //
  }(),                                                                       //
  'tasks.setPrivate': function () {                                          // 59
    function tasksSetPrivate(taskId, setToPrivate) {                         //
      (0, _check.check)(taskId, String);                                     // 60
      (0, _check.check)(setToPrivate, Boolean);                              // 61
                                                                             //
      var task = Tasks.findOne(taskId);                                      // 63
                                                                             //
      // Make sure only the task owner can make a task private               //
      if (task.owner !== _meteor.Meteor.userId()) {                          // 59
        throw new _meteor.Meteor.Error('not-authorized');                    // 67
      }                                                                      //
                                                                             //
      Tasks.update(taskId, { $set: { 'private': setToPrivate } });           // 70
    }                                                                        //
                                                                             //
    return tasksSetPrivate;                                                  //
  }()                                                                        //
});                                                                          //
///////////////////////////////////////////////////////////////////////////////

}]}},"server":{"main.js":["meteor/meteor","../imports/api/tasks.js",function(require){

///////////////////////////////////////////////////////////////////////////////
//                                                                           //
// server/main.js                                                            //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////
                                                                             //
var _meteor = require('meteor/meteor');                                      // 1
                                                                             //
require('../imports/api/tasks.js');                                          // 2
                                                                             //
_meteor.Meteor.startup(function () {                                         // 4
  // code to run on server at startup                                        //
});                                                                          //
///////////////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json"]});
require("./server/main.js");
//# sourceMappingURL=app.js.map
