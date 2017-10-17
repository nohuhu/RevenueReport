/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('RevenueReport.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',
    
    requires: [
        'RevenueReport.store.FiscalYears',
        'RevenueReport.store.TotalsByProduct',
        'RevenueReport.store.SummaryByProduct',
        'RevenueReport.store.SummaryByCountry'
    ],
    
    stores: {
        // This is the master store that holds entire data set. Only one copy
        // of this store is ever created because there can be only one Main
        // viewModel but it's entirely possible to have multiple independent
        // instances if so required.
        revenueData: {
            type: 'revenue'
        },
        
        // fiscalYears and summary stores below are populated with data from
        // revenueData store when it is loaded. See onRevenueDateStoreRefresh
        // in MainController.
        fiscalYears: {
            type: 'fiscal-years',
            source: '{revenueData}'
        },
        
        totalsByProduct: {
            type: 'totals-by-product',
            source: '{revenueData}'
        },
        
        summaryByProduct: {
            type: 'summary-by-product',
            source: '{revenueData}'
        },
        
        summaryByCountry: {
            type: 'summary-by-country',
            source: '{revenueData}'
        }
    },
    
    // This is data local to this (topmost) ViewModel. Child ViewModels
    // will automatically inherit these values and any changes will
    // be propagated to the entities bound to these values.
    data: {
        displayRawDataEditor: false,
        hideRawDataEditButton: false
    }
});
