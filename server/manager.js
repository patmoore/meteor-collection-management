Meteor.startup(function() {
    _.extend(ManagerType.prototype, {
        /**
         * create the Meteor.method hook:
         * Meteor.method({ <managers_prefix>+meteorCallDefinition : function that will invoke the manager stubName function with this set to the manager instance );
         * @param meteorCallDefinition
         */
        createMeteorCallMethod : function(meteorCallDefinition) {
            var that = this;
            var trackingEventKey;
            if ( typeof(meteorCallDefinition) == "undefined" || meteorCallDefinition == null) {
                return;
            } else if ( typeof(meteorCallDefinition) === "object") {
                meteorCallNameSuffix = meteorCallDefinition.callName;
                trackingEventKey = meteorCallDefinition.trackingEventKey;
            } else {
                // assumed meteorCallDefinition is string
                meteorCallNameSuffix = meteorCallDefinition;
            }
            var callName = this.getMeteorCallName(meteorCallNameSuffix);

            var methods = {};
            // make sure that the subclass manager is bound as the 'this' parameter when the Meteor method is called.
            if ( typeof(that[meteorCallNameSuffix]) !== "function") {
                // TODO: display better
                throw new Meteor.Error(500, that.toString() +"."+meteorCallNameSuffix+" is not a function");
            }
            methods[callName] = that[meteorCallNameSuffix].bind(that);
            Meteor.methods(methods);
        },
        /**
         * Creates a Meteor topic with Meteor.publish()
         * Meteor.publish/subscribe has a useful 'this' so we want to make the manager available via another route.
         * 
         * This function is called from the ManagerType constructor.
         * 
         * Access the topic name, topic cursor function, and thatManager in the cursor function:
         *   this.topicCursorFunction.thatManager
         *   this.topicCursorFunction.topicName
         *
         *       properties are available.
         *
         * 
         * @param meteorTopicSuffix
         */
        createTopic : function(meteorTopicSuffix) {
            var thatManager = this;
            var topicName = this.getMeteorTopicName(meteorTopicSuffix);
            thatManager.log("Creating topic: "+topicName);
            var topicCursorFunction = thatManager.getMeteorTopicCursorFunction(meteorTopicSuffix);
            // make the current manager available on cursor when doing publish subscribe.
            Object.defineProperties(topicCursorFunction, {
                thatManager: {
                    writable: false,
                    value: thatManager
                },
                topicName: {
                    writable: false,
                    value: topicName
                },
                meteorTopicSuffix : {
                    writable: false,
                    value: meteorTopicSuffix
                }
            });

            // insure that this.ready() is called when the no data is returned. (required for spiderable to work)
            var wrappedFn = function() {
                // Question: this should be o.k. because we don't have the cursor (this) reused. (not certain about last statement)
                this.topicCursorFunction = topicCursorFunction;
                var returnedValue = topicCursorFunction.apply(this, arguments);
                if ( returnedValue == null || returnedValue === false) {
                    // required for spiderable to work
                    // see: http://www.meteorpedia.com/read/spiderable
                    returnedValue = null;
                    this.ready();
                } else if ( returnedValue === true ) {
                    // true means we would like to return null *but* the ready method was already called
                    returnedValue = null;
                }
                return returnedValue;
            }
            Meteor.publish(topicName, wrappedFn);
        },
        redirect: function(url, router) {
            router.response.statusCode = 302;
            if ( url == null ) {
                url = Meteor.absoluteUrl();
            }
            // TODO: alter window history so that a 'go back' goes to the previous whalepath page ( not this redirect page )
            // TODO: except if the previous page is a non-whalepath page.
            router.response.setHeader('Location', url);
        }
    });
    Object.defineProperties(ManagerType.prototype, {
        userId : {
            get : function() {
                // 26 mar 2014 mimics the meteor check in Meteor.userId() to avoid exception being thrown
                var currentInvocation = DDP._CurrentInvocation.get();
                if ( currentInvocation) {
                    return Meteor.userId;
                } else {
                    return null;
                }
            }
        }
    });
});
