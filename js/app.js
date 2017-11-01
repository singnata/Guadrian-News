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

app.controller('NewsItemController', function(newsDataService) {
  var vm = this;
  vm.isLoading = true;
  vm.show = false;

  vm.loadNewsItemSummary = function(id) { 
    if (vm.isLoading) {
      newsDataService.loadNewsItemSummary(id).then(function(response) {
      vm.newsItemSummary = response.newsItemSummary;
      vm.isLoading = false; 
      }) 
    };
  };

  vm.showNewsTextSummary = function(id) {
    vm.loadNewsItemSummary(id);
    vm.show = !vm.show;
    };

  });

app.controller('NewsFeedController', function(newsDataService) {
  var vm = this;
  vm.currentPage = 1;

  vm.loadNewsItems = function() {
    newsDataService.loadNewsItems(vm.currentPage).then(function(response) {
      vm.newsItems = response.newsItems;
      vm.pages = response.pages
    }, function() {
      vm.errorMessage = "Sorry, we couldn't find news for you. Please try again later";
    });
  };

  vm.loadNewsItems();

  vm.nextPage = function() {
    vm.changePage(vm.currentPage + 1);
  };

  vm.previousPage = function() {
    if (vm.currentPage > 1) {
      vm.changePage(vm.currentPage - 1);
    }
  };

  vm.changePage = function(newPage) {
    vm.currentPage = newPage;
    vm.loadNewsItems();   
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

app.directive('ngEnterBlur', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress blur", function (event) {
      if(event.which === 13 || event.type === "blur") {
        scope.$apply(function (){
          scope.$eval(attrs.ngEnterBlur);
        });
        event.preventDefault();
      }
    });
  };
});
