import angular from 'angular';
import {newsFeedComponent} from './js/components/news-feed.component';
import {newsFeedItemComponent} from './js/components/news-feed-item.component';
import {newsPaginationComponent} from './js/components/news-pagination.component';
import {NewsDataService} from './js/services/newsDataService';
import {onEnterBlurDirective} from './js/directives/onEnterBlurDirective';
import {limitFilter} from './js/filters/limitFilter';
import './css/main.css'

angular.module('myApp', [])
	.component('newsFeed', newsFeedComponent)
	.component('newsFeedItem', newsFeedItemComponent)
	.component('newsPagination', newsPaginationComponent)
	.service('newsDataService', NewsDataService)
	.directive('onEnterBlur', onEnterBlurDirective)
	.filter('limitFilter', limitFilter);

