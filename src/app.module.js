import angular from 'angular';
import {newsFeedComponent} from './js/components/news-feed.component';
import {newsFeedItemComponent} from './js/components/news-feed-item.component';
import {newsPaginationComponent} from './js/components/news-pagination.component';
import {NewsDataService} from './js/services/news-data-service';
import {onEnterBlurDirective} from './js/directives/on-enter-blur-directive';
import {limitFilter} from './js/filters/limit-filter';
import './css/main.css'

angular.module('myApp', [])
	.component('newsFeed', newsFeedComponent)
	.component('newsFeedItem', newsFeedItemComponent)
	.component('newsPagination', newsPaginationComponent)
	.service('newsDataService', NewsDataService)
	.directive('onEnterBlurDirective', onEnterBlurDirective)
	.filter('limitFilter', limitFilter);

