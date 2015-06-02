myapp.controller('MeetingsController', 
	function($scope, $rootScope, $firebaseObject, $firebaseArray, CountMeetings, fb_url) {
	
	var firebase = new Firebase(fb_url + '/users/' + $rootScope.currentUser.$id + '/meetings');
	
	var meetingsObj = $firebaseObject(firebase);
	
	//loaded called when the server data has been loaded
	meetingsObj.$loaded().then(function(data) {
		$scope.meetings = data;
	});
	
	
	$scope.meetings = meetingsObj;
	
	$scope.addMeeting = function() {
		firebase.push({
			name: $scope.meetingname, 
			date: Firebase.ServerValue.TIMESTAMP
		}, //On complete:
		function(error) {
			if (error) { //Catch errors here:
				
			}
			else { //The meeting has been added:
				$scope.meetingname = '';
			}
		});//push
	}; //addMeeting
	
	$scope.deleteMeeting = function(key) {
		firebase.child(key).remove();
	}; //addMeeting
	
}); //MeetingsController