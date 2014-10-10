define([
    'jquery', 'underscore', 'backbone', 'generalSettings', 'loginPage'
], function ($, _, Backbone, GeneralSettings, LoginPage) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'goToFirstPage',
            'login': 'loginPage',
			'*actions': 'notFound'
        },

        titles: {
            '': 'Overview',
            'login': 'Login',
            '*actions': 'Not Found'
        },

        resolveTitle: function(route) {

            var title = this.titles[route];
            if(_.isUndefined(title) === false) {
                return title;
            }

            return undefined;

        },

		before: function( route ) {

            document.title = this.resolveTitle(route);

        },

        initialize: function() {

            this.lastRoute = undefined;
            window.AppUtils.generalSettings = new GeneralSettings();
            this.$bodyContent = $('#body-content');

            window.AppUtils.currentMachineGroup = {
                Machine: '',
                Group: ''
            };

        },

        loginPage: function() {

            this.loginPage = new LoginPage();
            this.$bodyContent.html(this.loginPage.render().el);

        },

        goToFirstPage: function() {

            app.navigate('login', {trigger: true});

        }

    });

    var initialize = function () {

        app = new AppRouter();
        Backbone.history.start();

    };

    return {

        initialize: initialize

    };
});