angular.module('eventController', [])

	// inject the Event service factory into our controller
	.controller('eventController', ['$scope','$http','Events', function($scope, $http, Events) {
		$scope.formData = {};
		$scope.allDatesShown = false;
		$scope.pastEventDisplay = 'none';
		// GET =====================================================================
		// when landing on the page, get all events and show them
		// use the service to get all the events
		Events.get()
			.success(function(data) {
				$scope.events = data.futureevents;
				$scope.pastevents = data.pastevents;
				$scope.displayedEvents = data.futureevents.length;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createEvent = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen

			if ($scope.formData.occasion != undefined) {
				Events.create($scope.formData)
					.success(function(data) {
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.events = data.futureevents;
						$scope.pastevents = data.pastevents;
						if ($scope.allDatesShown) $scope.displayedEvents++;
						else $scope.displayedEvents = data.futureevents.length;
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteEvent = function(occasion) {
			Events.delete(occasion)
				// if successful creation, call our get function to get all the new events
				.success(function(data) {
					$scope.events = data.futureevents;
					$scope.pastevents = data.pastevents;
					if ($scope.allDatesShown) $scope.displayedEvents--;
					else $scope.displayedEvents = data.futureevents.length; // assign our new list of events
				
				});
		};

		$scope.showPastEvents = function() {
			if (!$scope.allDatesShown) {
				document.getElementById('showEvents').innerHTML = "Show only future Events";
				$scope.displayedEvents = $scope.events.length + $scope.pastevents.length;
				$scope.allDatesShown = true;
			} else {
				document.getElementById('showEvents').innerHTML = "Show Previous Events";
				$scope.displayedEvents = $scope.events.length;
				$scope.allDatesShown = false;
			}
		};

	}]);