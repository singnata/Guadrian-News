(function() {
  function newsFeedItemDirective() {
  return {
    template: `
      <div class="item">
        <div>
          {{$ctrl.item.webTitle}}
          <span ng-click="$ctrl.loadNewsItemSummary($ctrl.item.id)" class="glyphicon show-content" ng-class="{'glyphicon-menu-right': !$ctrl.show, 'glyphicon-menu-down': $ctrl.show}"></span>
        </div>
        <div ng-if="$ctrl.show" class="content">
          <div class="loader" ng-if="$ctrl.isLoading"></div>
          {{$ctrl.newsItemSummary | limitFilter : 300}}
          <a ng-href="{{$ctrl.item.webUrl}}" target="new">Read full news</a>
        </div>
      </div>        
    `,
    restrict: 'E',
    scope: {
      item: '<'
    },
    controller: 'NewsItemController',
    controllerAs: '$ctrl',
    bindToController: true
  }
};  

angular.module('myApp')
  .directive('newsFeedItem', newsFeedItemDirective);
})()




