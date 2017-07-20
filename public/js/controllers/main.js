angular.module('eventController', [])

	// inject the Todo service factory into our controller
	.controller('eventController', ['$scope','$http','Events', function($scope, $http, Events) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all events and show them
		// use the service to get all the events
		Events.get()
			.success(function(data) {
				$scope.events = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createEvent = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.ocassion != undefined) {
				// $scope.loading = true;
				// VALIDATE FIELD ARE IN PROPER FORMAT
				// call the create function from our service (returns a promise object)
				Events.create($scope.formData)

					// if successful creation, call our get function to get all the new events
					.success(function(data) {
						// $scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.events = data; // assign our new list of events
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		// $scope.deleteEvent = function(occasion) {
		// 	$scope.loading = true;

		// 	Events.delete(occasion)
		// 		// if successful creation, call our get function to get all the new events
		// 		.success(function(data) {
		// 			$scope.loading = false;
		// 			$scope.events = data; // assign our new list of events
		// 		});
		// };
	}]);