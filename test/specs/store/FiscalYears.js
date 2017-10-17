topSuite('RevenueReport.store.FiscalYears', ['RevenueReport.store.Revenue'], function() {
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
        store = new RevenueReport.store.FiscalYears(config);
    }
    
    describe("populate", function() {
        beforeEach(function() {
            makeStore();
            
            store.populate(masterStore);
        });
        
        it("should contain 3 records", function() {
            expect(store.getCount()).toBe(3);
        });
        
        it("should have correct 1st record", function() {
            var rec = store.getAt(0);
            
            expect(rec.get('year')).toBe(2012);
            expect(rec.get('text')).toBe('2012');
        });
        
        it("should have correct 2nd record", function() {
            var rec = store.getAt(1);
            
            expect(rec.get('year')).toBe(2013);
            expect(rec.get('text')).toBe('2013');
        });
        
        it("should have correct last record", function() {
            var rec = store.getAt(2);
            
            expect(rec.get('year')).toBe(null);
            expect(rec.get('text')).toBe('All');
        });
    });
});
