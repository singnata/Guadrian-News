export function limitFilter($filter) {
 	return function(newsSummary, limit) {		    
  if (!newsSummary) return;		   
    if (newsSummary.length < limit) {		      
      return newsSummary;		          
    }		       
    return $filter('limitTo')(newsSummary, limit) + '...';		      
  };		   
};	
