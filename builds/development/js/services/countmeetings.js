myapp.factory('CountMeetings', function($firebase, $firebaseArray, $rootScope, fb_url) {
	
	var firebase = new Firebase(fb_url + '/users/' + $rootScope.currentUser.$id + '/meetings');
	
	var meetingsArr = $firebaseArray(firebase);
	
	meetingsArr.$loaded(function(data) {
		$rootScope.howManyMeetings = meetingsArr.length;
	});
	
	meetingsArr.$watch(function(data) {
		$rootScope.howManyMeetings = meetingsArr.length;
	});
	
	return true;
});