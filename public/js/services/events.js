angular.module('eventService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Events', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/events');
			},
			create : function(eventData) {
				return $http.post('/api/events', eventData);
			},
			delete : function(occasion) {
				return $http.delete('/api/events/' + occasion);
			}
		}
	}]);