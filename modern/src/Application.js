/**
 * This is the Application class for Modern toolkit. Its only purpose
 * is to require dependent classes specific to Modern toolkit.
 *
 * This is the class that should be instantiated to launch Modern
 * application.
 */
Ext.define('RevenueReport.Application', {
    extend: 'RevenueReport.BaseApplication',
    
    requires: [
        'Ext.viewport.Viewport',
        'Ext.layout.HBox',
        'Ext.layout.VBox',
        'Ext.field.ComboBox',
        'Ext.grid.Grid',
        'Ext.grid.plugin.CellEditing'
    ]
});
