/**
 * This data model is used in Revenue stores.
 */
Ext.define('RevenueReport.model.Revenue', {
    extend: 'Ext.data.Model',

    schema: {
        namespace: 'RevenueReport.model'
    },
    
    idProperty: 'id',
    
    fields: [
        'id',
        'year',
        'product',
        'country',
        'revenue'
    ]
});
