define(function (require) {

	"use strict";
    var $    = require('jquery'),
    Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    ShotsDetailsModel = require('../models/shotsDetail');

    var modelDetail = new ShotsDetailsModel

	var shotView = Backbone.View.extend({
		el: '.content',
	    getShot:function(id){
	    	var self = this;

		    $.ajax({
		    	method: "GET",
	            url:"https://api.dribbble.com/shots/"+id,
	            dataType: 'jsonp',
	            success:function(result){
	                console.log(result);
	                var modelDetail = new ShotsDetailsModel(result);

	                var source = $('#templateShotDetail').html();
			        var template = Handlebars.compile(source);
			        var html = template(modelDetail.toJSON());
			        self.$el.html(html);
	            }
	        });


	    },

	    setTemplate:function(){

			var source = $('#templateShotDetail').html();
	        var template = Handlebars.compile(source);
	        var html = template(ShotsDetailsModel.toJSON());
	        self.$el.html(html);

	    },

	    render: function(id) {
	    	//this.getShot(id);
	    	//listener da model
	    	this.listenTo(modelDetail, 'change', this.setTemplate);
	    }
	}); 

	return shotView;
});