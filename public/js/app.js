
// For any third party dependencies, like jQuery, place them in the lib folder.
// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
	baseUrl:'js/libs',

	paths: {
		main: '../main',
		router: '../router',
		jquery: 'jquery.min',
		underscore: 'underscore-min',
		backbone: 'backbone-min',
		handlebars: 'handlebars-v3.0.0'
	},

	shim: {
		jquery: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        },
        handlebars: {
			exports: 'Handlebars'
        },
        backbone: {
            deps: ['underscore', 'jquery', 'handlebars'],
            exports: 'Backbone'
        },
        router: {
            deps: ['main']
        },
       
	}
});
// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['router']);