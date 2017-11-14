class NewsFeedItemDirective {
  constructor() {
    this.restrict = 'EA';
    this.template = `
    <div>it's my not working directive</div>
    <div>{{$ctrl.webUrl}}</div>
    `;
    this.controller = NewsItemController;
    this.controllerAs = '$ctrl';
    this.bindToController = true;
  }
  createNewsFeedItemDirectie() {
    return () => {
      this.restrict,
      this.template,
      this.controller,
      this.controllerAs,
      this.bindToController
    }
  }

}
angular.module('myApp')
    .directive('newsFeedItem', NewsFeedItemDirective)
