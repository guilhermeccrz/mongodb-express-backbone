define(function (require) {

	"use strict";
    var $    = require('jquery'),
    Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    ShotsModel = require('../models/shots');

	var listView = Backbone.View.extend({
		el: '.content',
	    getShots:function(page){
	    	var page = page;
			if(typeof page === 'undefined'){page=1;}

	    	var self = this;

		    $.ajax({
		    	method: "GET",
	            url:"https://api.dribbble.com/shots/popular?page="+page,
	            dataType: 'jsonp',
	            success:function(result){
	                console.log(result);
	                var model = new ShotsModel(result.shots);
	                console.log(result.pages);

	                //content
	                var source = $('#template').html();
			        var template = Handlebars.compile(source);
			        var html1 = template(model.toJSON());

			        //pagination
			        var source = $('#template-pagination').html();
			        var template = Handlebars.compile(source);
			        var html2 = template(result.pages);

			        self.$el.html(html2+html1);

			        //set active pagination
			        var activePage = result.page;
			        console.log('active'+activePage);
			        $('.pagination li:eq('+activePage+')').addClass('active');

	            }
	        });
	    },
	    render: function(page) {
	    	this.getShots(page);
	    }
	}); 

	return listView;
});