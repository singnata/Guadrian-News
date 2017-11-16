(function() {
  function newsPaginationDirective() {
  return {
    template: `
      <div class="page">
        <button ng-click="$ctrl.onChange({newPage : $ctrl.currentPage - 1})" ng-disabled="$ctrl.currentPage == 1">Previous Page <span class="glyphicon glyphicon-menu-left"></span></button>
        <form name="pageForm">
          <input type="number" name="pageInput" placeholder="change page" ng-enter-blur="$ctrl.onChange({newPage : pageInputValue})" ng-pattern="/^[1-9][0-9]*$/" ng-model="pageInputValue" required>
          {{$ctrl.currentPage}} of the {{$ctrl.pages}}
          <span ng-if="pageForm.pageInput.$error.pattern">Please enter a number</span>  
        </form>
        <button ng-click="$ctrl.onChange({newPage : $ctrl.currentPage + 1})">Next Page <span class="glyphicon glyphicon-menu-right"></span></button>
      </div>        
    `,
    restrict: 'E',
    scope: {
      currentPage: '<',
      pages: '<',
      onChange: '&'
    },
    controller: 'NewsFeedController',
    controllerAs: '$ctrl',
    bindToController: true
  }
};  

angular.module('myApp')
  .directive('newsPagination', newsPaginationDirective);
})()