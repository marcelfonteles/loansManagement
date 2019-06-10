var app = angular.module('app03');

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider
		.when('/',{
			templateUrl: '/components/indexPage.html',
			controller: 'DashboardCtrl'
		})
		.when('/customer/:customer_id', {
			templateUrl: '/components/customerPage.html',
			controller: 'CustomerCtrl'
		})
		.when('/customer/:customer_id/loan/:loan_id', {
			templateUrl: '/components/loansPage.html',
			controller: 'LoanCtrl'
		})
		.when('/first', {
			template: 'Hello World!'
		})
		.when('/profile', {
			templateUrl: '/components/profilePage.html'
		})
		.otherwise({
			templateUrl:'/components/404.html'
		})
}])