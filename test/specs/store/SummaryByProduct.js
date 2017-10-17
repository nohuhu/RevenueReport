topSuite('RevenueReport.store.SummaryByProduct', ['RevenueReport.store.Revenue'], function() {
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
        store = new RevenueReport.store.SummaryByProduct(config);
    }
    
    describe("populate", function() {
        beforeEach(function() {
            makeStore();
            
            store.populate(masterStore);
        });
        
        it("should contain 6 records total", function() {
            expect(store.getCount()).toBe(6);
        });
        
        // Not auto-generating specs here for better readability
        describe("Laptop", function() {
            beforeEach(function() {
                store.filter('product', 'Laptop');
            });
            
            it("should contain 2 records", function() {
                expect(store.getCount()).toBe(2);
            });
            
            it("should contain correct record for 2012", function() {
                var rec = store.getAt(store.find('year', 2012));
                
                expect(rec.get('revenue')).toBe(100000);
            });
            
            it("should contain correct record for 20213", function() {
                var rec = store.getAt(store.find('year', 2013));
                
                expect(rec.get('revenue')).toBe(100000);
            });
        });
        
        describe("Server", function() {
            beforeEach(function() {
                store.filter('product', 'Server');
            });
            
            it("should contain 2 records", function() {
                expect(store.getCount()).toBe(2);
            });
            
            it("should contain correct record for 2012", function() {
                var rec = store.getAt(store.find('year', 2012));
                
                expect(rec.get('revenue')).toBe(400000);
            });
            
            it("should contain correct record for 20213", function() {
                var rec = store.getAt(store.find('year', 2013));
                
                expect(rec.get('revenue')).toBe(200000);
            });
        });
        
        describe("Database", function() {
            beforeEach(function() {
                store.filter('product', 'Database');
            });
            
            it("should contain 2 records", function() {
                expect(store.getCount()).toBe(2);
            });
            
            it("should contain correct record for 2012", function() {
                var rec = store.getAt(store.find('year', 2012));
                
                expect(rec.get('revenue')).toBe(200000);
            });
            
            it("should contain correct record for 20213", function() {
                var rec = store.getAt(store.find('year', 2013));
                
                expect(rec.get('revenue')).toBe(0);
            });
        });
    });
});
