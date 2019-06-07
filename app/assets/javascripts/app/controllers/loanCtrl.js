var app = angular.module('app03');

app.controller('LoanCtrl', ["$scope", "$rootScope", "$log", "DashboardService", "$location", function($scope, $rootScope, $log, DashboardService, $location) {
	// Setting behavior when refreshing page happens
	if ($rootScope.customer_id) {
		// Do nothing
	} else {
		// Original hash
		// hash = /customer/1/loan/28

		// Getting the hash
		var hash = $location.url()
		// Getting the position of the last '/'
		var lastIndex = hash.lastIndexOf('/')
		// Getting the loan ID using the lastIndex
		$rootScope.loan_id = hash.substr(lastIndex + 1, (hash.length - lastIndex + 1))
		// Updating the hash to get customer ID
		// hash = /customer/1
		hash = hash.substr(0, lastIndex-5)
		// Getting the customer ID
		$rootScope.customer_id = hash.substr(10, (hash.length - 9))
		$rootScope.pageHandle = 2
	}
	
	DashboardService.getCustomer($rootScope.customer_id).then(function(response) {
		$scope.customer = response.data.data;	
	})
	
	// Getting Loans - two ways
	// First: transform $scope.loans from CustomerCtrl in $rootScope.loans and then delete from variable all loans except one.
	// Second: make the request again
	DashboardService.getLoan($rootScope.loan_id).then(function(response) {
		$scope.loan = response.data.data;	
		$scope.date = JSON.parse($scope.loan.date)

	})

	// Deleting Loan
	$scope.deleteLoan = function(loan_id) {
		if (confirm("Are you sure?")) {
			DashboardService.deleteCustomerLoan(loan_id).then(function(response) {
				alert("Loan successfully deleted")
				$scope.loan = {}
				$scope.date = {}
			})
		}
	}

	// Confirming payment
  	$scope.confirmPayment = function(portionNumber) {
	    if (window.confirm("Are you sure?")) {
	      // Formating the parameters
	      $scope.date[portionNumber - 1].paid = "true";
	      $scope.sendConfirmation = angular.copy($scope.date);
	      $scope.sendConfirmation.push({loan_id: $scope.loan.id})
	      // Sending formatted parameters
	      DashboardService.confirmPayment(JSON.stringify($scope.sendConfirmation)).then(function(response) {
	        // $log.log(response.data.data)
	      })  
	    }
	}
	// Cancelling payment
  	$scope.cancelPayment = function(portionNumber) {
	    if (confirm("Are you sure?")) {
	      $scope.date[portionNumber - 1].paid = "false";
	      $scope.sendConfirmation = angular.copy($scope.date);
	      $scope.sendConfirmation.push({loan_id: $scope.loan.id})
	      // Sending formatted parameters
	      DashboardService.cancelPayment(JSON.stringify($scope.sendConfirmation)).then(function(response) {
	        $log.log(response.data.data)
	      }) 
	    }
  	}
}])