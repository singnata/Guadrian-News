export class NewsFeedItemController {
  constructor(newsDataService) {
    'ngInject';
    this.newsDataService = newsDataService;
    this.isLoading = true;
    this.show = false;
  }
  loadNewsItemSummary(id) {
    this.show = !this.show;
    if (this.isLoading) {
      this.newsDataService.loadNewsItemSummary(id)
      .then((response) => this.newsItemSummary = response.newsItemSummary)
      .finally(() => this.isLoading = false) 
    };
  }
};
export const newsFeedItemComponent = {
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
    bindings: {
      item: '<'
    },
    controller: NewsFeedItemController
  };
