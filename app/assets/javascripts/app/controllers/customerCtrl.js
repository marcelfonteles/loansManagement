var app = angular.module('app03');

app.controller('CustomerCtrl', ["$scope", "$rootScope", "$log", "DashboardService", function($scope, $rootScope, $log, DashboardService) {
	// Behavior variables
	// Variable responsable for hidding/showing New Loan Form
	$scope.wantNewLoan = true;

	// Getting the customer
	DashboardService.getCustomer($rootScope.customer_id).then(function(response) {
		$scope.customer = response.data.data;	
	})

	// Getting the customer's loans
	DashboardService.getCustomerLoans($rootScope.customer_id).then(function(response) {
		$scope.loans = response.data.data;
	})

	// Hidding/showing New Loan Form
	$scope.clickedNewLoan = function() {
		if ($scope.wantNewLoan === true) {
			$scope.wantNewLoan = false
		} else {
			$scope.wantNewLoan = true
		}
	}

	// Creating loan of customer
  	$scope.addLoan = function(loan) {
  		loan.customer_id = $scope.customer.id
	    DashboardService.addLoan(loan).then(function(response) {
	      $log.log(response.data.message)
	      $scope.wantNewLoan = true
    	  delete $scope.loan
	    }, function(response) {
	      $log.log(response.data.message)
    	})

  };
}])