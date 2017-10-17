/*
 * This call registers your application to be launched when the browser is ready.
 */
Ext.application({
    extend: 'RevenueReport.Application',
    name: 'RevenueReport',

    requires: [
        'RevenueReport.*'
    ],

    mainView: 'RevenueReport.view.main.Main'
});
