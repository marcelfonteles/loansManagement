var app = angular.module('app03');

app.controller('DashboardCtrl', ["$scope", "$log", "$http", "DashboardService", "$rootScope", function($scope, $log, $http, DashboardService, $rootScope) {
  // this variable do nothing
  $scope.app = 'Sistema de Gerenciamento';
  // this variable defines if a form for new customer is showed or not
  $scope.clickedNewCustomerVar = false;
  // Setting pageHandle to 0
  $rootScope.pageHandle = 0;
  
  // Getting the total amount and the number of loan for displaying info in the dashboard
  DashboardService.getTotalAmount().then(function(response) {
    $scope.totalAmount = response.data.totalAmount
    $scope.numberLoans = response.data.numberLoans
    $scope.percentage = response.data.percentage
  });

  // Getting customers from service
  this.getCustomers = function() {
    DashboardService.getCustomers().then(function(response) {
      $scope.customers = response.data.data;
    })
  };
  
  // Calling the getCustomers
  this.getCustomers();

  // Hidding/Showing the new customer form
  $scope.clickedNewCustomer = function() {
    
    if ( $scope.clickedNewCustomerVar === true) {
      $scope.clickedNewCustomerVar = false;
    } else {
      $scope.clickedNewCustomerVar = true;
    }
  };
  
  // Sending the new customer to database
  $scope.addCustomer = function(customer){
    DashboardService.addCustomer(customer).then(function(response) {
      alert("Customer submitted with success");
      $scope.customers.push(response.data.data)
      delete $scope.customer;
      $scope.clickedNewCustomerVar = false;
    })
  };
  
  // Getting the customer page
  $scope.seeCustomer = function(customer_id) {
    $rootScope.pageHandle = 1
    $rootScope.customer_id = customer_id
  }

  /*
  // Getting the customer page
  $scope.seeCustomer = function(customer_id) {
    DashboardService.getCustomer(customer_id).then(function(response) {
      $scope.customers = [response.data.data]
      $scope.isIndex = false
    });
    DashboardService.getCustomerLoans(customer_id).then(function(response) {
      $scope.loans = response.data.data
    }) 
  }
  // Delete loan of customer
  $scope.deleteLoan = function(loan_id) {
    if (window.confirm("Are you sure?")) {
      DashboardService.deleteCustomerLoan(loan_id).then(function(response) {
        alert(response.data.message)
        $scope.loans = $scope.loans.filter(function(loanInner) {
          return loanInner.id != loan_id
        })
      }, function(response) {
        alert("was not possible to delete this loan.")
      })
    } 
  };
  // Creating loan of customer
  $scope.addLoan = function(loan) {
    DashboardService.addLoan(loan).then(function(response) {
      $log.log(response.data.message)
    }, function(response) {
      $log.log(response.data.message)
    })
  };
  // Defining the behavior of form for new loan
  $scope.clickedNewLoanVar = false;
  $scope.clickedNewLoan = function() {
    if ($scope.clickedNewLoanVar === true) {
      $scope.clickedNewLoanVar = false;
      delete $scope.loan;
    } else {
      $scope.clickedNewLoanVar = true;
    }
  }
  // Saving the new loan in database
  $scope.addLoan = function(loan) {
    loan.customer_id = $scope.customers[0].id
    DashboardService.addLoan(loan).then(function(response) {
      $scope.loans.push(response.data.data)
      alert(response.data.message)
      $scope.clickedNewLoanVar = false;
      delete $scope.loan
    })
  };
  // Defining the behavior for confirming or canceling the payment of a portion
  $scope.seeLoan = function(loan) {
    $scope.loans = [loan]
    $scope.date = JSON.parse(loan.date)
    $scope.isLoanPage = true;
  }

  // Confirming payment
  $scope.confirmPayment = function(portionNumber) {
    if (window.confirm("Are you sure?")) {
      // Formating the parameters
      $scope.date[portionNumber - 1].paid = "true";
      $scope.sendConfirmation = angular.copy($scope.date);
      $scope.sendConfirmation.push({loan_id: $scope.loans[0].id})
      // Sending formatted parameters
      DashboardService.confirmPayment(JSON.stringify($scope.sendConfirmation)).then(function(response) {
        // $log.log(response.data.data)
      })  
    }
  }
  $scope.cancelPayment = function(portionNumber) {
    if (confirm("Are you sure?")) {
      $scope.date[portionNumber - 1].paid = "false";
      $scope.sendConfirmation = angular.copy($scope.date);
      $scope.sendConfirmation.push({loan_id: $scope.loans[0].id})
      // Sending formatted parameters
      DashboardService.cancelPayment(JSON.stringify($scope.sendConfirmation)).then(function(response) {
        $log.log(response.data.data)
      }) 
    }
  }
  */
}])