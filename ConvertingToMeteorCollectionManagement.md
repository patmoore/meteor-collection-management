## Author's Note

**Please accept that what follows is my opinion, based on my experiences with meteor in a startup team.**

The key problems I faced were maintainability. The original app was easy to create. The problem was when
modifications, particularly modifications by multiple people of different skill levels.

In a number of places, people will disagree with me and say "this is just an example". It is true, however I have found that beginners model the examples and take the patterns shown in the examples to production code.

Examples are how meteor developers model correct project layout and correct coding style.

# Converting Meteor example: simple-todos

The best way to understand why meteor-collection-management exists is to convert the simple-todos example and understand what errors are avoided through use of meteor-collection-management.

## Topics: Meteor.publish/Meteor.subscribe

The original tasks.js:

```javascript
export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'tasks.insert'(text) {
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
  'tasks.remove'(taskId) {
    check(taskId, String);

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Tasks.remove(taskId);
  },
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }
 
    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
  'tasks.setPrivate'(taskId, setToPrivate) {
    check(taskId, String);
    check(setToPrivate, Boolean);
 
    const task = Tasks.findOne(taskId);
 
    // Make sure only the task owner can make a task private
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Tasks.update(taskId, { $set: { private: setToPrivate } });
  },
});
```


Has these key maintainability issues:

1. tasks.insert:
  1. function has no mechanism to ensure that all the required fields are present.
  1. renaming the function argument 'text' to 'todoText' would cause new objects to be inserted with different fields that the objects already present.
1. tasks - subscription:
  1. The publish uses a query function that is not available to the client. When the client does the subscription it needs to duplicate the same query run on the server. This shows up as an error
