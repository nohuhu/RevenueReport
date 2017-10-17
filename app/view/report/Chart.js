/**
 * The Chart panel in the Revenue report view.
 */
Ext.define('RevenueReport.view.report.Chart', {
    extend: 'Ext.panel.Panel',
    
    xtype: 'view-report-chart',
   
    // Charting package is shared between Modern and Classic toolkits
    // with the same class names so OK to require them directly.
    requires: [
        'Ext.chart.PolarChart',
        'Ext.chart.series.Pie',
        'Ext.chart.interactions.ItemHighlight'
    ],
    
    // This is a bit ugly but Classic vbox layout does not behave
    // as I need it and one small difference does not warrant
    // creating a toolkit specific class for this view.
    layout: Ext.isClassic ? 'anchor' : {
        type: 'vbox',
        align: 'stretch'
    },
        
    items: [{
        xtype: 'component',
        
        cls: 'report-header',
        
        // Component width is anchored to container width
        anchor: '100%',
        
        // Reference is used to look this component up in a ViewController.
        reference: 'chartHeader',
        
        bind: {
            html: 'Revenue by Product, {selectedFiscalYear.year || "All years"}'
        }
    }, {
        xtype: 'polar', // Polar chart
        
        // Chart is a Panel that has a header by default
        header: false,
        
        // I don't want the chart to use its default white background
        // and this particular value is ok to hardcode.
        background: 'transparent',
        
        // Charts are canvas based and need fixed minimal dimensions
        minHeight: 400,
        minWidth: 300,
        
        // This is a bit weird but different values are used in Classic and Modern
        // apps to lay out the chart panel.
        height: '100%',
        width: '100%',
        anchor: '100% -50',
        
        reference: 'chart',
        
        bind: {
            // If selectedFiscalYear record is not available we use totalsByProduct store.
            // If the year was selected and the record was propagated, we use chartStore
            // filtered by selected year instead.
            store: '{!selectedFiscalYear.year ? totalsByProduct : chartStore}'
        },
        
        interactions: {
            type: 'itemhighlight',
            sticky: true
        },
        
        listeners: {
            // The Chart view does not have its own ViewController so method name
            // will be resolved to parent view's controller.
            // See RevenueController.
            itemhighlight: 'onPieChartItemHighlight'
        },
        
        legend: {
            type: 'sprite',
            background: 'transparent'
        },
        
        series: {
            type: 'pie',
            highlight: true,
            angleField: 'revenue',
            label: {
                field: 'product',
                
                // Ext JS charts are canvas based and thus cannot be styled with CSS
                color: 'white',
                font: '14px bold Roboto',
                
                // Renderer is a method in parent Controller.
                renderer: 'pieChartLabelRenderer'
            }
        }
    }]
});
