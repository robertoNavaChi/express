require(['main'], function (main) {
    require([
        'app', 'appUtils', 'backbone'], function (App, AppUtils, Backbone) {
        // Make console.log not throw error if it is not supported by the browser
        if (typeof console === "undefined"){
            console={};
            console.log = function(){
                return;
            };
        }
        window.AppUtils.vent = _.extend({}, Backbone.Events);
        App.initialize();
    });
});