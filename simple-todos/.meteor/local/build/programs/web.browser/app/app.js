var require = meteorInstall({"imports":{"ui":{"body.html":["./template.body.js",function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// imports/ui/body.html                                                                                         //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
module.exports = require("./template.body.js");                                                                 // 1
                                                                                                                // 2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"template.body.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// imports/ui/template.body.js                                                                                  //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
                                                                                                                // 1
Template.body.addContent((function() {                                                                          // 2
  var view = this;                                                                                              // 3
  return HTML.DIV({                                                                                             // 4
    "class": "container"                                                                                        // 5
  }, "\n    ", HTML.HEADER("\n      ", HTML.H1("Todo List (", Blaze.View("lookup:incompleteCount", function() {
    return Spacebars.mustache(view.lookup("incompleteCount"));                                                  // 7
  }), ")"), "\n\n\n      ", HTML.Raw('<label class="hide-completed">\n        <input type="checkbox">\n        Hide Completed Tasks\n      </label>'), "\n\n        ", Spacebars.include(view.lookupTemplate("loginButtons")), "\n\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));                                                          // 9
  }, function() {                                                                                               // 10
    return [ "\n        ", HTML.FORM({                                                                          // 11
      "class": "new-task"                                                                                       // 12
    }, "\n          ", HTML.INPUT({                                                                             // 13
      type: "text",                                                                                             // 14
      name: "text",                                                                                             // 15
      placeholder: "Type to add new tasks"                                                                      // 16
    }), "\n        "), "\n      " ];                                                                            // 17
  }), "\n      \n    "), "\n \n    ", HTML.UL("\n      ", Blaze.Each(function() {                               // 18
    return Spacebars.call(view.lookup("tasks"));                                                                // 19
  }, function() {                                                                                               // 20
    return [ "\n        ", Spacebars.include(view.lookupTemplate("task")), "\n      " ];                        // 21
  }), "\n    "), "\n  ");                                                                                       // 22
}));                                                                                                            // 23
Meteor.startup(Template.body.renderToDocument);                                                                 // 24
                                                                                                                // 25
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"task.html":["./template.task.js",function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// imports/ui/task.html                                                                                         //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
module.exports = require("./template.task.js");                                                                 // 1
                                                                                                                // 2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"template.task.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// imports/ui/template.task.js                                                                                  //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
                                                                                                                // 1
Template.__checkName("task");                                                                                   // 2
Template["task"] = new Template("Template.task", (function() {                                                  // 3
  var view = this;                                                                                              // 4
  return HTML.LI({                                                                                              // 5
    "class": function() {                                                                                       // 6
      return [ Blaze.If(function() {                                                                            // 7
        return Spacebars.call(view.lookup("checked"));                                                          // 8
      }, function() {                                                                                           // 9
        return "checked";                                                                                       // 10
      }), " ", Blaze.If(function() {                                                                            // 11
        return Spacebars.call(view.lookup("private"));                                                          // 12
      }, function() {                                                                                           // 13
        return "private";                                                                                       // 14
      }) ];                                                                                                     // 15
    }                                                                                                           // 16
  }, HTML.Raw('\n    <button class="delete">&times;</button>\n \n    '), HTML.INPUT({                           // 17
    type: "checkbox",                                                                                           // 18
    checked: function() {                                                                                       // 19
      return Spacebars.mustache(view.lookup("checked"));                                                        // 20
    },                                                                                                          // 21
    "class": "toggle-checked"                                                                                   // 22
  }), "\n\n    ", Blaze.If(function() {                                                                         // 23
    return Spacebars.call(view.lookup("isOwner"));                                                              // 24
  }, function() {                                                                                               // 25
    return [ "\n      ", HTML.BUTTON({                                                                          // 26
      "class": "toggle-private"                                                                                 // 27
    }, "\n        ", Blaze.If(function() {                                                                      // 28
      return Spacebars.call(view.lookup("private"));                                                            // 29
    }, function() {                                                                                             // 30
      return "\n          Private\n        ";                                                                   // 31
    }, function() {                                                                                             // 32
      return "\n          Public\n        ";                                                                    // 33
    }), "\n      "), "\n    " ];                                                                                // 34
  }), "\n \n    ", HTML.SPAN({                                                                                  // 35
    "class": "text"                                                                                             // 36
  }, HTML.STRONG(Blaze.View("lookup:username", function() {                                                     // 37
    return Spacebars.mustache(view.lookup("username"));                                                         // 38
  })), " - ", Blaze.View("lookup:text", function() {                                                            // 39
    return Spacebars.mustache(view.lookup("text"));                                                             // 40
  })), "\n  ");                                                                                                 // 41
}));                                                                                                            // 42
                                                                                                                // 43
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"body.js":["meteor/meteor","meteor/templating","../api/tasks.js","meteor/reactive-dict","./task.js","./body.html",function(require){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// imports/ui/body.js                                                                                           //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
var _meteor = require('meteor/meteor');                                                                         // 1
                                                                                                                //
var _templating = require('meteor/templating');                                                                 // 2
                                                                                                                //
var _tasks = require('../api/tasks.js');                                                                        // 3
                                                                                                                //
var _reactiveDict = require('meteor/reactive-dict');                                                            // 4
                                                                                                                //
require('./task.js');                                                                                           // 6
                                                                                                                //
require('./body.html');                                                                                         // 7
                                                                                                                //
_templating.Template.body.onCreated(function () {                                                               // 9
  function bodyOnCreated() {                                                                                    // 9
    this.state = new _reactiveDict.ReactiveDict();                                                              // 10
    _meteor.Meteor.subscribe('tasks');                                                                          // 11
  }                                                                                                             //
                                                                                                                //
  return bodyOnCreated;                                                                                         //
}());                                                                                                           //
                                                                                                                //
_templating.Template.body.helpers({                                                                             // 14
  tasks: function () {                                                                                          // 15
    function tasks() {                                                                                          //
                                                                                                                //
      var instance = _templating.Template.instance();                                                           // 17
      if (instance.state.get('hideCompleted')) {                                                                // 18
        // If hide completed is checked, filter tasks                                                           //
        return _tasks.Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });                      // 20
      }                                                                                                         //
                                                                                                                //
      // Otherwise, return all of the tasks                                                                     //
      return _tasks.Tasks.find({}, { sort: { createdAt: -1 } });                                                // 15
    }                                                                                                           //
                                                                                                                //
    return tasks;                                                                                               //
  }(),                                                                                                          //
  incompleteCount: function () {                                                                                // 26
    function incompleteCount() {                                                                                //
      return _tasks.Tasks.find({ checked: { $ne: true } }).count();                                             // 27
    }                                                                                                           //
                                                                                                                //
    return incompleteCount;                                                                                     //
  }()                                                                                                           //
});                                                                                                             //
                                                                                                                //
_templating.Template.body.events({                                                                              // 31
  'submit .new-task': function () {                                                                             // 32
    function submitNewTask(event) {                                                                             //
      // Prevent default browser form submit                                                                    //
      event.preventDefault();                                                                                   // 34
                                                                                                                //
      // Get value from form element                                                                            //
      var target = event.target;                                                                                // 32
      var text = target.text.value;                                                                             // 38
                                                                                                                //
      _meteor.Meteor.call('tasks.insert', text);                                                                // 40
                                                                                                                //
      // Clear form                                                                                             //
      target.text.value = '';                                                                                   // 32
    }                                                                                                           //
                                                                                                                //
    return submitNewTask;                                                                                       //
  }(),                                                                                                          //
  'change .hide-completed input': function () {                                                                 // 46
    function changeHideCompletedInput(event, instance) {                                                        //
      instance.state.set('hideCompleted', event.target.checked);                                                // 47
    }                                                                                                           //
                                                                                                                //
    return changeHideCompletedInput;                                                                            //
  }()                                                                                                           //
});                                                                                                             //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"task.js":["meteor/meteor","meteor/templating","../api/tasks.js","./task.html",function(require){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// imports/ui/task.js                                                                                           //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
var _meteor = require('meteor/meteor');                                                                         // 1
                                                                                                                //
var _templating = require('meteor/templating');                                                                 // 2
                                                                                                                //
var _tasks = require('../api/tasks.js');                                                                        // 4
                                                                                                                //
require('./task.html');                                                                                         // 6
                                                                                                                //
_templating.Template.task.helpers({                                                                             // 8
  isOwner: function () {                                                                                        // 9
    function isOwner() {                                                                                        //
      return this.owner === _meteor.Meteor.userId();                                                            // 10
    }                                                                                                           //
                                                                                                                //
    return isOwner;                                                                                             //
  }()                                                                                                           //
});                                                                                                             //
                                                                                                                //
_templating.Template.task.events({                                                                              // 14
  'click .toggle-checked': function () {                                                                        // 15
    function clickToggleChecked() {                                                                             //
      // Set the checked property to the opposite of its current value                                          //
      _meteor.Meteor.call('tasks.setChecked', this._id, !this.checked);                                         // 17
    }                                                                                                           //
                                                                                                                //
    return clickToggleChecked;                                                                                  //
  }(),                                                                                                          //
  'click .delete': function () {                                                                                // 19
    function clickDelete() {                                                                                    //
      _meteor.Meteor.call('tasks.remove', this._id);                                                            // 20
    }                                                                                                           //
                                                                                                                //
    return clickDelete;                                                                                         //
  }(),                                                                                                          //
  'click .toggle-private': function () {                                                                        // 22
    function clickTogglePrivate() {                                                                             //
      _meteor.Meteor.call('tasks.setPrivate', this._id, !this['private']);                                      // 23
    }                                                                                                           //
                                                                                                                //
    return clickTogglePrivate;                                                                                  //
  }()                                                                                                           //
});                                                                                                             //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"api":{"tasks.js":["meteor/meteor","meteor/mongo","meteor/check",function(require,exports){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// imports/api/tasks.js                                                                                         //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
exports.__esModule = true;                                                                                      //
exports.Tasks = undefined;                                                                                      //
                                                                                                                //
var _meteor = require('meteor/meteor');                                                                         // 1
                                                                                                                //
var _mongo = require('meteor/mongo');                                                                           // 2
                                                                                                                //
var _check = require('meteor/check');                                                                           // 3
                                                                                                                //
var Tasks = exports.Tasks = new _mongo.Mongo.Collection('tasks');                                               // 5
                                                                                                                //
if (_meteor.Meteor.isServer) {                                                                                  // 7
  // This code only runs on the server                                                                          //
  // Only publish tasks that are public or belong to the current user                                           //
  _meteor.Meteor.publish('tasks', function () {                                                                 // 10
    function tasksPublication() {                                                                               // 10
      return Tasks.find({                                                                                       // 11
        $or: [{ 'private': { $ne: true } }, { owner: this.userId }]                                             // 12
      });                                                                                                       //
    }                                                                                                           //
                                                                                                                //
    return tasksPublication;                                                                                    //
  }());                                                                                                         //
}                                                                                                               //
                                                                                                                //
_meteor.Meteor.methods({                                                                                        // 20
  'tasks.insert': function () {                                                                                 // 21
    function tasksInsert(text) {                                                                                //
      (0, _check.check)(text, String);                                                                          // 22
                                                                                                                //
      // Make sure the user is logged in before inserting a task                                                //
      if (!_meteor.Meteor.userId()) {                                                                           // 21
        throw new _meteor.Meteor.Error('not-authorized');                                                       // 26
      }                                                                                                         //
                                                                                                                //
      Tasks.insert({                                                                                            // 29
        text: text,                                                                                             // 30
        createdAt: new Date(),                                                                                  // 31
        owner: _meteor.Meteor.userId(),                                                                         // 32
        username: _meteor.Meteor.user().username                                                                // 33
      });                                                                                                       //
    }                                                                                                           //
                                                                                                                //
    return tasksInsert;                                                                                         //
  }(),                                                                                                          //
  'tasks.remove': function () {                                                                                 // 36
    function tasksRemove(taskId) {                                                                              //
      (0, _check.check)(taskId, String);                                                                        // 37
                                                                                                                //
      var task = Tasks.findOne(taskId);                                                                         // 39
      if (task['private'] && task.owner !== _meteor.Meteor.userId()) {                                          // 40
        // If the task is private, make sure only the owner can delete it                                       //
        throw new _meteor.Meteor.Error('not-authorized');                                                       // 42
      }                                                                                                         //
                                                                                                                //
      Tasks.remove(taskId);                                                                                     // 45
    }                                                                                                           //
                                                                                                                //
    return tasksRemove;                                                                                         //
  }(),                                                                                                          //
  'tasks.setChecked': function () {                                                                             // 47
    function tasksSetChecked(taskId, setChecked) {                                                              //
      (0, _check.check)(taskId, String);                                                                        // 48
      (0, _check.check)(setChecked, Boolean);                                                                   // 49
                                                                                                                //
      var task = Tasks.findOne(taskId);                                                                         // 51
      if (task['private'] && task.owner !== _meteor.Meteor.userId()) {                                          // 52
        // If the task is private, make sure only the owner can check it off                                    //
        throw new _meteor.Meteor.Error('not-authorized');                                                       // 54
      }                                                                                                         //
                                                                                                                //
      Tasks.update(taskId, { $set: { checked: setChecked } });                                                  // 57
    }                                                                                                           //
                                                                                                                //
    return tasksSetChecked;                                                                                     //
  }(),                                                                                                          //
  'tasks.setPrivate': function () {                                                                             // 59
    function tasksSetPrivate(taskId, setToPrivate) {                                                            //
      (0, _check.check)(taskId, String);                                                                        // 60
      (0, _check.check)(setToPrivate, Boolean);                                                                 // 61
                                                                                                                //
      var task = Tasks.findOne(taskId);                                                                         // 63
                                                                                                                //
      // Make sure only the task owner can make a task private                                                  //
      if (task.owner !== _meteor.Meteor.userId()) {                                                             // 59
        throw new _meteor.Meteor.Error('not-authorized');                                                       // 67
      }                                                                                                         //
                                                                                                                //
      Tasks.update(taskId, { $set: { 'private': setToPrivate } });                                              // 70
    }                                                                                                           //
                                                                                                                //
    return tasksSetPrivate;                                                                                     //
  }()                                                                                                           //
});                                                                                                             //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"startup":{"accounts-config.js":["meteor/accounts-base",function(require){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// imports/startup/accounts-config.js                                                                           //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
var _accountsBase = require('meteor/accounts-base');                                                            // 1
                                                                                                                //
_accountsBase.Accounts.ui.config({                                                                              // 3
  passwordSignupFields: 'USERNAME_ONLY'                                                                         // 4
});                                                                                                             //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},"client":{"main.js":["../imports/startup/accounts-config.js","../imports/ui/body.js",function(require){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                              //
// client/main.js                                                                                               //
//                                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                //
require('../imports/startup/accounts-config.js');                                                               // 1
                                                                                                                //
require('../imports/ui/body.js');                                                                               // 2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json",".html",".css"]});
require("./client/main.js");