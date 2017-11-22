export class NewsPaginationController {
	goToNextPage() {
		this.onChange({newPage : this.currentPage + 1})
	}
	goToPrevPage() {
		this.onChange({newPage : this.currentPage - 1})			
	}
	shouldDisabledButtonOnPage() {
		return (this.currentPage == 1) 
	}
};
export const newsPaginationComponent = {
	template: `
      <div class="page">
        <button ng-click="$ctrl.goToPrevPage()" ng-disabled="$ctrl.shouldDisabledButtonOnPage()">Previous Page <span class="glyphicon glyphicon-menu-left"></span></button>
        <form name="pageForm">
          <input type="number" name="pageInput" placeholder="change page" on-enter-blur="$ctrl.onChange({newPage : pageInputValue})" ng-pattern="/^[1-9][0-9]*$/" ng-model="pageInputValue" required>
          {{$ctrl.currentPage}} of the {{$ctrl.pages}}
          <span ng-if="pageForm.pageInput.$error.pattern">Please enter a number</span>  
        </form>
        <button ng-click="$ctrl.goToNextPage()">Next Page <span class="glyphicon glyphicon-menu-right"></span></button>
      </div>        
    `,
  bindings: {
    currentPage: '<',
    pages: '<',
    onChange: '&'
  },
  controller: NewsPaginationController
};
