define(function (require) {

	"use strict";
    var $    = require('jquery'),
    	_	 = require('underscore'),
    Backbone = require('backbone');

	console.log('Starting Main.js -->');

	//	Backbone Model
	var Blog = Backbone.Model.extend({
		defaults:{
			author:'',
			title: '',
			url: ''
		}
	});

	//	Backbone Collection
	var Blogs = Backbone.Collection.extend({});

	//	instatiante two Blogs

	/*var blog1 = new Blog({
		author:'Guilherme Blog',
		title: 'Guilherme \'s Blog',
		url: 'http://www.guilherme.com'
	});

	var blog2 = new Blog({
		author:'Gustavo Blog',
		title: 'Gustavo \'s Blog',
		url: 'http://www.gustavo.com'
	});*/

	//	instatiate a collection
	var blogs =  new Blogs(/*[blog1, blog2]*/);

	//	Backbone Views for one blog
	var BlogView = Backbone.View.extend({
		model: new Blog(),
		tagName: 'tr',
		initialize: function(){
			this.template = _.template($('.blogs-list-template').html());
		},
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
		
			return this;
		}

	});

	//	Backbone View for all blogs
	var BlogsView = Backbone.View.extend({
		model: blogs,
		el: $('.blogs-list'),
		initialize: function(){
			this.model.on('add', this.render, this);
		},
		render: function(){
			console.log('rendering Blogsview');
			var self = this;
			this.$el.html('');

			_.each(this.model.toArray(), function(blog) {
				self.$el.append((new BlogView({model: blog})).render().$el);
			});

			return this;
		}
	});

	var blogsView = new BlogsView();

	$(document).ready(function(){
		$('.add-blog').on('click', function(){
			console.log('click');
			var blog = new Blog({
				author: $('.author-input').val(),
				title:  $('.title-input').val(),
				url:  $('.url-input').val()

			});
			console.log(blog.toJSON());
			blogs.add(blog);
		});
	});


});