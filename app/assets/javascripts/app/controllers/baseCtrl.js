var app = angular.module('app03');

app.controller('BaseCtrl', ['$scope', '$log', '$timeout', '$rootScope', '$location', function($scope, $log, $timeout, $rootScope, $location) {
	$scope.app = 'BaseCtrl';
	$rootScope.pageHandle = 0
	$log.log($location.url())

	/*******************
	Page Handle
	0 - Index Page (Default)
	1 - Customer Page
	2 - Loan of Customer Page
	********************/
	

}])
