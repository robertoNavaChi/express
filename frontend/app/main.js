// Require.js allows us to configure shortcut alias
require.config({
    paths: {
        // libs
        jquery: '../libs/jquery/jquery',
        underscore: '../libs/underscore/underscore',
        backbone: '../libs/backbone/backbone',
        handlebars: '../libs/handlebars/handlebars',

        // Used for internationalization
        i18n: '../libs/i18next/i18next.amd.withJQuery-1.6.3',

        // Amplify's store component handles persistent client-side storage, using standards like localStorage and
        // sessionStorage, but falling back on non-standard implementations for older browsers.
        amplify: '../libs/amplify/amplify',

        // MOG web app
        appUtils: 'modules/common/appUtils',
        generalSettings: 'modules/common/generalSettings/generalSettingsModel'

        // VIEWS
        loginPage:'modules/login/views/loginPage',

    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'jquery': {
            exports: ['jQuery', '$']
        },
        'handlebars': {
            exports: 'Handlebars'
        }
    }
});