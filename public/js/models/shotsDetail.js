define(function (require) {

	"use strict";
    var $    = require('jquery'),
    Backbone = require('backbone');

	var ShotDetails = Backbone.Model.extend({


		initialize: function(){
			console.log('Im a Shot Bitch! Initializing Shot Detail Model');
			this.on('change', this.update);
		},

		update: function(e){
			var self = this;
			console.log('update model->'+e);

		},

		getJson: function(id){
 			$.ajax({
		    	method: "GET",
	            url:"https://api.dribbble.com/shots/"+id,
	            dataType: 'jsonp',
	            success:function(result){
	                self.set(result);
	            }
	        });
		}

	});


	return ShotDetails;

});