var packageName = 'patmoore:meteor-collection-management';

var  mongo = 'mongo@1.1.9';
var underscore = 'underscore@1.0.9';
var ejson = 'ejson@1.0.12';
Package.describe({
    name: packageName,
    summary: "Meteor Collection Management",
    version: "1.9.7",
    git: "https://github.com/patmoore/meteor-collection-management.git"
});

Package.onUse(function (api) {
    api.use(ejson, ['client', 'server']);
    api.use(underscore, ['client', 'server']);
    api.use(mongo, ['client', 'server']);

    api.export('DbObjectType');
    api.export('ManagerType');
    api.export('Enums');
    api.export('one');
    api.export('many');
    api.export('count');
    api.export('IronRouterExtension');

    api.addFiles('src/lib/internalutils.js', ['client', 'server']);
    api.addFiles('src/lib/underscoreExtensions.js', ['client', 'server']);
    api.addFiles('src/lib/enums.js', ['client', 'server']);
    api.addFiles('src/lib/dbobject.js', ['client', 'server']);
    api.addFiles('src/lib/manager.js', ['client', 'server']);
    api.addFiles('src/client/ironRouterExtensions.js', ['client']);
    api.addFiles('src/client/manager.js', ['client' ]);
    api.addFiles('src/server/manager.js', 'server');
});

Package.onTest(function (api) {
    api.use([packageName, 'tinytest', 'test-helpers']);
    api.use(underscore, ['client', 'server']);
    api.use(mongo, ['client', 'server']);
    api.addFiles('src/tests/dbobject-test.js', ['client', 'server']);
    api.addFiles('src/tests/enums-test.js', ['client', 'server']);
    api.addFiles('src/tests/manager-test.js', ['client', 'server']);
    api.addFiles('src/tests/testUnderscoreExtensions.js', ['client', 'server']);
});
