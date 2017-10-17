/**
 * Base class for transformed stores that do not load data directly
 * but calculate it from the master store instead.
 */
Ext.define('RevenueReport.store.Transformed', {
    extend: 'Ext.data.ArrayStore',
    
    config: {
        /**
         * @cfg {Ext.data.Store/String} source
         * The backing data source for this transformed store.
         * Either a store instance or the id of an existing store.
         */
        source: null
    },
    
    applySource: function(source) {
        if (source) {
            source = Ext.data.StoreManager.lookup(source);
        }
        
        return source;
    },
    
    updateSource: function(source, oldSource) {
        if (oldSource && !oldSource.destroyed) {
            oldSource.un({
                scope: this,
                datachanged: 'populate',
                update: 'populate'
            });
        }
        
        if (source) {
            source.on({
                scope: this,
                datachanged: 'populate',
                update: 'populate'
            });
        }
    },
    
    destroy: function() {
        this.setSource(null);
        this.callParent();
    },
    
    populate: Ext.emptyFn
});
