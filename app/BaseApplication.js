/**
 * This is the base Application class. All toolkit agnostic
 * configuration should go here. There are two toolkit specific
 * subclasses that are used as dependency placeholders,
 * see classic/src/Application.js and modern/src/Application.js,
 * respectively.
 *
 * An instance of this class should never be created,
 * Classic or Modern Application is used instead.
 */
Ext.define('RevenueReport.BaseApplication', {
    extend: 'Ext.app.Application',

    name: 'RevenueReport',

    quickTips: false,
    
    platformConfig: {
        desktop: {
            quickTips: true
        }
    }
});
