var app = angular.module('app03');

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider
		.when('/',{
			templateUrl: '/components/indexPage.html',
			controller: 'DashboardCtrl'
		})
		.when('/first', {
			template: 'Hello World!'
		})
		.otherwise({
			templateUrl:'/components/404.html'
		})
}])