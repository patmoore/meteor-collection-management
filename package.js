var packageName = 'patmoore:meteor-collection-management';

var externalPackages = [
    'mongo@1.1.9',
    'underscore@1.0.9',
    'ejson@1.0.12',
    'ecmascript@0.4.5',
    'aldeed:simple-schema@1.5.3',
    'aldeed:collection2@2.9.1',
    'modules@0.6.3',
    'check@1.2.1',
    'mdg:validation-error@0.5.1'
]
Package.describe({
    name: packageName,
    summary: "Meteor Collection Management",
    version: "2.0.2",
    git: "https://github.com/patmoore/meteor-collection-management.git"
});

Package.onUse(function (api) {
    externalPackages.forEach(function(packageName) {
        api.use(packageName);
    });
    api.mainModule("src/server/index.js", "server");
    api.mainModule("src/client/index.js", "client");

    api.export('DbObjectType');
    api.export('ManagerType');
    api.export('Enums');
    api.export('one', "client");
    api.export('many', "client");
    api.export('count', "client");
    api.export('IronRouterExtension', "client");
});

Package.onTest(function (api) {
    api.use([packageName, 'tinytest', 'test-helpers']);
    externalPackages.forEach(function(packageName) {
        api.use(packageName);
    });
    api.addFiles('src/tests/dbobject-test.js', ['client', 'server']);
    api.addFiles('src/tests/enums-test.js', ['client', 'server']);
    api.addFiles('src/tests/manager-test.js', ['client', 'server']);
    api.addFiles('src/tests/testUnderscoreExtensions.js', ['client', 'server']);
});
