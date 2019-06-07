var app = angular.module('app03')
/*
* I tried to use this factory to control the include with pageHandle
* But i found a better solution using $rootScope
*/
app.factory('BaseFactory', ['$log', '$timeout', function($log, $timeout) {
	var pageHandle = { 
						'page': 0 
					 };
	/*******
	Page Number
	0 - Index Page
	1 - Customer Page
	2 - Customer's Loan Page
	********/
	function setPage(pageNumber) {
		if (pageNumber) {
			pageHandle.page = pageNumber
		} else {
			pageHandle.page = 0
		}
	};
	return {
			set: setPage,
			value: pageHandle 
		   }
}])