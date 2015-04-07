define(function (require) {

	"use strict";
    var $    = require('jquery'),
    Backbone = require('backbone');

	var AppRouter = Backbone.Router.extend({

	    routes: {
	        "" : "listRoute"
	    },

	    listRoute: function(){
		
	    },

	    initialize: function(){
	    	console.log('Initializing routes -->');
	    }
	});

	var appRouter = new AppRouter();
	Backbone.history.start();

});