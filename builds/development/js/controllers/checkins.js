myapp.controller('CheckinsController', 
	function($scope, $rootScope, $firebaseObject, $firebaseArray, $routeParams, $location, CountMeetings, Authentication, fb_url) {
	
	$scope.whichmeeting = $routeParams.mid;
	$scope.whichuser = $routeParams.uid;
	$scope.order = 'lastname';
	$scope.direction = null;
	$scope.recordId = '';
	$scope.query = '';
	
	var ref = new Firebase(fb_url + 
		'/users/' + $scope.whichuser + 
		'/meetings/' + $scope.whichmeeting + 
		'/checkins');
	
	var checkinsList = $firebaseArray(ref);
	$scope.checkins = checkinsList;
	
	$scope.addCheckin = function() {
		/* You can push data this way through an object, this will allow angular to $watch
		var checkinsObj = $firebaseObject(ref);
		checkinsObj.checkins = myData;
		checkinsObj.$save().then(function(ref) {
			//ref.key() ==== checkinsObj.$id
			$location.path('/checkins/' + $scope.whichuser + '/' 
				+ $scope.whichmeeting + 'checkinslist');
		}, 
		function(error) {
		});
		*/
		$location.path('/checkins/' + $scope.whichuser + '/' 
			+ $scope.whichmeeting + '/checkinslist');
			
		ref.push({
			firstname: $scope.user.firstname, 
			lastname: $scope.user.lastname, 
			email: $scope.user.email, 
			date: Firebase.ServerValue.TIMESTAMP
		}, 
		function(error) {
			$location.path('/checkins/' + $scope.whichuser + '/' + $scope.whichmeeting + '/checkinsList');
		}); //push
		
	}; //addCheckin
	
	$scope.pickRandom = function() {
		var whichRecord = Math.round(Math.random() * checkinsList.length);
		$scope.recordId = checkinsList.$keyAt(whichRecord);
	}; //pick random
	
	$scope.deleteCheckin = function(id) {
		ref.child(id).remove();
	};
	
	$scope.showLove = function(myItem) {
		myItem.show = !myItem.show;
		
		if (myItem.userState == 'expanded') {
			myItem.userState = '';
		}
		else {
			myItem.userState = 'expanded';
		}
	}; //show love
	
	$scope.giveLove = function(myItem, myGift) {
		var refLove = new Firebase(fb_url + '/users/'+
      $scope.whichuser + '/meetings/' +
      $scope.whichmeeting + '/checkins/' + myItem.$id +
      '/awards');
		//var checkinsObj = $firebaseObject(refLove);
		
		refLove.push({
			name: myGift, 
			date: Firebase.ServerValue.TIMESTAMP
		}, function(error) {
			
		});
	};
	
	$scope.deleteLove = function(checkinId, award) {
		console.log('Delete? ' + checkinId);
		var refLove = new Firebase(fb_url + '/users/'+
      $scope.whichuser + '/meetings/' +
      $scope.whichmeeting + '/checkins/' + checkinId +
      '/awards');
			console.log(refLove.child(checkinId).key());
		refLove.child(award).remove(function(error) {
		});
	}
});