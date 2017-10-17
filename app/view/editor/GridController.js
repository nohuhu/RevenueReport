/**
 * Controller for the data editor Grid. This is just a way
 * to keep code organized, no special meaning here.
 */
Ext.define('RevenueReport.view.editor.GridController', {
    extend: 'Ext.app.ViewController',
    
    alias: 'controller.data-editor',
    
    onInsertNewRecord: function() {
        var grid, record, store, Model, plugin;
        
        grid = this.lookup('editGrid');
        plugin = grid.findPlugin('cellediting');
        
        store = grid.getStore();
        Model = store.getModel();
        
        record = new Model();
        
        store.insert(0, record);
        
        // Column 0 is the checkbox so start at 1
        plugin.startEdit(record, 1);
    },
    
    onDeleteRecords: function() {
        var grid, selection;
        
        grid = this.lookup('editGrid');
        selection = Ext.isModern ? grid.getSelections() : grid.getSelection();
        
        Ext.Msg.confirm(
            'Confirm deletion',
            'Are you sure you want to delete ' + selection.length + ' records?',
            this.doDeleteRecords,
            this
        );
    },
    
    doDeleteRecords: function() {
        var grid, store, selection, plugin;
        
        grid = this.lookup('editGrid');
        plugin = grid.findPlugin('cellediting');
        
        store = grid.getStore();
        
        // Classic and Modern APIs differ a bit here
        selection = Ext.isModern ? grid.getSelections() : grid.getSelection();
        
        store.remove(selection);
    }
});
