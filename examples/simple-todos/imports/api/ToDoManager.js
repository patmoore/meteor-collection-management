import { ManagerType } from 'meteor/patmoore:meteor-collection-management';

export default ToDoManager = null;
export var ToDoManager = ManagerType.create({
	callPrefix: 'ToDoManager',

});