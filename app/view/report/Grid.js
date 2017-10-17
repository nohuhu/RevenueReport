/**
 * The grid that displays the filtered *summary* data in Revenue report
 * panel.
 */
Ext.define('RevenueReport.view.report.Grid', {
    extend: 'Ext.panel.Panel',
    
    xtype: 'view-report-grid',
    
    reference: 'gridPanel',
    
    // Classic toolkit calculates layouts in JavaScript, Modern toolkit
    // uses flexbox. Thus different values.
    flex: Ext.isClassic ? 1 : '1 0',
    height: '100%',
    
    // The difference here is too small to warrant separate view subclasses
    // for Classic and Modern apps.
    layout: Ext.isClassic ? 'anchor' : {
        type: 'vbox',
        align: 'stretch'
    },
    
    // Ext JS grid calculates row height so it needs to be laid out in the DOM
    hideMode: 'visibility',
    
    bind: {
        // This record is published by the Chart via Revenue ViewModel
        hidden: '{!selectedProduct.product}',
    },
        
    items: [{
        xtype: 'component',
        
        cls: 'report-header',
        anchor: '100%',
        
        reference: 'gridHeader',
        
        bind: {
            html: 'Revenue Report, ' +
                   '{selectedFiscalYear.year || "All years"}, ' +
                   '{selectedProduct.product || "All products"}'
        }
    }, {
        xtype: 'grid',
        
        header: false,
        
        // Grid needs minimal height to lay out its rows
        minHeight: 410,
        height: '100%',
        
        reference: 'grid',
            
        bind: {
            store: '{gridStore}'
        },
        
        columns: [{
            dataIndex: 'year',
            text: 'Fiscal Year'
        }, {
            dataIndex: 'product',
            text: 'Product'
        }, {
            dataIndex: 'country',
            text: 'Region'
        }, {
            dataIndex: 'revenue',
            text: 'Revenue',
            flex: 1,
            renderer: 'gridRevenueRenderer'
        }],
        
        // This can happen if master Revenue store fails to load
        emptyText: 'Please select product'
    }]
});
