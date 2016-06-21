import { DbObjectType } from 'meteor/patmoore:meteor-collection-management';

export var Tasks = DbObjectType.create({
  databaseTableName: 'tasks',
  properties: ['text', 'owner', 'username'],
  typeName: 'task'
});
