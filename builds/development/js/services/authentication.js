myapp.factory('Authentication', 
	function($firebase, $firebaseObject, $firebaseAuth, $rootScope, $routeParams, $location, fb_url) {
	
	var ref = new Firebase(fb_url);
	var auth = $firebaseAuth(ref);
	
	$rootScope.currentUser = '';
	
	auth.$onAuth(function(authUser) {
		if (authUser) { //user logged in
			var ref = new Firebase(fb_url + '/users/' + authUser.uid);
			var user = $firebaseObject(ref);
			$rootScope.currentUser = user;
			
			console.log('Active user detected:');
			console.log(user);
		}
		else { //not logged in
			$rootScope.currentUser = '';
			console.log('no user');
		}
	});
	
	var factoryObject = {
		
		login: function(user) {
			console.log("Login in as " + user.email);
			return auth.$authWithPassword({
				email: user.email, 
				password: user.password
			}); //authWithPassword
		}, //login
		
		logout: function(user) {
			console.log('Loging out');
			return auth.$unauth();
		}, //logout
		
		requireAuth: function(user) {
			console.log('requireAuth check');
			return auth.$requireAuth();
		}, //requireAuth
		
		waitForAuth: function(user) {
			console.log('waitForAuth...');
			return auth.waitForAuth();
		}, //waitForAuth
		
		register: function(user) {
			console.log("Making an account for " + user.email);
			return auth.$createUser({
				email: user.email, 
				password: user.password
			})
			.then(function(fb_userData) {
				var fbUsers = new Firebase(fb_url + '/users');
				//var fbUsersObj = $firebaseObject(fbUsers);
				
				var userInfoObject = {
					date: Firebase.ServerValue.TIMESTAMP,
					regUser: fb_userData.uid,
					firstname: user.firstname,
					lastname: user.lastname,
					email: user.email
				}; //userInfo
				
				fbUsers.child(fb_userData.uid).set(userInfoObject);
			}); //register - then
		} //register

	}; //factoryObject
	
	return factoryObject;
});