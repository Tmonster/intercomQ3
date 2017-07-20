angular.module('eventService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Events', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/events');
			},
			create : function(todoData) {
				console.log("called create");
				return $http.post('/api/todos', todoData);
			}
			// delete : function(id) {
			// 	return $http.delete('/api/todos/' + id);
			// }
		}
	}]);