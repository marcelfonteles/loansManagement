var app = angular.module('app03');

app.service("DashboardService", ["$http", "$log", function($http, $log) {

  // Getting the customers from database
  this.getCustomers = function() {
    return $http.get('/api/customers')
  }
  // Submiting the new customer via post
  this.addCustomer = function(customer) {
    return $http.post('/api/customers', customer)
  }
  // Getting the info of customer - Loans
  this.getCustomer = function(customer_id) {
    return $http.get('/api/customers/' + customer_id)
  }
  this.getCustomerLoans = function(customer_id) {
    return $http.get('/api/loans/customer/' + customer_id);
  }
  // Deleting one loan from a specific customer
  this.deleteCustomerLoan = function(loan_id) {
    return $http.delete('/api/loans/' + loan_id)
  }
  // Getting the total amount of all loans
  this.getTotalAmount = function() {
    return $http.get('/api/loans/totalamount')
  }
  // Saving new loan on database
  this.addLoan = function(loan) {
    return $http.post('/api/loans/', loan)
  }
  // Confirming payment
  this.confirmPayment = function(confirmation) {
    return $http.post('/api/loans/update/status', JSON.stringify(confirmation))
  }
  // Cancelling payment
  this.cancelPayment = function(cancellation) {
    return $http.post('/api/loans/update/status', JSON.stringify(cancellation))
  }
  // Getting all loans
  this.getLoans = function() {
    return $http.get('/api/loans/');
  }
}])