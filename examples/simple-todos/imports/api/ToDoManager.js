import { ManagerType } from 'meteor/patmoore:meteor-collection-management';

export default ToDoManager = null;
export var ToDoManager = ManagerType.create({
	callPrefix: 'ToDoManager',
	meteorTopicDefinitions: [{
		'tasks': {
			cursor: function tasksPublication() {
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
		
	}]
});