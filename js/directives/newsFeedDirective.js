(function(){
  function newsFeedDirective() {
  return {
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
    scope: {},    
    restrict: 'E',
    controller: 'NewsFeedController',
    controllerAs: '$ctrl',
    bindToController: true
  }
};

angular.module('myApp')
    .directive('newsFeed', newsFeedDirective);
})()

















    