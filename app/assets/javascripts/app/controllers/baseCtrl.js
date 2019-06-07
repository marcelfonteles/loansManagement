var app = angular.module('app03');

app.controller('BaseCtrl', ['$scope', '$log', '$timeout', '$rootScope', function($scope, $log, $timeout, $rootScope) {
	$scope.app = 'BaseCtrl';
	/*******************
	Page Handle
	0 - Index Page (Default)
	1 - Customer Page
	2 - Loan of Customer Page
	********************/
	$rootScope.pageHandle = -1
}])

/*
BaseCtrl - index - includes - variável que decide o include

DashboarCtrl - mudar a variável que decide o include
*/