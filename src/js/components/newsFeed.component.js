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
const newsFeedComponent = {
  template: `
    <div ng-if="$ctrl.errorMessage">{{$ctrl.errorMessage}}</div>
      <div ng-hide="$ctrl.errorMessage">
        <h1>The Guardian News</h1>
        <button ng-click="$ctrl.loadNewsItems()">Refresh</button>
        <div class="list">
          <news-feed-item 
            item="item" 
            ng-repeat="item in $ctrl.newsItems">
          </news-feed-item>
        </div>  
        <news-pagination 
          current-page="$ctrl.currentPage" 
          pages="$ctrl.pages" 
          on-change="$ctrl.changePage(newPage)">
          </news-pagination>
      </div>
    </div>
  `,
  bindings: {},    
  controller: NewsFeedController,
};
export default newsFeedComponent;