var app = angular.module('myApp', []);


app.service('newsDataService', function($http) {

    this.loadNewsItems = function(page) {
      return $http.get('http://content.guardianapis.com/search', {
        params: {
          'order-by': 'newest',
          'page': page,
          'page-size': 10,
          'api-key': '7b1d6125-4065-4550-ba22-0547ec51c825'
        }
      }).then(function(response) {
        return {
          newsItems: response.data.response.results,
          pages: response.data.response.pages,
          newsItemId: response.data.response.results.id
        };
      })
    }

    this.loadNewsItemSummary = function(id) {
      return $http.get('http://content.guardianapis.com/search', {
        params: {
          'ids': id,
          'show-blocks': 'body',
          'api-key': '7b1d6125-4065-4550-ba22-0547ec51c825'
        }
      }).then(function(response) {
        return {
          newsItemSummary: response.data.response.results[0].blocks.body[0].bodyTextSummary
        };
      })
    }
});


app.controller('newsItemController', function($scope, newsDataService) {

  $scope.loadNewsItemSummary = function(id) {newsDataService.loadNewsItemSummary(id).then(function(response) {
    $scope.newsItemSummary = response.newsItemSummary;
    })
  };

  $scope.show = false;

  $scope.showNewsTextSummary = function(id) {
    if (!$scope.show) {
      $scope.loadNewsItemSummary(id);
      $scope.show = true;
    } else {
      $scope.show = false ;
    }
  };

  /*$scope.loadNewsItemSummary = function(id) {newsDataService.loadNewsInfo(id).then(function(response) {
    $scope.newsItemSummary = response.newsItemSummary;
    }).then(function() {
      $scope.show = !$scope.show;
    })
  };*/

});

app.controller('newsFeedController', function($scope, newsDataService) {
  $scope.currentPage = 1;

  $scope.loadNewsItems = function() {
    newsDataService.loadNewsItems($scope.currentPage).then(function(response) {
      $scope.newsItems = response.newsItems;
      $scope.pages = response.pages
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

 app.filter('newsSummaryLimit', ['$filter', function($filter) {
   return function(newsSummary, limit) {
    if (!newsSummary) return;
      if (newsSummary.length < limit) {
          return newsSummary;
      }
      return $filter('limitTo')(newsSummary, limit) + '...';
   };
}]);
