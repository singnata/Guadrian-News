function ngEnterBlurDirective() {
  return function (scope, element, attrs) {
    element.bind("keydown keypress blur", function (event) {
      if(event.which === 13 || event.type === "blur") {
        scope.$apply(function (){
          scope.$eval(attrs.ngEnterBlur);
        });
        event.preventDefault();
      }
    });
  };
};

angular.module('myApp')
    .directive('ngEnterBlur', ngEnterBlurDirective);
    