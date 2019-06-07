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
	// Deleting Loan
	$scope.deleteLoan = function(loan_id) {
		if (confirm("Are you sure?")) {
			DashboardService.deleteCustomerLoan(loan_id).then(function(response) {
				alert("Loan successfully deleted")
				$scope.loans = $scope.loans.filter(function(loan) {
					return loan.id !== loan_id
				})
			})
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

  $scope.seeLoan = function(loan){
  	$rootScope.pageHandle = 2
  	$rootScope.loan_id = loan.id
  }
}])