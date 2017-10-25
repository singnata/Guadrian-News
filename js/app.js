var app = angular.module('myApp', []);


app.service('newsDataService', function($http) {
    this.apiData = function(number) {
        return $http.get('http://content.guardianapis.com/search?order-by=newest&show-blocks=body&page=' + number + '&page-size=10&api-key=7b1d6125-4065-4550-ba22-0547ec51c825')
    }
});

app.controller('newsFeedController', function($scope, newsDataService) {

  var numberPage = 1;

  $scope.loadData = function() {
    newsDataService.apiData(numberPage).then(function(response) {
      $scope.data = response.data.response;
      $scope.currentPage = response.data.response.currentPage;
      $scope.pages = response.data.response.pages;
    }, function() {
        $scope.errorMessage = "Sorry, we couldn't find news for you. Please try again later";
       });
  };

  $scope.loadData();

  $scope.nextPage = function() {
    numberPage === $scope.currentPage;
    numberPage++;
    $scope.loadData();
  };

  $scope.previousPage = function() {
    numberPage === $scope.currentPage;
    if(numberPage > 1) {
      numberPage--;
      $scope.loadData();
    }
  };

  $scope.changePage = function(userValue) {
    numberPage = userValue;
    $scope.loadData();
  };
});


app.controller('accordionController', function($scope) {
  $scope.hide = true;
});
