#!/bin/sh
if [ $# = 0 ] ; then 
    cat <<HELP
$0 ManagerName
HELP
    exit 1
fi
fileName=$1.js
varName=$1
javascriptTypeName=${varName}Type
serverDir=${2:-server/lib/managers}
clientDir=${3:-client/lib/managers}
commonDir=${4:-./lib/managers}
mkdir -p $serverDir
mkdir -p $clientDir
mkdir -p $commonDir
cat <<EOM >>$commonDir/${fileName}
${varName} = null;

${javascriptTypeName} = ManagerType.create({
    callPrefix: '${varName}',
    meteorCallDefinitions: [ {
        'nameOfMeteorCall1': {
            permissionCheck: 'public'
        },
        'nameOfMeteorCall2': {
            permissionCheck: suPermissionCheck
        }
    }],
    meteorTopicDefinitions: [ {
        'topicNameThatWillBeSubscribedTo': {
            permissionCheck: suPermissionCheck,
            cursor: function(argument0, argument1) {
                var thatManager= this.thatManager;
                var userId = thatManager.userId;
                // return the cursor: used on both client and server
            },
            derived: {
                count: {

                }
            }
        },
    }],
});
/**
 * client and server code has now run.
 */
Meteor.startup(function(){
    Object.freeze(${javascriptTypeName}.prototype);
    ${varName} = new ${javascriptTypeName}();
});
EOM
echo "Created $commonDir/${fileName}"

cat <<EOM >> $serverDir/${fileName}
Meteor.startup(function() {
    'use strict';
    _.extend(${javascriptTypeName}.prototype, {
        ctor: function() {
            var thatManager = this.thatManager;
            // server specific setup
        },
        'nameOfMeteorCall1Method': function(passedArgs) {
            var thatManager = this.thatManager;
        },
        'nameOfMeteorCall2Method': function(passedArgs) {
            var thatManager = this.thatManager;
        }
    });
});
EOM
echo "Created $serverDir/${fileName}"

cat <<EOM >> $clientDir/${fileName}
Meteor.startup(function(){
    'use strict';
    // keep subscriptions that depend on other meteor variables refreshed
    var trackADependencyThatShouldAlwaysRun = new Tracker.Dependency;
    _.extend(${javascriptTypeName}.prototype, {
        ctor: function() {
            var thatManager = this.thatManager;
            // client specific setup
            thatManager.startup(function() {
                Tracker.autorun(function () {
                    trackADependencyThatShouldAlwaysRun.changed();
                    var userId = thatManager.userId;
                    thatManager._ATopicHandle = AnotherManager.ATopicHandle(userId);
                });
            });
        },
    });
});
EOM
echo "Created $clientDir/${fileName}"
