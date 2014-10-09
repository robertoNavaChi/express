/**
 * Description: This module creates an object where developers should put the application's global variables.
 * It is helpful because it avoids to much pollution of the global namespace avoiding possible conflicts for example:
 * with project libs and browser extensions.
 */
define([],
    function () {
        window.AppUtils = window.AppUtils || {};

        return window.AppUtils;

    });