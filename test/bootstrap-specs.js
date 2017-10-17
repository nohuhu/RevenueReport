(function() {
    var url = [
            "../specs/store/FiscalYears.js",
            "../specs/store/TotalsByProduct.js",
            "../specs/store/SummaryByProduct.js",
            "../specs/store/SummaryByCountry.js",
            "../specs/view/report/Revenue.js"
        ];

    if (top.Test && top.Test.Options && top.Test.Options.getCurrentChunk) {
        url = top.Test.Options.getCurrentChunk(url);
    }

    Ext.Boot.load({
        charset: "UTF-8",
        url: url,
        success: function() {
            Ext.Boot.load("../../../../SDK/ext/test/shared/start-tests.js");
        }
    });
})();
