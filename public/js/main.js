define(function (require){

	var $	= require('jquery'),
		_	= require('underscore'),
   Backbone = require('backbone');

   Backbone.Model.prototype.idAttribute = '_id';

	//Backbone Model Blog
	var Blog = Backbone.Model.extend({
		defaults:{
			author:'',
			title:'',
			url:''
		}
	});

	//Backbone Collection Blog
	var Blogs = Backbone.Collection.extend({
		url: 'http://localhost:3000/api/blogs'
	});

	//Backbone Instance for Collection
	var blogs = new Blogs();

	//Backbone Blog View
	var BlogView = Backbone.View.extend({
		model: new Blog(),
		tagName: 'tr',
		initialize:function(){
			this.template = _.template($('.blog-list-template').html());
		},
		events:{
			'click .edit-blog': 'edit',
			'click .update-blog': 'update',
			'click .cancel': 'cancel',
			'click .delete-blog':'delete'
		},
		edit: function(){
			this.$('.edit-blog,.delete-blog').hide();
			this.$('.update-blog,.cancel').show();

			var author = this.$('.author').html();
			var title = this.$('.title').html();
			var url = this.$('.url').html();

			this.$('.author').html('<input type="text" class="form-control author-update" value="'+author+'"">');
			this.$('.title').html('<input type="text" class="form-control title-update" value="'+title+'"">');
			this.$('.url').html('<input type="text" class="form-control url-update" value="'+url+'"">');
		},
		update: function(){
			this.model.set('author',$('.author-update').val());
			this.model.set('title',$('.title-update').val());
			this.model.set('url',$('.url-update').val());

			this.model.save(null,{
				success: function( response ){
					console.log('successfully update blog with _id'+ response.toJSON()._id);
				},
				error: function(){
					console.log('Failed to update blog!');
				}
			});
		},
		cancel: function(){
			blogsView.render();
		},
		delete: function(){
			this.model.destroy({
				success: function( response ){
					console.log('successfully Deleted blog with _id'+ response.toJSON()._id);
				},
				error: function(){
					console.log('Failed to delete blog!');
				}
			});
		},
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	//Backbone Collection View
	var BlogsView = Backbone.View.extend({
		model: blogs,
		el:$('.blog-list'),
		initialize:function(){
			var self = this;
			this.model.on('add',this.render,this);
			this.model.on('change', function(){
				setTimeout(function(){
					self.render();
				},30);
			}, this);
			this.model.on('remove',this.render, this);

			this.model.fetch({
				success: function(response){
					_.each(response.toJSON(), function(item){
						console.log('Sucessfully GOT blog width id:'+item._id);
					});
				},
				error: function(){
					console.log('Failed to get blogs');
				}
			});

		},
		render: function(){
			var self = this;
			this.$el.html('');

			_.each(this.model.toArray(), function(blog){
				self.$el.append((new BlogView({model:blog})).render().$el);
			});

			return this;
		}
	})

	//Instance for Collection View
	var blogsView = new BlogsView(); 

	//Click Event to create blog
	$(document).ready(function(){
		$('.add-blog').on('click',function(){
			var blog = new Blog({
				author: $('.author-input').val(),
				title:  $('.title-input').val(),
				url:  $('.url-input').val()
			});

			blogs.add(blog);

			blog.save(null,{
				success: function(response){
					console.log('successfully Saved blog with _id'+response.toJSON()._id);
				},
				error: function(){
					console.log('failed to save blog');
				}
			});
		});
	});

});