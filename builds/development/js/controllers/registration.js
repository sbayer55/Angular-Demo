myapp.controller('RegistrationController', 
	function($scope, $firebaseAuth, $location, Authentication, fb_url) {
	
	// Sample code:
	$scope.name = 'Steve';
	
	//onLoad:
	/*$scope.$on('$viewContentLoaded', function() {
	});*/
	
	var ref = new Firebase(fb_url);
	var auth = $firebaseAuth(ref);
	
	$scope.login = function() {
		// oops:
		Authentication.login($scope.user)
		.then(function(user) {
			$location.path('/meetings');
		})
		.catch(function(error) {
			console.log(error);
			$scope.message = error.message;
		});
	}; //login
	
	$scope.register = function() {
		Authentication.register($scope.user)
			.then(function(user) {
				Authentication.login($scope.user);
				$location.path('/meetings');
			})
			.catch(function(error) {
				$scope.message = error.message;
			}); //Authentication.register - catch
	}; //register
	
	
}); //RegistrationController