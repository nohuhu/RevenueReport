/**
 * Leftmost panel that holds Fiscal Year combo box and Edit data button.
 */
Ext.define('RevenueReport.view.report.FiscalYearSelector', {
    extend: 'Ext.panel.Panel',
    
    xtype: 'view-report-fiscal-year-selector',
    
    // This is a bit of a hack to override default toolbar styling.
    cls: 'view-report-fiscal-year-selector',
    
    items: [{
        xtype: 'combobox',
        
        reference: 'fiscalYear',
        
        // In Classic it is `fieldLabel`, in Modern just `label`
        label: 'Fiscal Year',
        fieldLabel: 'Fiscal Year',
        
        labelAlign: 'top',
        
        displayField: 'text',
        valueField: 'year',
        
        queryMode: 'local',
        
        editable: false,
        forceSelection: true,
        autoSelect: true,
        
        publishes: 'value',
        value: null,
        
        // Placeholder and emptyText are used in different toolkits
        placeholder: 'All',
        emptyText: 'All',
        
        bind: {
            // The store is bound to ViewModel's store instance with this
            // reference. This view does not have its own ViewModel
            // so values inherited from the parent Main ViewModel
            // will be used instead.
            store: '{fiscalYears}',
            
            // The record selected in this combo box is published into
            // the associated ViewModel (in this case, Main).
            selection: '{selectedFiscalYear}'
        }
    }],
    
    buttons: [{
        text: 'Edit revenue data',
        
        hideMode: 'visibility',
        enableToggle: true,
        
        bind: {
            // Also from parent Main ViewModel.
            hidden: '{hideRawDataEditButton}',
            pressed: '{displayRawDataEditor}'
        }
    }]
});
