/**
 * Revenue Report panel ViewModel.
 */
Ext.define('RevenueReport.view.report.RevenueModel', {
    extend: 'Ext.app.ViewModel',
    
    alias: 'viewmodel.report-revenue',
    
    stores: {
        // These two stores are chained to their respective sources and are,
        // in fact, filtered slices of the source data
        chartStore: {
            source: '{summaryByProduct}',
            filters: [{
                disableOnEmpty: true,
                property: 'year',
                
                // This record is published by Fiscal Year combo box.
                // Whenever the selection changes, the store will be
                // re-filtered.
                value: '{selectedFiscalYear.year}'
            }]
        },
        
        gridStore: {
            source: '{summaryByCountry}',
            filters: [{
                disableOnEmpty: true,
                property: 'year',
                
                // Same as in chartStore
                value: '{selectedFiscalYear.year}'
            }, {
                disableOnEmpty: true,
                property: 'product',
                
                // This record is published by RevenueController on behalf
                // of the Chart component that is not advanced enough
                // to do that itself. Whenever this value changes
                // the store will be re-filtered.
                value: '{selectedProduct.product}'
            }]
        }
    },
    
    links: {
        // Default records with null values that will be published to relevant
        // binds until user selects something.
        selectedFiscalYear: {
            type: 'Revenue',
            create: true
        },
        selectedProduct: {
            type: 'Revenue',
            create: true
        }
    }
});
