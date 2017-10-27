var app = angular.module('myApp', []);


app.service('newsDataService', function($http) {
    this.loadNewsItems = function(page) {
      return $http.get('http://content.guardianapis.com/search', {
        params: {
          'order-by': 'newest',
          'show-blocks': 'body',
          'page': page,
          'page-size': 10,
          'api-key': '7b1d6125-4065-4550-ba22-0547ec51c825'
        }
      }).then(function(response) {
        return {
          newsItems: response.data.response.results,
          pages: response.data.response.pages
        };
      })
    }
});

app.controller('newsFeedController', function($scope, newsDataService) {
  $scope.currentPage = 1;

  $scope.loadNewsItems = function() {
    newsDataService.loadNewsItems($scope.currentPage).then(function(response) {
      $scope.newsItems = response.newsItems;
      $scope.pages = response.pages;
    }, function() {
      $scope.errorMessage = "Sorry, we couldn't find news for you. Please try again later";
    });
  };

  $scope.loadNewsItems();

  $scope.nextPage = function() {
    $scope.currentPage++;
    $scope.changePage($scope.currentPage);
  };

  $scope.previousPage = function() {
    if ($scope.currentPage > 1) {
      $scope.changePage($scope.currentPage - 1);
    }
  };


  $scope.changePage = function(newPage) {
    $scope.currentPage = newPage;
    $scope.loadNewsItems();   
    }
});


app.controller('accordionController', function($scope) {
  $scope.hide = true;
});

