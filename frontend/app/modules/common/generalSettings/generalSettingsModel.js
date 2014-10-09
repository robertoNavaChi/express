define(['require', 'backbone', 'underscore', 'jquery', 'amplify', 'i18n', 'appUtils'],
    function (require, Backbone, _, $, amplify, i18n) {

        var GeneralSettings = Backbone.Model.extend({

            defaults: {
                username: undefined,
                //restApiUrl: 'http://localhost:8080/api/',
                restApiUrl: '',
                lang: 'en_US', // Central System's default language
                dateFormat: 'dddd, MMMM Do YYYY, h:mm:ss a',
                rememberMe: false,
				displayName: '',
                refreshRateForNotificationDetailsModel: 5000,
                mainMenuAccess: [],
                settingsMenuAccess: []
            },

            initialize: function() {

                // Read and set REST api URL
                if(window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
                    xmlhttp = new XMLHttpRequest();
                }else{// code for IE6, IE5
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                xmlhttp.open("GET","restURL.txt",false);
                xmlhttp.send();
                if(xmlhttp.status != 200){
                    noty({
                        text: "ERROR - Couldn't load the REST api url file!",
                        type: 'error'
                    });
                    this.set({ restApiUrl: 'http://localhost:8080/api/' });
                }else{
                    this.set({ restApiUrl: xmlhttp.responseText });
                }

                this.tryToRestorePreviousLoggedInSession();

            },

            getContent: function () {

                var obj = {};

                $('* [data-attribute]').each(function () {
                    var attribute = $(this).data('attribute');
                    var value = $(this).val();
                    var valueOk = value.replace(/\\/g, "\\\\");

                    var attr = "obj." + attribute;
                    eval(attr + "=value");
                });

                return obj;

            },

            tryToRestorePreviousLoggedInSession: function() {
                var sessionData = amplify.store();
                if(_.isUndefined(sessionData) === false && _.isUndefined(sessionData.generalSettings) === false) {
                    this.set({
                        username: sessionData.generalSettings.username,
                        rememberMe: sessionData.rememberMe,
                        displayName: sessionData.UserData.displayName,
                        mainMenuAccess: sessionData.UserData.mainMenuAccess,
                        settingsMenuAccess: sessionData.UserData.settingsMenuAccess,
                    });
                    //this.defineLanguage(sessionData.generalSettings.lang);
                    $.fn.setAuthorizationCredentials({base64Credentials: sessionData.base64Credentials});
                }
                return this;
            },

            isLoggedIn: function() {
                var credentials = amplify.store('base64Credentials');

                // If there are no credentials stored locally or they are dummy credentials that means the user is not
                // logged in
                if(_.isUndefined(credentials) || credentials === 'd3JvbmdwYXNzOndyb25ncGFzcw==') {
                    return false;
                }
                return true;
            },

            logout: function() {
                this.destroySessionData();
                // send REST request to logout
                app.navigate("#login", {trigger: true});
                return this;
            },

            destroySessionData: function() {
                this.set({username: undefined});
                this.set({displayName: undefined, mainMenuAccess: [], settingsMenuAccess: []});
                this.deleteStoredSessionData();
                $.fn.setAuthorizationCredentials();
                return this;
            },

            deleteStoredSessionData: function() {
                amplify.store('base64Credentials', null);
                amplify.store('generalSettings', null);
                amplify.store('rememberMe', null);
                amplify.store('UserData', null);
                return this;
            },

            storeCurrentLoggedInSessionData: function(base64Credentials, rememberMe) {
                amplify.store('base64Credentials', base64Credentials);
                amplify.store('rememberMe', rememberMe);
                amplify.store('generalSettings', {
                    lang: this.get('lang'),
                    username: this.get('username')
                });
                amplify.store('UserData', {
                    displayName: this.get('displayName'),
                    mainMenuAccess: this.get('mainMenuAccess'),
                    settingsMenuAccess: this.get('settingsMenuAccess')
                });
                return this;
            },

            getBase64Credentials: function() {
                return amplify.store('base64Credentials');
            }

        });

        return GeneralSettings;
    });