/**
 * This is Modern toolkit specific class for Revenue Report panel.
 */
Ext.define('RevenueReport.view.panel.Revenue', {
    extend: 'RevenueReport.view.report.Revenue',
    
    xtype: 'report-revenue-modern',
    
    mixins: [
        'Ext.mixin.Responsive'
    ],
    
    // When orientation changes, Responsive mixin will set
    // the values defined below.
    responsiveConfig: {
        landscape: {
            // Grids are picky and want a height
            maxHeight: 450,
            maxWidth: '100%',
    
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'start'
            }
        },
        portrait: {
            maxWidth: 450,
            maxHeight: '100%',
            
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'start'
            }
        }
    },
    
    items: [
        { xtype: 'view-report-fiscal-year-selector' },
        { xtype: 'view-report-chart' },
        { xtype: 'view-report-grid' }
    ]
});
