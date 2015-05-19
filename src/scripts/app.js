/*jslint devel: true*/
/*global Framework7, Dom7, Template7, PouchDB */
(function (F7, $$, T7, DB) {
    
    'use strict';
    
    var db = new DB('expenses'),
        app = new F7(),
        mainView = app.addView('.main-view');
    
    window.app = app;
    
}(Framework7, Dom7,  Template7, PouchDB));