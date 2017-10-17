/**
 * Shared initialization
 */
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
jasmine.TOP_SUITE_PREFIX = /^RevenueReport/;

// These need to be assigned after Ext has been loaded
jasmine.startLoadingDependencies = Ext.require;

jasmine.installDependenciesCallback = function(callback) {
    // We unblock the queue on ready instead of require callback
    // becase we want `uses` classes to finish loading, too
    Ext.onReady(callback, null, { priority: -9000 });
};
