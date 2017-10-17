topSuite('RevenueReport.store.TotalsByProduct', ['RevenueReport.store.Revenue'], function() {
    var masterStore, store,
        mockData = [
           {
              "id":0,
              "year":2012,
              "product":"Server",
              "country":"JAPAN",
              "revenue":100000
           },
           {
              "id":1,
              "year":2012,
              "product":"Database",
              "country":"US",
              "revenue":100000
           },
           {
              "id":2,
              "year":2012,
              "product":"Database",
              "country":"CHINA",
              "revenue":100000
           },
           {
              "id":3,
              "year":2012,
              "product":"Server",
              "country":"CHINA",
              "revenue":100000
           },
           {
              "id":4,
              "year":2012,
              "product":"Laptop",
              "country":"EU",
              "revenue":100000
           },
           {
              "id":5,
              "year":2012,
              "product":"Server",
              "country":"US",
              "revenue":100000
           },
           {
              "id":6,
              "year":2013,
              "product":"Server",
              "country":"CHINA",
              "revenue":100000
           },
           {
              "id":7,
              "year":2012,
              "product":"Server",
              "country":"JAPAN",
              "revenue":100000
           },
           {
              "id":8,
              "year":2013,
              "product":"Server",
              "country":"JAPAN",
              "revenue":100000
           },
           {
              "id":9,
              "year":2013,
              "product":"Laptop",
              "country":"EU",
              "revenue":100000
           }
        ];
    
    beforeAll(function() {
        MockAjaxManager.addMethods();
    });
    
    afterAll(function() {
        MockAjaxManager.removeMethods();
    });
    
    beforeEach(function() {
        masterStore = new RevenueReport.store.Revenue();
        masterStore.loadData(mockData);
    });
    
    afterEach(function() {
        masterStore = store = Ext.destroy(masterStore, store);
    });
    
    function makeStore(config) {
        store = new RevenueReport.store.TotalsByProduct(config);
    }
    
    describe("populate", function() {
        beforeEach(function() {
            makeStore();
            
            store.populate(masterStore);
        });
        
        it("should contain 3 records", function() {
            expect(store.getCount()).toBe(3);
        });
        
        it("should contain correct record for Laptop", function() {
            var rec = store.getAt(store.find('product', 'Laptop'));
            
            expect(rec.get('revenue')).toBe(200000);
        });
        
        it("should contain correct record for Server", function() {
            var rec = store.getAt(store.find('product', 'Server'));
            
            expect(rec.get('revenue')).toBe(600000);
        });
        
        it("should contain correct record for Database", function() {
            var rec = store.getAt(store.find('product', 'Database'));
            
            expect(rec.get('revenue')).toBe(200000);
        });
    });
});
