topSuite('RevenueReport.store.SummaryByCountry', ['RevenueReport.store.Revenue'], function() {
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
        store = new RevenueReport.store.SummaryByCountry(config);
    }
    
    describe("populate", function() {
        beforeEach(function() {
            makeStore();
            
            store.populate(masterStore);
        });
        
        it("should contain 24 records total", function() {
            expect(store.getCount()).toBe(24);
        });
        
        // Not auto-generating specs here for better readability
        describe("Laptop", function() {
            beforeEach(function() {
                store.filter('product', 'Laptop');
            });
            
            it("should contain 8 records", function() {
                expect(store.getCount()).toBe(8);
            });
            
            it("should contain correct revenue totals", function() {
                expect(store.sum('revenue')).toBe(200000);
            });
            
            describe("countries", function() {
                describe("US", function() {
                    beforeEach(function() {
                        store.addFilter({ property: 'country', value: 'US' });
                    });
                    
                    it("should have 2 year records", function() {
                        expect(store.getCount()).toBe(2);
                    });
                    
                    it("should have correct record for 2012", function() {
                        var rec = store.getAt(store.find('year', 2012));
                        
                        expect(rec.get('revenue')).toBe(0);
                    });
                    
                    it("should have correct record for 2013", function() {
                        var rec = store.getAt(store.find('year', 2013));
                        
                        expect(rec.get('revenue')).toBe(0);
                    });
                });
                
                describe("EU", function() {
                    beforeEach(function() {
                        store.addFilter({ property: 'country', value: 'EU' });
                    });
                    
                    it("should have 2 year records", function() {
                        expect(store.getCount()).toBe(2);
                    });
                    
                    it("should have correct record for 2012", function() {
                        var rec = store.getAt(store.find('year', 2012));
                        
                        expect(rec.get('revenue')).toBe(100000);
                    });
                    
                    it("should have correct record for 2013", function() {
                        var rec = store.getAt(store.find('year', 2013));
                        
                        expect(rec.get('revenue')).toBe(100000);
                    });
                });
                
                describe("China", function() {
                    beforeEach(function() {
                        store.addFilter({ property: 'country', value: 'CHINA' });
                    });
                    
                    it("should have 2 year records", function() {
                        expect(store.getCount()).toBe(2);
                    });
                    
                    it("should have correct record for 2012", function() {
                        var rec = store.getAt(store.find('year', 2012));
                        
                        expect(rec.get('revenue')).toBe(0);
                    });
                    
                    it("should have correct record for 2013", function() {
                        var rec = store.getAt(store.find('year', 2013));
                        
                        expect(rec.get('revenue')).toBe(0);
                    });
                });
                
                describe("Japan", function() {
                    beforeEach(function() {
                        store.addFilter({ property: 'country', value: 'JAPAN' });
                    });
                    
                    it("should have 2 year records", function() {
                        expect(store.getCount()).toBe(2);
                    });
                    
                    it("should have correct record for 2012", function() {
                        var rec = store.getAt(store.find('year', 2012));
                        
                        expect(rec.get('revenue')).toBe(0);
                    });
                    
                    it("should have correct record for 2013", function() {
                        var rec = store.getAt(store.find('year', 2013));
                        
                        expect(rec.get('revenue')).toBe(0);
                    });
                });
            });
        });
        
        describe("Server", function() {
            beforeEach(function() {
                store.filter('product', 'Server');
            });
            
            it("should contain 8 records", function() {
                expect(store.getCount()).toBe(8);
            });
            
            it("should contain correct revenue totals", function() {
                expect(store.sum('revenue')).toBe(600000);
            });
            
            describe("countries", function() {
                describe("US", function() {
                    beforeEach(function() {
                        store.addFilter({ property: 'country', value: 'US' });
                    });
                    
                    it("should have 2 year records", function() {
                        expect(store.getCount()).toBe(2);
                    });
                    
                    it("should have correct record for 2012", function() {
                        var rec = store.getAt(store.find('year', 2012));
                        
                        expect(rec.get('revenue')).toBe(100000);
                    });
                    
                    it("should have correct record for 2013", function() {
                        var rec = store.getAt(store.find('year', 2013));
                        
                        expect(rec.get('revenue')).toBe(0);
                    });
                });
                
                describe("EU", function() {
                    beforeEach(function() {
                        store.addFilter({ property: 'country', value: 'EU' });
                    });
                    
                    it("should have 2 year records", function() {
                        expect(store.getCount()).toBe(2);
                    });
                    
                    it("should have correct record for 2012", function() {
                        var rec = store.getAt(store.find('year', 2012));
                        
                        expect(rec.get('revenue')).toBe(0);
                    });
                    
                    it("should have correct record for 2013", function() {
                        var rec = store.getAt(store.find('year', 2013));
                        
                        expect(rec.get('revenue')).toBe(0);
                    });
                });
                
                describe("China", function() {
                    beforeEach(function() {
                        store.addFilter({ property: 'country', value: 'CHINA' });
                    });
                    
                    it("should have 2 year records", function() {
                        expect(store.getCount()).toBe(2);
                    });
                    
                    it("should have correct record for 2012", function() {
                        var rec = store.getAt(store.find('year', 2012));
                        
                        expect(rec.get('revenue')).toBe(100000);
                    });
                    
                    it("should have correct record for 2013", function() {
                        var rec = store.getAt(store.find('year', 2013));
                        
                        expect(rec.get('revenue')).toBe(100000);
                    });
                });
                
                describe("Japan", function() {
                    beforeEach(function() {
                        store.addFilter({ property: 'country', value: 'JAPAN' });
                    });
                    
                    it("should have 2 year records", function() {
                        expect(store.getCount()).toBe(2);
                    });
                    
                    it("should have correct record for 2012", function() {
                        var rec = store.getAt(store.find('year', 2012));
                        
                        expect(rec.get('revenue')).toBe(200000);
                    });
                    
                    it("should have correct record for 2013", function() {
                        var rec = store.getAt(store.find('year', 2013));
                        
                        expect(rec.get('revenue')).toBe(100000);
                    });
                });
            });
        });
        
        describe("Database", function() {
            beforeEach(function() {
                store.filter('product', 'Database');
            });
            
            it("should contain 8 records", function() {
                expect(store.getCount()).toBe(8);
            });
            
            it("should contain correct revenue totals", function() {
                expect(store.sum('revenue')).toBe(200000);
            });
            
            describe("countries", function() {
                describe("US", function() {
                    beforeEach(function() {
                        store.addFilter({ property: 'country', value: 'US' });
                    });
                    
                    it("should have 2 year records", function() {
                        expect(store.getCount()).toBe(2);
                    });
                    
                    it("should have correct record for 2012", function() {
                        var rec = store.getAt(store.find('year', 2012));
                        
                        expect(rec.get('revenue')).toBe(100000);
                    });
                    
                    it("should have correct record for 2013", function() {
                        var rec = store.getAt(store.find('year', 2013));
                        
                        expect(rec.get('revenue')).toBe(0);
                    });
                });
                
                describe("EU", function() {
                    beforeEach(function() {
                        store.addFilter({ property: 'country', value: 'EU' });
                    });
                    
                    it("should have 2 year records", function() {
                        expect(store.getCount()).toBe(2);
                    });
                    
                    it("should have correct record for 2012", function() {
                        var rec = store.getAt(store.find('year', 2012));
                        
                        expect(rec.get('revenue')).toBe(0);
                    });
                    
                    it("should have correct record for 2013", function() {
                        var rec = store.getAt(store.find('year', 2013));
                        
                        expect(rec.get('revenue')).toBe(0);
                    });
                });
                
                describe("China", function() {
                    beforeEach(function() {
                        store.addFilter({ property: 'country', value: 'CHINA' });
                    });
                    
                    it("should have 2 year records", function() {
                        expect(store.getCount()).toBe(2);
                    });
                    
                    it("should have correct record for 2012", function() {
                        var rec = store.getAt(store.find('year', 2012));
                        
                        expect(rec.get('revenue')).toBe(100000);
                    });
                    
                    it("should have correct record for 2013", function() {
                        var rec = store.getAt(store.find('year', 2013));
                        
                        expect(rec.get('revenue')).toBe(0);
                    });
                });
                
                describe("Japan", function() {
                    beforeEach(function() {
                        store.addFilter({ property: 'country', value: 'JAPAN' });
                    });
                    
                    it("should have 2 year records", function() {
                        expect(store.getCount()).toBe(2);
                    });
                    
                    it("should have correct record for 2012", function() {
                        var rec = store.getAt(store.find('year', 2012));
                        
                        expect(rec.get('revenue')).toBe(0);
                    });
                    
                    it("should have correct record for 2013", function() {
                        var rec = store.getAt(store.find('year', 2013));
                        
                        expect(rec.get('revenue')).toBe(0);
                    });
                });
            });
        });
    });
});
