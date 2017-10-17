/*
 * Main data store that holds entire revenue data set.
 * This store is loaded from the server, and any changes
 * to the data are synced back to the server.
 */
Ext.define('RevenueReport.store.Revenue', {
    extend: 'Ext.data.Store',
    
    // Store alias is used in ViewModel to create an instance
    // of this type without hardcoding the class name
    alias: 'store.revenue',

    model: 'RevenueReport.model.Revenue',
    
    // This store is loaded when Report panel requests it.
    autoLoad: false,
    
    // Sync every change. This is not the default because UX
    // might be suboptimal but demo spec required changes
    // to be propagated on Enter key.
    autoSync: true,
    
    proxy: {
        type: 'rest',
        url: '/revenue',
        reader: {
            type: 'json'
        }
    }
});
