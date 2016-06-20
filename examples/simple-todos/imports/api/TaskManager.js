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
		
	}]
});