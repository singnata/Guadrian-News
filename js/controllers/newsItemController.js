(function() {
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
    };
  }
};
angular.module('myApp')
    .controller('NewsItemController', NewsItemController)
})()

