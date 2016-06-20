# Collection manager abstraction for Meteor.

[![Build Status](https://travis-ci.org/whalepath/meteor-collection-management.svg?branch=master)](https://travis-ci.org/whalepath/meteor-collection-management)

Meteor-Collection-Management takes Meteor's concept of javascript code that runs on both the client and the server to the next level when it comes to collection management.

## Quick Start

[ConvertingToMeteorCollectionManagement](ConvertingToMeteorCollectionManagement.md)
### Managers 

Managers are combine Meteor.method/Meteor.call and Meteor.publish/Meteor.subcribe functionality.

Managers have 3 files.

* /import/startup/lib/managers/xxxManager.js
* /import/startup/client/managers/xxxManager.js
* /import/startup/server/managers/xxxManager.js

### Creating a new topic



## Creating new object.

On client:
```javascript
        var jsonInput = <from the html input fields>
        jsonInput._newId = <client_generated_id>
        MyManager.meteorCreateCall(
            new MyDbObject(jsonInput),
            callback
        );
```

On server:
```javascript

    meteorCreateCall: {
        method: function (myDbObject_client) {
            var thatManager = this.thatManager;
            myDbObject = new MyObject(myDbObject_client);
            myDbObject._save();
        }
    }
```

Note:

1. The _id field is a security field. To set allow the client to set the _id for a new object, the _newId property is used.

## Update an object

On client:

```javascript
        var jsonInput = <from the html input fields>
        MyManager.meteorUpdateCall(
            new MyDbObject(jsonInput),
            callback
        );
```

On server:

```javascript
MyManagerType = ManagerType.create(
       ....    
       meteorUpdateCall: {
           method: function (myDbObject) {
               var thatManager = this.thatManager;
               check(myDbObject, MyDbObject);
               myDbObject = myDbObject.upsertFromUntrusted({
                   forcedValues: {
                       // key:values that are forced to a specific value
                       {
                           property1: "property1 is set to this string irregardless of what was sent from client"
                       }
                   }
                });
           },
       },
```

Some key notes:

 1. The client creates an object and sends an object. This provides a consistent, standard way of sending object changes to the server.
 1. The client does not need to have all the information in the transmitted myDbObject. Only the _id and the fields that change are sent.
 1. The use of upsertFromUntrusted is an important difference from the code that creates a new object. Using this function, the client code is unable to change
security:true properties. For example, MyDbObject has a userId field that stores the Meteor.userId() of the user who owns the object. upsertFromUntrusted prevents the userId field from being changed.
 1. Any property not listed in the DbObjectType definition for MyDBObjectType is discarded. This prevents accidental garbage from being stored.

## Getting started

./create.sh ManagerName to create an example
Create the common code in : ./lib/managers
./lib/managers



## Challenges with today's reality

Companies are faced with the reality that developers:

 1. have differing skill levels
 1. have differing levels of involvement with the code - for example some developers may jump in to fix a few items before
 working on other projects. A prime example is UX/UI designers - who may not have the time or motivation to understand all the intricacies of proper Meteor development
 1. leave for new opportunities

Furthermore, companies, in particular startups,:
 1. have staff turnover,
 1. need fast ramp up time for new developers or summer interns. New and temporary staff needs to be reliable productive in the Meteor development the day they start work,
 1. Need to builtin data security that prevents new developers from introducing security holes.

The minimized onboarding time is critical. New hires need to be productive the FIRST day of work.

Learning a new framework always has a learning curve. Using MCM companies minimize the possibility, that
 a new hire will introduce a set of common bugs and security holes such as:

 1. subscribing to a non-existent publication
 1. publishing a publication with an incorrect name
 1. on client-side using the wrong query on the client-side collections
 1. allowing client code to alter document fields that that are not permitted.


MCM focus is on:

 1. Further reduction of duplicated code so as to allow even more code reuse between the client and the server
 than what Meteor already provides.
 
 2. Eliminate annoying avoidable errors:
 
    1. topic or method name changes.
    2. provide automatic topic/method name federation to avoid mysterious behavior with similar names.
    3. dangling subscribes - clients subscribing to topics no longer published by the server.
 
 3. Provide a standard client/server collections mechanism that offers:
 
    1. Consistent read/write to/from the database across the wire 
    2. Ability to attach security access rules
    3. Secured fields: secured fields are not modifiable by client.
    4. Consistent code for client-side only collections

 4. Cursor/Method security

    1. Security checks can be applied on both the client and the server
    2. Flexible security checks alter the cursor/method arguments to impose conditions depending on user


Subscription/Publish gaps:

 1. Code to populate a subscription on the server is duplicated on the client.
 1. The client and the server must agree on the same publication name and the same subscription arguments.
 1. There is no provision for orthogonally applying security checks
 
Method calls face similar issues:


TODO: Namespace the mcm

TODO add proper description.

# What Meteor Collection Management (MCM) is for

## Problems MCM solves
* TODO: fill out

## Problems MCM should solve
* TODO: fill out

##To maintainers
To run tests locally run following: 

```meteor test-packages ./```
```./run-test-server.sh```

## to understand
* look in lib/manager.js
* find ManagerType.create

## TODO: how to do testing on the client/ server/ manager code?


Note: meteor-package-paths ( https://www.npmjs.org/package/meteor-package-paths ) is useful to maintain the package file list.
