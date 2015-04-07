define(function (require) {

	"use strict";
    var $    = require('jquery'),
    Backbone = require('backbone');

	var Shot = Backbone.Model.extend({
		defaults:{
			
		},

		initialize: function(){
			console.log('Im a Dwarf! Initializing Shot Model');
		}

	});

	var Shots = Backbone.Collection.extend({
		model: Shot,
		initialize: function(){
			console.log('Im a Hobbit! Initializing Shots Model');

		}

	});

	return Shots;

});