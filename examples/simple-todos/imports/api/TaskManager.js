import { ManagerType } from 'meteor/patmoore:meteor-collection-management';
import { Tasks } from 'tasks.js';
export default TaskManager = null;
export var TaskManagerType = ManagerType.create({
    callPrefix: 'tasks',
    meteorTopicDefinitions: [{
        'tasks': {
            cursor: function tasksPublication() {
                var thatManager = this.thatManager;
                return Tasks.find({
                  $or: [
                    { private: { $ne: true } },
                    { owner: this.userId },
                  ],
                });
            }
        }
    }],
    meteorCallDefinitions: [{
      'insert': {
          method: function(text) {
            check(text, String);
         
            // Make sure the user is logged in before inserting a task
            if (! Meteor.userId()) {
              throw new Meteor.Error('not-authorized');
            }
         
            Tasks.insert({
              text,
              createdAt: new Date(),
              owner: Meteor.userId(),
              username: Meteor.user().username,
            });
          },
          'remove': {
              method: function(taskId) {
                check(taskId, String);
        
                const task = Tasks.findOne(taskId);
                if (task.private && task.owner !== Meteor.userId()) {
                  // If the task is private, make sure only the owner can delete
                    // it
                  throw new Meteor.Error('not-authorized');
                }
        
                Tasks.remove(taskId);
              },
          },
          'setChecked': {
             method: function(taskId, setChecked) {
                check(taskId, String);
                check(setChecked, Boolean);
        
                const task = Tasks.findOne(taskId);
                if (task.private && task.owner !== Meteor.userId()) {
                  // If the task is private, make sure only the owner can check it
                    // off
                  throw new Meteor.Error('not-authorized');
                }
             
                Tasks.update(taskId, { $set: { checked: setChecked } });
             },
          },
          'setPrivate': {
              method: function(taskId, setToPrivate) {
                check(taskId, String);
                check(setToPrivate, Boolean);
             
                const task = Tasks.findOne(taskId);
             
                // Make sure only the task owner can make a task private
                if (task.owner !== Meteor.userId()) {
                  throw new Meteor.Error('not-authorized');
                }
             
                Tasks.update(taskId, { $set: { private: setToPrivate } });
              },
          }
    }]
});
