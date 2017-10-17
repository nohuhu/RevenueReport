/**
 * This class defines the Revenue data editor panel.
 * The panel contains a Grid widget that is bound to
 * its parent Main ViewModel.
 *
 * Only one instance of this view is created.
 */
Ext.define('RevenueReport.view.editor.Grid', {
    extend: 'Ext.panel.Panel',
    
    xtype: 'data-editor',
    
    requires: [
        'RevenueReport.view.editor.GridController'
    ],
    
    // ViewController reacts to events in this view
    controller: 'data-editor',
    
    // Grid needs height to lay itself out, and does not
    // behave really well in Classic vbox layouts.
    // I did not have time to come up with more elegant
    // solution.
    minHeight: 300,
    maxHeight: 400,
    height: '100%',
    
    // This view is always present but hidden when the Edit button
    // is not depressed. Hiding it via visibility:hidden allows
    // to maintain layout and react quickly to the button press.
    hideMode: 'visibility',
    
    layout: 'fit',
    
    items: [{
        xtype: 'grid',
        
        reference: 'editGrid',
        
        bind: {
            // This view does not have its own ViewModel,
            // so it inherits the Model of its parent Main view.
            // The store bound here is the main Revenue store.
            store: '{revenueData}',
            selection: '{editorGridSelection}'
        },
        
        // This config is used in Classic toolkit
        selModel: {
            type: 'checkboxmodel'
        },
        
        // This config is used in Modern toolkit
        selectable: {
            mode: 'multi',
            drag: false,
            checkbox: true
        },
        
        plugins: {
            cellediting: {
                clicksToEdit: 2
            }
        },
        
        columns: [{
            dataIndex: 'year',
            text: 'Fiscal Year',
            
            editor: {
                xtype: 'numberfield',
                allowBlank: false,
                minValue: 2000,
                maxValue: new Date().getFullYear()
            }
        }, {
            dataIndex: 'product',
            text: 'Product',
            
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }, {
            dataIndex: 'country',
            text: 'Region',
            
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }, {
            dataIndex: 'revenue',
            text: 'Revenue',
            flex: 1,
            
            formatter: 'usMoney',
            
            editor: {
                xtype: 'numberfield',
                allowBlank: false
            }
        }]
    }],
    
    buttons: [{
        text: 'Insert new record',
        
        // Methods on GridController
        handler: 'onInsertNewRecord'
    }, {
        text: 'Delete',
        handler: 'onDeleteRecords',
        
        bind: {
            disabled: '{!editorGridSelection}'
        }
    }]
});
