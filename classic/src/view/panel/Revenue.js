/**
 * This is Classic toolkit specific class for Revenue Report panel.
 */
Ext.define('RevenueReport.view.panel.Revenue', {
    extend: 'RevenueReport.view.report.Revenue',
    
    xtype: 'report-revenue-classic',
    
    requires: [
        'Ext.tip.QuickTipManager'
    ],
    
    // Classic toolkit layouts are calculated in JavaScript,
    // and sometimes they don't behave well. I didn't have
    // enough time to come up with more elegant solution.
    height: 450,
    width: '100%',
    
    layout: {
        type: 'hbox',
        align: 'stretch',
        pack: 'start'
    },

    items: [{
        xtype: 'view-report-fiscal-year-selector',
        minWidth: 150
    }, {
        xtype: 'view-report-chart',
        minWidth: 400
    }, {
        xtype: 'view-report-grid',
        flex: 2
    }]
});
