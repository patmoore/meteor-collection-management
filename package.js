var packageName = 'patmoore:meteor-collection-management';

var  mongo = 'mongo@1.1.9';
var underscore = 'underscore@1.0.9';
var ejson = 'ejson@1.0.12';
var ecmascript = 'ecmascript@0.4.5';
var modules = 'modules@0.6.3';
Package.describe({
    name: packageName,
    summary: "Meteor Collection Management",
    version: "2.0.2",
    git: "https://github.com/patmoore/meteor-collection-management.git"
});

Package.onUse(function (api) {
    api.use(ejson, ['client', 'server']);
    api.use(underscore, ['client', 'server']);
    api.use(ecmascript, ['client', 'server']);
    api.use(mongo, ['client', 'server']);
    api.use(modules);
    api.mainModule("src/server/index.js", "server");
    api.mainModule("src/client/index.js", "client");

    api.export('DbObjectType');
    api.export('ManagerType');
    api.export('Enums');
    api.export('one');
    api.export('many');
    api.export('count');
    api.export('IronRouterExtension');

//    api.addFiles('src/lib/internalutils.js', ['client', 'server']);
//    api.addFiles('src/lib/underscoreExtensions.js', ['client', 'server']);
//    api.addFiles('src/lib/enums.js', ['client', 'server']);
//    api.addFiles('src/lib/dbobject.js', ['client', 'server']);
//    api.addFiles('src/lib/manager.js', ['client', 'server']);
//    api.addFiles('src/client/ironRouterExtensions.js', ['client']);
//    api.addFiles('src/client/manager.js', ['client' ]);
//    api.addFiles('src/server/manager.js', 'server');
});

Package.onTest(function (api) {
    api.use([packageName, 'tinytest', 'test-helpers']);
    api.use(underscore, ['client', 'server']);
    api.use(ecmascript, ['client', 'server']);
    api.use(mongo, ['client', 'server']);
    api.addFiles('src/tests/dbobject-test.js', ['client', 'server']);
    api.addFiles('src/tests/enums-test.js', ['client', 'server']);
    api.addFiles('src/tests/manager-test.js', ['client', 'server']);
    api.addFiles('src/tests/testUnderscoreExtensions.js', ['client', 'server']);
});
