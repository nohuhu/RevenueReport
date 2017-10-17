/**
 * This store holds the summary of the revenue data
 * by year and product across all countries. This
 * summary is used in Revenue report chart,
 * filtered by year selected in the Fiscal year
 * combo box.
 *
 * This data is not loaded from the server but is
 * calculated from the master Revenue data.
 */
Ext.define('RevenueReport.store.SummaryByProduct', {
    extend: 'RevenueReport.store.Transformed',
    
    alias: 'store.summary-by-product',
    
    requires: [
        'Ext.data.ChainedStore'
    ],
    
    model: 'RevenueReport.model.Revenue',
    
    populate: function(masterStore) {
        var records = [],
            tmpStore, years, products, year, product, revenue,
            y, yLen, p, pLen;
        
        // Chained store is a reflection of the master data that can be
        // filtered without affecting the master store
        tmpStore = new Ext.data.ChainedStore({ source: masterStore });
        
        // collect() returns unique values in a given field
        years = tmpStore.collect('year');
        products = tmpStore.collect('product');
        
        // Good old loops are easier to read than nested map() transforms
        for (y = 0, yLen = years.length; y < yLen; y++) {
            year = years[y];
            
            for (p = 0, pLen = products.length; p < pLen; p++) {
                product = products[p];
                
                tmpStore.filter([{
                    property: 'year',
                    value: year
                }, {
                    property: 'product',
                    value: product
                }]);
                
                revenue = tmpStore.sum('revenue');
                
                records.push({
                    year: year,
                    product: product,
                    revenue: revenue
                });
            }
        }
        
        this.loadData(records);
        tmpStore.destroy();
    }
});
