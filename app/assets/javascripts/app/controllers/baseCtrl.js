var app = angular.module('app03');

app.controller('BaseCtrl', ['$scope', '$log', function($scope, $log) {
	$scope.app = 'BaseCtrl';
	/*******************
	Page Handle
	0 - Index Page (Default)
	1 - Customer Page
	2 - Loan of Customer Page
	********************/
	$scope.pageHandle = 0 //Index Page
}])