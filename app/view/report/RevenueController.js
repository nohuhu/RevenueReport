/**
 * ViewController specific to the Revenue report panel.
 */
Ext.define('RevenueReport.view.report.RevenueController', {
    extend: 'Ext.app.ViewController',
    
    alias: 'controller.report-revenue',
    
    initViewModel: function(viewModel) {
        // This is a bit convoluted but I didn't have time to come up
        // with more elegant solution to avoid automatic store loading
        // in unit tests.
        if (this.getView().autoLoad) {
            this.getViewModel().getParent().getStore('revenueData').load();
        }
    },
    
    pieChartLabelRenderer: function(text, sprite, config, renderData, index) {
        var store, record;
        
        store = renderData.series.getChart().getStore();
        record = store.getAt(index);
        
        return this.formatRevenue(record.get('revenue'));
    },
    
    onPieChartItemHighlight: function(chart, data) {
        var record = data && data.record;
        
        this.getViewModel().set('selectedProduct', record || null);
    },
    
    gridRevenueRenderer: function(value) {
        // Classic and Modern toolkits have slightly different ways of doing things,
        // hence different signatures. Not different enough for our purposes
        // to justify separate methods to handle value formatting.
        var record = Ext.isModern ? arguments[1] : arguments[2],
            cell = Ext.isModern ? arguments[3] : arguments[1],
            revenue;
        
        // This value is calculated when SummaryByCountry store is populated
        if (record.get('belowAverage')) {
            // In Modern toolkit, grid cells are Components. In Classic toolkit
            // they are HTML markup.
            if (Ext.isModern) {
                cell.el.setStyle('font-weight', 'bold');
            }
            else {
                cell.style += 'font-weight: bold;';
            }
        }
        
        return this.formatRevenue(record.get('revenue'));
    },
    
    formatRevenue: function(revenue) {
        return revenue >= 1000000000 ? '$' + Math.round(revenue / 1000000000, 0) + 'B'
             : revenue >= 1000000    ? '$' + Math.round(revenue / 1000000, 0) + 'M'
             : revenue >= 1000       ? '$' + Math.round(revenue / 1000, 0) + 'K'
             :                         '$' + revenue
             ;
    }
});
