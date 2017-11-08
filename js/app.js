class NewsDataService {
  constructor($http) {
    this.$http = $http;
    this.apiKey = '7b1d6125-4065-4550-ba22-0547ec51c825'
  }
  loadNewsItems(page) {
    return this.$http.get('http://content.guardianapis.com/search', {
        params: {
          'order-by': 'newest',
          'page': page,
          'page-size': 10,
          'api-key': this.apiKey
        }
      }).then(function(response) {
        return {
          newsItems: response.data.response.results,
          pages: response.data.response.pages
        };
      })
  }
  loadNewsItemSummary(id) {
    return this.$http.get('http://content.guardianapis.com/search', {
      params: {
        'ids': id,
        'show-blocks': 'body',
        'api-key': this.apiKey
        }
      }).then(function(response) {
        return {
          newsItemSummary: response.data.response.results[0].blocks.body[0].bodyTextSummary
        };
      })
  }
}

class NewsItemController {
  constructor(NewsDataService) {
    this.NewsDataService = NewsDataService;
    this.isLoading = true;
    this.show = false;
  }
  loadNewsItemSummary(id) {
    this.show = !this.show;
    if (this.isLoading) {
      this.NewsDataService.loadNewsItemSummary(id)
      .then((response) => this.newsItemSummary = response.newsItemSummary)
      .finally(() => this.isLoading = false) 
    }
    
  }
}

class NewsFeedController {
  constructor(NewsDataService) {
  this.NewsDataService = NewsDataService;
  this.currentPage = 1;
  this.errorMessage = false;
  }
  loadNewsItems() {
    this.NewsDataService.loadNewsItems(this.currentPage)
     .then((response) => {this.newsItems = response.newsItems, this.pages = response.pages}, 
      (() => this.errorMessage = "Sorry, we couldn't find news for you. Please try again later")); 
  }
  changePage(newPage) {
    this.currentPage = newPage;
    this.loadNewsItems();   
  }
  nextPage() {
    this.changePage(this.currentPage + 1);
  }
  previousPage() {
    this.changePage(this.currentPage - 1);
  }
}

class NewsSummaryLimit {
  constructor($filter) {
    this.$filter = $filter;
  }
  filterMe() {
    return function($filter, newsSummary, limit) {
    if (!newsSummary) return;
    if (newsSummary.length < limit) {
      return newsSummary;
    }
    return $filter('limitTo')(newsSummary, limit) + '...';
    }
    
  }

}

angular.module('myApp', []).filter('newsSummaryLimit', ['$filter', function($filter) {
   return function(newsSummary, limit) {
    if (!newsSummary) return;
      if (newsSummary.length < limit) {
          return newsSummary;
      }
      return $filter('limitTo')(newsSummary, limit) + '...';
   };
}]);

angular.module('myApp', [])
    .service('NewsDataService', NewsDataService)
    .controller('NewsFeedController', NewsFeedController)
    .controller('NewsItemController', NewsItemController)
    .filter('NewsSummaryLimit', NewsSummaryLimit);

/* app.filter('newsSummaryLimit', ['$filter', function($filter) {
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
});*/
