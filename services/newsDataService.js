(function() {
  class NewsDataService {
    constructor($http) {
      this.$http = $http;
      this.apiKey = 'c589790a-23e4-4052-85be-28e4a1e5bd95'
    }
    loadNewsItems(page) {
      return this.$http.get('http://content.guardianapis.com/search', {
          params: {
            'order-by': 'newest',
            'page': page,
            'page-size': 10,
            'api-key': this.apiKey
          }
        }).then((response) => {
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
        }).then((response) => {
          return {
            newsItemSummary: response.data.response.results[0].blocks.body[0].bodyTextSummary
          };
        })
    }
  };
angular.module('myApp')
    .service('NewsDataService', NewsDataService)
})()
