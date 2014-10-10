define(['backbone', 'handlebars', 'text!../app/modules/login/templates/loginPageTemplate.html'],
	function (Backbone, Handlebars, LoginPageTemplate) {

        var LoginPage = Backbone.View.extend({

            initialize: function () {

                console.log('login - initialize');

                this.loginPageTemplate = Handlebars.compile(LoginPageTemplate);

                return this;

            },

            render: function(){
                
                this.$el.html(this.loginPageTemplate());
                this.$el.i18n();

                _.defer(_.bind(this.afterRender, this));
				
                return this;

            },

            afterRender: function() {


            }

        });

        return LoginPage;

    });