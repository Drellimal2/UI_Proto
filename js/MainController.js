app.controller('MainCtrl', ['$scope', function ($scope) {
	
	
	$scope.tabs = [
		{
			name: 'Schedule',
			hidden: false
			
		},
		{
			name: 'Courses',
			hidden: false
			
		},
		{
			name: 'Assignments',
			hidden: false
			
		},
		{
			name: 'Tests',
			hidden: false
			
		},
		{
			name: 'GPA',
			hidden: false
			
		}
	]; 
	
}]);