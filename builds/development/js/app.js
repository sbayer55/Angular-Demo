//angular.module(ModuleName, [Inject])
var myapp = angular.module('myapp', ['ngRoute', 'firebase', 'appControllers'])
.constant('fb_url', 'https://luminous-fire-7580.firebaseio.com');

//angular.module('Module', 'dependancies')
var appControllers = angular.module('appControllers', ['firebase']);

myapp.run(['$rootScope', '$location', function($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function(event, next, previous, error) {
		if (error == 'AUTH_REQUIRED') {
			$rootScope.message = 'Sorry, you must log in to access that page.';
			$location.path('/login');
		}
		else {
			$rootScope.message = 'routeChaneError: ' + error;
			console.log('route error');
		}
	});
	/*
	$rootScope.$on('$routeChangeStart', function(event, next, previous, error) {
		if (typeof previous != 'undefined') {
			console.log('Previous');
			console.log(previous);
		}
		if (typeof next != 'undefined') {
			console.log('Next');
			console.log(next.loadedTemplateUrl);
		}
	});
	*/
	/*
	$rootScope.$on('$routeChangeSuccess', function(event, next, previous, error) {
		if (typeof previous != 'undefined') {
			console.log('Previous');
			console.log(previous);
		}
		if (typeof next != 'undefined') {
			console.log('Next');
			console.log(next.loadedTemplateUrl);
		}
	});*/
}]);

myapp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/login', {
			templateUrl: 'views/login.html',
			controller: 'RegistrationController'
		}).
		when('/register', {
			templateUrl: 'views/register.html',
			controller: 'RegistrationController'
		}).
		when('/checkins/:uid/:mid', {
			templateUrl: 'views/checkins.html',
			controller: 'CheckinsController'
		}).
		when('/checkins/:uid/:mid/checkinsList', {
			templateUrl: 'views/checkinsList.html',
			controller: 'CheckinsController'
		}).
		when('/meetings', {
			templateUrl: 'views/meetings.html',
			controller: 'MeetingsController', 
			resolve: {
				currentAuth: function(Authentication) {
					return Authentication.requireAuth();
				}
			} //resolve
		}).
		otherwise({
			redirectTo: '/login',
			resolve: {
				print: function() {
					console.log('## Bad URL, default to /login');
					return true;
				}
			} //resolve
		});
}]);