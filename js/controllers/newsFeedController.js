(function() {
  class NewsFeedController {
    constructor(NewsDataService) {
      this.NewsDataService = NewsDataService;
      this.currentPage = 1;
      this.errorMessage = false;
      this.loadNewsItems(); 
    }
    loadNewsItems() {
    this.NewsDataService.loadNewsItems(this.currentPage)
     .then((response) => {this.newsItems = response.newsItems, this.pages = response.pages}, 
      (() => this.errorMessage = "Sorry, we couldn't find news for you. Please try again later")); 
    }
    changePage(newPage) {
      if(newPage) {
        this.currentPage = newPage;
        this.loadNewsItems(); 
      }
    }
  };
angular.module('myApp')
  .controller('NewsFeedController', NewsFeedController);
})()






