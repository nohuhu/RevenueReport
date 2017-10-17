/**
 * The main view of the application. There is only one instance of this view
 * in the app. Its purpose is to serve as a container for views that do
 * the actual stuff.
 */
Ext.define('RevenueReport.view.main.Main', {
    extend: 'Ext.panel.Panel',
    
    // xtype is a shortcut for alias: 'widget.foo'
    xtype: 'app-main',

    requires: [
        'RevenueReport.view.report.Revenue',
        'RevenueReport.view.editor.Grid'
    ],

    controller: 'main',
    viewModel: 'main',
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        // Using xtype instead of class name allows for dynamic instantiation
        xtype: 'report-revenue' + (Ext.isModern ? '-modern' : '-classic')
    }, {
        xtype: 'data-editor',
        
        bind: {
            // This field in the Main ViewModel is inherited in all child
            // ViewModels and thus can be shared across views without
            // introducing hard dependencies.
            hidden: '{!displayRawDataEditor}'
        }
    }]
});
