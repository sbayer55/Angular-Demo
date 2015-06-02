myapp.directive('comfirmationNeeded', function() {
	return {
		priority: 1, 
		terminal: true, //can stop other directives
		link: function(scope, element, attr) {
			var msg = attr.comfirmationNeeded || "Are you sure you want to delete this item?"
			var clickAction = attr.ngClick;
			element.bind('click', function() {
				if (window.confirm(msg)) {
					scope.$eval(clickAction);
				}
			});
		}
	};
});