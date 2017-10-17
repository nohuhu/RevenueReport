/**
 * Base class for Revenue Report view. This class is never instantiated
 * and thus does not have xtype; instead we create instances of
 * Classic or Modern subclasses, respectively.
 *
 * All shared dependencies and configuration goes here.
 */
Ext.define('RevenueReport.view.report.Revenue', {
    extend: 'Ext.panel.Panel',
    
    requires: [
        'RevenueReport.model.Revenue',
        'RevenueReport.store.Revenue',
        'RevenueReport.view.report.RevenueModel',
        'RevenueReport.view.report.RevenueController',
        'RevenueReport.view.report.FiscalYearSelector',
        'RevenueReport.view.report.Chart',
        'RevenueReport.view.report.Grid'
    ],
    
    controller: 'report-revenue',
    viewModel: 'report-revenue',
    
    defaults: {
        padding: 10
    },
    
    // This is a bit hacky but ok for demo purposes
    autoLoad: true
});
