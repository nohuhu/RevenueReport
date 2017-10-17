/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('RevenueReport.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',
    
    initViewModel: function(viewModel) {
        var store = viewModel.getStore('revenueData');
        
        // Two of these events catch all data mutation that we possibly need
        // to know of. Every mutation will cause dependent stores to recalculate
        // their data.
        // This might not be very effective in production and there are ways
        // to solve this problem differently but for the purpose of this demo
        // I think it will suffice to recalculate on the fly.
        store.on({
            scope: this,
            datachanged: 'onRevenueDataStoreUpdate',
            update: 'onRevenueDataStoreUpdate'
        });
        
        // In this demo, only Modern app reacts to orientation change events.
        // Classic app is used for desktop browsers.
        if (Ext.isModern) {
            Ext.Viewport.on('orientationchange', this.onOrientationChange, this);
        }
    },
    
    onRevenueDataStoreUpdate: function(masterStore) {
        var viewModel = this.getView().getViewModel();
        
        viewModel.getStore('fiscalYears').populate(masterStore);
        viewModel.getStore('totalsByProduct').populate(masterStore);
        viewModel.getStore('summaryByProduct').populate(masterStore);
        viewModel.getStore('summaryByCountry').populate(masterStore);
    },
    
    onOrientationChange: function(viewport, orientation) {
        var viewModel = this.getViewModel();
        
        // In portrait mode we don't have enough screen space
        // to display raw data editor.
        if (orientation !== 'landscape') {
            viewModel.set({
                displayRawDataEditor: false,
                hideRawDataEditButton: true
            });
        }
        else {
            // ViewModel will propagate value changes to whatever entity
            // is bound to this value.
            viewModel.set('hideRawDataEditButton', false);
        }
    }
});
