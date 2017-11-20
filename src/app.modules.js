import angular from 'angular';
import newsFeedComponent from './js/components/newsFeed.component';
import NewsFeedItemComponent from './js/components/newsFeedItem.component';
import NewsPaginationComponent from './js/components/newsPagination.component';
import NewsDataService from './js/services/newsDataService';
import ngEnterBlurDirective from './js/directives/ngEnterBlurDirective';
import limitFilter from './js/filters/limitFilter';
import './css/main.css'

angular.module('myApp', [])
	.component('newsFeed', newsFeedComponent)
	.component('newsFeedItem', NewsFeedItemComponent)
	.component('newsPagination', NewsPaginationComponent)
	.service('NewsDataService', NewsDataService)
	.directive('ngEnterBlur', ngEnterBlurDirective)
	.filter('limitFilter', limitFilter);

