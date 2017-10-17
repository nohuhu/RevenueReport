/**
 * This store holds the summary of the revenue data
 * by year/product/country. This summary is used in
 * Revenue report grid, filtered by product when
 * the chart is clicked, and by year when a value
 * is selected in Fiscal Year combo box.
 *
 * This data is not loaded from the server but is
 * calculated from the master Revenue data.
 */
Ext.define('RevenueReport.store.SummaryByCountry', {
    extend: 'RevenueReport.store.Transformed',
    
    alias: 'store.summary-by-country',
    
    requires: [
        'Ext.data.ChainedStore'
    ],
    
    model: 'RevenueReport.model.Revenue',
    
    populate: function(masterStore) {
        var records = [],
            tmpStore, years, products, countries, year, product, country,
            country, productRevenue, productAverage, countryRevenue, filter,
            y, yLen, p, pLen, c, cLen;
        
        // Chained store is a reflection of the master data that can be
        // filtered without affecting the master store
        tmpStore = new Ext.data.ChainedStore({ source: masterStore });
        
        // collect() returns unique values in a given field
        years = tmpStore.collect('year');
        products = tmpStore.collect('product');
        countries = tmpStore.collect('country');
        
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
                
                productRevenue = tmpStore.sum('revenue');
                productAverage = productRevenue / countries.length;
                
                for (c = 0, cLen = countries.length; c < cLen; c++) {
                    country = countries[c];
                    
                    filter = { property: 'country', value: country };
                    
                    tmpStore.addFilter(filter);
                    countryRevenue = tmpStore.sum('revenue');
                    tmpStore.removeFilter(filter);
                    
                    records.push({
                        year: year,
                        product: product,
                        country: country,
                        revenue: countryRevenue,
                        
                        // This is easier to calculate here since all data is at hand
                        belowAverage: (countryRevenue < productAverage)
                    });
                }
            }
        }
        
        this.loadData(records);
        
        // Destroying chained store does not affect the master store
        tmpStore.destroy();
    }
});
