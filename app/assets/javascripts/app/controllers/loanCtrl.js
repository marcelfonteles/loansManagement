var app = angular.module('app03');

app.controller('LoanCtrl', ["$scope", "$rootScope", "$log", "DashboardService", function($scope, $rootScope, $log, DashboardService) {
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