/**
 * This store holds the data for Fiscal Year combo box
 * in Report panel.
 *
 * The data is not retrieved from the server side
 * but instead is transformed from the master Revenue store.
 */
Ext.define('RevenueReport.store.FiscalYears', {
    extend: 'RevenueReport.store.Transformed',
    
    alias: 'store.fiscal-years',
    
    fields: ['year', 'text'],
    
    populate: function(masterStore) {
        var records, years;
        
        // collect() returns unique values in a given field
        years = masterStore.collect('year');
        
        // Compatibility. IE8 does not support Array.prototype.map()
        records = Ext.Array.map(years, function(yr) {
            return { year: yr, text: yr + '' };
        });
        
        // TODO Localization
        records.push({ year: null, text: 'All' });
        
        this.loadData(records);
    }
});
