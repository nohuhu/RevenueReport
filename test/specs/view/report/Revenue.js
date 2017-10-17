topSuite('RevenueReport.view.panel.Revenue',
    // Dependencies
    ['RevenueReport.store.*'],
function() {
    var view, masterStore,
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
    
    afterEach(function() {
        view = masterStore = Ext.destroy(view, masterStore);
    });
    
    function makeStore(config) {
        return Ext.StoreManager.lookup(config);
    }
    
    function makeView(config) {
        var viewModel;
        
        config = Ext.apply({
            xtype: 'report-revenue-' + (Ext.isModern ? 'modern' : 'classic'),
            autoLoad: false,
            renderTo: document.body
        }, config);
        
        view = Ext.widget(config);
        viewModel = view.getViewModel();
        
        // When testing we prefer stores to load synchronously
        masterStore = new RevenueReport.store.Revenue({
            asynchronousLoad: false
        });
        
        // In the app Main ViewModel does all the binding
        // but here we have to do that manually to avoid
        // hard dependency on the Main view.
        viewModel.set('revenueData', masterStore);
        
        viewModel.set('fiscalYears', makeStore({
            type: 'fiscal-years',
            source: masterStore
        }));
        
        viewModel.set('totalsByProduct', makeStore({
            type: 'totals-by-product',
            source: masterStore
        }));
        
        viewModel.set('summaryByProduct', makeStore({
            type: 'summary-by-product',
            source: masterStore
        }));
        
        viewModel.set('summaryByCountry', makeStore({
            type: 'summary-by-country',
            source: masterStore
        }));
        
        return view;
    }
    
    function mockComplete(data) {
        Ext.Ajax.mockComplete({
            status: 200,
            responseText: JSON.stringify(data || mockData)
        });
    }
    
    describe("class", function() {
        it("should be created", function() {
            expect(RevenueReport.view.report.Revenue).toBeDefined();
        });
    });
    
    describe("init", function() {
        beforeEach(function() {
            makeView();
            
            // Give default bindings some time to propagate
            waits(50);
        });
        
        it("should instantiate", function() {
            expect(view).toBeDefined();
        });
        
        it("should set default chartHeader text", function() {
            var header = view.getController().lookup('chartHeader');
            
            var html = Ext.isModern ? header.getHtml() : header.el.dom.textContent;
            
            expect(html).toBe('Revenue by Product, All years');
        });
        
        it("should hide the grid panel", function() {
            var panel = view.getController().lookup('gridPanel');
            
            expect(panel.isVisible()).toBe(false);
        });
    });
    
    describe("loading data", function() {
        beforeEach(function() {
            makeView();
            
            masterStore.load();
            mockComplete();
            
            waits(50);
        });
        
        it("should populate fiscal years combo box", function() {
            var combo = view.getController().lookup('fiscalYear');
            
            expect(combo.getStore().getCount()).toBe(3);
        });
        
        it("should draw the chart", function() {
            var chart, sprites;
            
            chart = view.getController().lookup('chart');
            sprites = chart.getSeries()[0].getSprites();
            
            // 3 slices for each product
            expect(sprites.length).toBe(3);
        });
    });
    
    describe("interaction", function() {
        var ctrl, combo, chart, grid;
        
        beforeEach(function() {
            makeView();
            
            ctrl = view.getController();
            combo = ctrl.lookup('fiscalYear');
            chart = ctrl.lookup('chart');
            grid = ctrl.lookup('grid');
            
            masterStore.load();
            mockComplete();
            
            waits(50);
            
            // For test purposes we assume the grid is always shown
            runs(function() {
                grid.setHidden(false);
            });
        });
        
        afterEach(function() {
            ctrl = combo = chart = grid = null;
        });
        
        function selectFiscalYear(value) {
            var rec, picker, item;
            
            rec = combo.getStore().find('year', value);
            
            if (rec) {
                combo.expand();
                
                // Ugh. Usually this would go through some higher level test library
                // but for the sake of this excercise let's shortcut
                picker = combo.getPicker();
                picker.refresh();
                item = picker.itemFromRecord(rec);
                
                if (item) {
                    jasmine.fireMouseEvent(item.el, 'click');
                }
            }
        }
        
        function selectProduct(value) {
            var series = chart.getSeries()[0],
                store = series.getStore(),
                item, found, i, len;
            
            for (i = 0, len = store.getCount(); i < len; i++) {
                item = series.getItemByIndex(i);
                
                if (item && item.record.get('product') === value) {
                    found = item;
                    break;
                }
            }
            
            // Can't easily inject events into canvas so have to pretend for now :(
            view.getController().onPieChartItemHighlight(chart, item);
        }
            
        describe("selecting fiscal year", function() {
            describe("selecting year value", function() {
                it("should redraw the chart", function() {
                    var spy = jasmine.createSpy('chart redraw');
                    
                    chart.on('redraw', spy);
                    
                    selectFiscalYear(2012);
                    
                    waitsForSpy(spy);
                    
                    runs(function() {
                        // TODO More specific chart tests
                        expect(spy).toHaveBeenCalled();
                    });
                });
            });
        });
        
        TODO(Ext.isClassic).
        describe("selecting product", function() {
            var spy;
            
            beforeEach(function() {
                spy = jasmine.createSpy('grid refresh');
                
                grid.on('refresh', spy);
            });
            
            it("should filter the grid when product is selected", function() {
                selectProduct('Server');
                
                waitsForSpy(spy);
                
                runs(function() {
                    expect(spy).toHaveBeenCalled();
                });
            });
            
            it("should filter the grid again when product is deselected", function() {
                selectProduct('Database');
                
                waitsForSpy(spy);
                
                runs(function() {
                    spy.reset();
                    
                    selectProduct(null);
                });
                
                waitsForSpy(spy);
                
                runs(function() {
                    expect(spy).toHaveBeenCalled();
                });
            });
        });
    });
});
