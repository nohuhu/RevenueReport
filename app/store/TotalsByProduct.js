/**
 * This store holds the summary of the revenue data
 * by product across all countries and years. This
 * summary is used in Revenue report chart
 * when no selection is made in the Fiscal Year
 * combo box.
 *
 * This data is not loaded from the server but is
 * calculated from the master Revenue data.
 */
Ext.define('RevenueReport.store.TotalsByProduct', {
    extend: 'RevenueReport.store.Transformed',
    
    alias: 'store.totals-by-product',
    
    requires: [
        'Ext.data.ChainedStore'
    ],
    
    // Instead of creating a separate data Model class
    // it is possible to define fields right on the Store class
    fields: ['product', 'revenue'],
    
    populate: function(masterStore) {
        var tmpStore, records, products;
        
        // Chained store is a reflection of the master data that can be
        // filtered without affecting the master store
        tmpStore = new Ext.data.ChainedStore({ source: masterStore });
        
        // collect() returns unique values in a given field
        products = tmpStore.collect('product');
        
        // Compatibility. IE8 does not support Array.prototype.map()
        records = Ext.Array.map(products, function(p) {
            var revenue;
            
            tmpStore.filter({
                property: 'product',
                value: p
            });
            
            revenue = tmpStore.sum('revenue') || 0;
            
            return {
                product: p,
                revenue: revenue
            };
        });
        
        this.loadData(records);
        tmpStore.destroy();
    }
});
