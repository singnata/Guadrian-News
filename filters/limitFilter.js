angular.module('myApp').filter('limitFilter', function($filter) {
 	return function(newsSummary, limit) {		    
  if (!newsSummary) return;		   
    if (newsSummary.length < limit) {		      
      return newsSummary;		          
    }		       
    return $filter('limitTo')(newsSummary, limit) + '...';		      
  };		   
});	