app.controller('MainCtrl', ['$scope', function ($scope) {
	
	$scope.selected = 0;
	$scope.tabs = [
		{
			name: 'Schedule',
			hidden: false,
			value: 0
			
		},
		{
			name: 'Courses',
			hidden: false,
			value: 1
			
		},
		{
			name: 'Assignments',
			hidden: false,
			value: 2
			
		},
		{
			name: 'Tests',
			hidden: false,
			value: 3
			
		},
		{
			name: 'GPA',
			hidden: false,
			value: 4
			
		}
	]; 
	
	$scope.setsel= function(val){
		$scope.selected = val;
	};
	
}]);