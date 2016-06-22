var packageName = 'patmoore:meteor-collection-management';

var  mongo = 'mongo';
var underscore = 'underscore';
var ejson = 'ejson';
var ecmascript = 'ecmascript';
Package.describe({
    name: packageName,
    summary: "Meteor Collection Management",
    version: "2.0.1",
    git: "https://github.com/patmoore/meteor-collection-management.git"
});

Package.onUse(function (api) {
    api.use(ejson, ['client', 'server']);
    api.use(underscore, ['client', 'server']);
    api.use(ecmascript, ['client', 'server']);
    api.use(mongo, ['client', 'server']);
    api.use("modules");
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
