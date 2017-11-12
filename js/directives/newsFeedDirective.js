class NewsFeedDirective {
  constructor() {
    this.restrict = 'EA';
    this.template = `
      <div ng-if="$ctrl.errorMessage">{{$ctrl.errorMessage}}</div>
      <div ng-hide="$ctrl.errorMessage">
        <h1>The Guardian News</h1>
        <button ng-click="$ctrl.loadNewsItems()">Refresh</button>
        <div>
          <ul>
            <li ng-controller="NewsItemController as newsItemController" ng-repeat="item in $ctrl.newsItems">
              <div>
                {{item.webTitle}}
                <span ng-click="newsItemController.loadNewsItemSummary(item.id)" class="glyphicon show-content" ng-class="{'glyphicon-menu-right': !newsItemController.show, 'glyphicon-menu-down': newsItemController.show}"></span>
              </div>
              <div ng-if="newsItemController.show" class="content">
                <div class="loader" ng-if="newsItemController.isLoading"></div>
                {{newsItemController.newsItemSummary | limitFilter : 300}}
                <a ng-href="{{item.webUrl}}" target="new">Read full news</a>
              </div>
            </li>
          </ul>
          <div class="page">
          <button ng-click="$ctrl.previousPage()" ng-disabled="$ctrl.currentPage == 1">Previous Page <span class="glyphicon glyphicon-menu-left"></span></button>
          <form name="pageForm">
            <input type="number" name="pageInput" placeholder="change page" ng-enter-blur="$ctrl.changePage(pageInputValue)" ng-pattern="/^[1-9][0-9]*$/"  ng-model="pageInputValue" required>
            {{$ctrl.currentPage}} of the {{$ctrl.pages}}
            <span ng-if="pageForm.pageInput.$error.pattern">Please enter a number</span>  
          </form>
          <button ng-click="$ctrl.nextPage()">Next Page <span class="glyphicon glyphicon-menu-right"></span></button>
        </div>
      </div>
    </div>
    `;
    this.scope = {item: '='};
    this.controller = NewsFeedController;
    this.controllerAs = '$ctrl';
    this.bindToController = true;
  }
  createNewsFeedDirectie() {
    return () => {
      this.restrict,
      this.template,
      this.scope,
      this.controller,
      this.controllerAs,
      this.bindToController
    }
  }
}
angular.module('myApp')
    .directive('newsFeed', NewsFeedDirective)








    