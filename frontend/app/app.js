define([
    'jquery',
    'underscore',
    'backbone',
    'router'
], function($, _, Backbone, Router){
    var initialize = function(){
        var option = {
            lng: 'en_US',
            fallbackLng: false,
            resGetPath: 'languages/__lng__/__ns__.json'
        };
        // Can only initialize router after loading internationalization resources otherwise I might render a template
        // before it is available
        $.i18n.init(option, function(t) {
            Router.initialize();
        });

    };

    return {
        initialize: initialize
    };
});
