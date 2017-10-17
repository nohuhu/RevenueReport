/**
 * This is the Application class for Classic toolkit. Its only purpose
 * is to require dependent classes specific to Classic toolkit.
 *
 * This is the class that should be instantiated to launch
 * Classic application.
 */
Ext.define('RevenueReport.Application', {
    extend: 'RevenueReport.BaseApplication',
    
    requires: [
        'Ext.plugin.Viewport',
        'Ext.layout.container.VBox',
        'Ext.layout.container.HBox',
        'Ext.layout.container.Anchor',
        'Ext.form.field.ComboBox',
        'Ext.grid.Panel',
        'Ext.grid.plugin.CellEditing',
        'Ext.selection.CheckboxModel'
    ]
});
