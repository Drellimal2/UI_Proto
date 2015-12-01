var app = angular.module("app",['ui.bootstrap','ui.calendar','minicolors']);

app.controller('Ctrl',function($scope,$modal){
    var courselist = [];
    var events = [];
    $scope.assignmentcount = 0;
    $scope.testcount = 0;
    $scope.username;
    $scope.email;
    $scope.password;
    $scope.confirmpassword;
    $scope.fullname;
    $scope.users=[];
    $scope.courses=[];
    $scope.assignments=[];
    $scope.tests=[];
    $scope.grades=[];
    var gradescheme=[{
        letter:"A+",
        grade:4.3
    },{
        letter:"A",
        grade:4.0
    },{
        letter:"A-",
        grade:3.7
    },{
        letter:"B+",
        grade:3.3
    },{
        letter:"B",
        grade:3.0
    },{
        letter:"B-",
        grade:2.7
    },{
        letter:"C+",
        grade:2.3
    },{
        letter:"C",
        grade:2.0
    },{
        letter:"C-",
        grade:1.7
    },{
        letter:"D+",
        grade:1.3
    },{
        letter:"D",
        grade:1.0
    },{
        letter:"D-",
        grade:0.7
    },{
        letter:"F+",
        grade:0.3
    },{
        letter:"F",
        grade:0.0
    }];
    $scope.GPA;
    // $scope.editcourse = function(course){
    //     $scope.courseopen();
    // };
    // $scope.deletecourse = function(courses,course){
    //     $scope.courses.splice(courses[indexOf(course)],1);
    // }
    $scope.courseopen = function(){
        $scope.customSettings = {
          control: 'brightness',
          theme: 'bootstrap',
          position: 'top left'
        };
        $modal.open({
            templateUrl: 'coursemodal.html',
            animation:true,
            windowClass: 'modal',
            size: 'lg',
            controller: function($scope, $modalInstance, courses){

                    $scope.starttoday = function() {
                        $scope.coursestart = new Date();
                    };

                    $scope.startclear = function() {
                        $scope.coursestart = null;
                    };

                    $scope.startopencal = function($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        $scope.startopened = true;
                    };

                    $scope.dateOptions = {
                        formatYear: 'yy',
                        startingDay: 1
                    };

                    $scope.format = 'MMMM d, yyyy';

                    $scope.endtoday = function() {
                        $scope.courseend = new Date();
                    };

                    $scope.endclear = function() {
                        $scope.courseend = null;
                    };

                    $scope.endopencal = function($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        $scope.endopened = true;
                    };

                    //Compare dates for start date and end date so that start date is less than end date
                    $scope.compareDates = function() {
                        $scope.dateAlert = {
                            hidden:false,
                            type: "danger",
                            msg: "Start date cannot be greater than end date."
                        };
                        if ($scope.coursestart > $scope.courseend) {
                            $scope.courseend = '';
                            $scope.dateAlert.hidden = false;
                        } else {
                          $scope.dateAlert.hidden = true;
                        }
                    };
                    $scope.addCourse = function(){
                        courses.push({
                            coursename: $scope.coursename,
                            coursecode: $scope.coursecode,
                            description: $scope.coursedescription,
                            start: $scope.coursestart.toDateString(),
                            end: $scope.courseend.toDateString(),
                            coursecolour: $scope.coursecolour
                        });
                        courselist.push({
                            coursecode:$scope.coursecode,
                            coursecolour:$scope.coursecolour,
                            coursename:$scope.coursename
                        });
                    $modalInstance.dismiss('cancel');
                    };
            },
            resolve: {
                courses: function(){
                    return $scope.courses;
                }
            }
        });
    };

    $scope.assignmentopen = function(){
        $modal.open({
            templateUrl: 'assignmentmodal.html',
            animation:true,
            windowClass: 'modal',
            size: 'lg',
            controller: function($scope, $modalInstance, assignments){

                    $scope.assignmentduetoday = function() {
                        $scope.assignmentdue = new Date();
                    };

                    $scope.assignmentdueclear = function() {
                        $scope.assignmentdue = null;
                    };

                    $scope.assignmentopencal = function($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        $scope.assignmentdateopened = true;
                    };

                    $scope.dateOptions = {
                        formatYear: 'yy',
                        startingDay: 1
                    };
                    $scope.courselist = courselist;

                    $scope.format = 'MMMM d, yyyy';
                    $scope.options = ["Not Submitted","Submitted"];
                    $scope.addAssignment = function(){
                        var today = new Date();
                        var due = $scope.assignmentdue;
                        var remainder = Math.ceil((due - today)/(1000*60*60*24));
                        if (remainder<0){
                            remainder = 0;
                        }
                        else{
                            $scope.assignmentcount+=1;
                        }
                        var colour;
                        var coursecolour;
                        if (remainder<0 || $scope.assignmentstate=='Not Submitted'){
                            colour = '#FF0000';
                        }
                        else if (remainder<0 || $scope.assignmentstate=='Submitted'){
                            colour= '#008000';
                        }
                        else if (remainder>0 || $scope.assignmentstate=='Not Submitted'){
                            colour = '#ffff00';
                        }
                        else if (remainder>0 || $scope.assignmentstate=='Submitted'){
                            colour = '#008000';
                        }
                        if (courselist.indexOf($scope.assignmentcourse)){
                            coursecolour = courselist.coursecolour;
                        }
                        assignments.push({
                            coursecolour : $scope.assignmentcourse.coursecolour,
                            course: $scope.assignmentcourse.coursecode,
                            remainder: remainder,
                            due: $scope.assignmentdue.toDateString(),
                            description: $scope.assignmentdescription,
                            state: $scope.assignmentstate,
                            colour: colour
                        });
                        events.push({
                           title: $scope.assignmentcourse,
                           start: $scope.assignmentdue
                        });
                    $modalInstance.dismiss('cancel');
                    };
            },
            resolve: {
                assignments: function(){
                    return $scope.assignments;
                }
            }

        });
    };
    $scope.testopen = function(){
        $modal.open({
            templateUrl: 'testmodal.html',
            animation:true,
            windowClass: 'modal',
            size: 'lg',
            controller: function($scope, $modalInstance, tests){

                    $scope.testduetoday = function() {
                        $scope.testdue = new Date();
                    };

                    $scope.testdueclear = function() {
                        $scope.testdue = null;
                    };

                    $scope.testopencal = function($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        $scope.testdateopened = true;
                    };

                    $scope.dateOptions = {
                        formatYear: 'yy',
                        startingDay: 1
                    };
                    $scope.courselist = courselist;
                    $scope.testtime = new Date();

                      $scope.hstep = 1;
                      $scope.mstep = 15;

                      $scope.options = {
                        hstep: [1, 2, 3],
                        mstep: [1, 5, 10, 15, 25, 30]
                      };

                      $scope.ismeridian = true;

                      $scope.update = function() {
                        var d = new Date();
                        d.setHours( 14 );
                        d.setMinutes( 0 );
                        $scope.testtime= d;
                      };

                      $scope.clear = function() {
                        $scope.testtime = null;
                      };

                    $scope.format = 'MMMM d, yyyy';
                    $scope.options = ["Not Done","Done"];
                    $scope.addTest = function(){
                        var today = new Date();
                        var due = $scope.testdue;
                        var remainder = Math.ceil((due - today)/(1000*60*60*24));
                        if (remainder<0){
                            remainder = 0;
                        }
                        else{
                            $scope.testcount+=1
                        }
                        var colour;
                        var coursecolour;
                        if ($scope.teststate=='Not Done'){
                            colour = '#FF0000';
                        }
                        else if ($scope.teststate=='Done'){
                            colour= '#008000';
                        }

                        if (courselist.indexOf($scope.testcourse)){
                            coursecolour = courselist.coursecolour;
                        }
                        console.log($scope.testtime);
                        tests.push({
                            coursecolour : $scope.testcourse.coursecolour,
                            course: $scope.testcourse.coursecode,
                            remainder: remainder,
                            due: $scope.testdue.toDateString(),
                            time: $scope.testtime,
                            description: $scope.testdescription,
                            state: $scope.teststate,
                            colour: colour
                        });
                        events.push({
                           title: $scope.testcourse,
                           start: $scope.testdue
                        });
                    $modalInstance.dismiss('cancel');
                    };
            },
            resolve: {
                tests: function(){
                    return $scope.tests;
                }
            }

        });
    };
    $scope.gradeopen = function(){
        $modal.open({
            templateUrl: 'gpamodal.html',
            animation:true,
            windowClass: 'modal',
            size: 'lg',
            controller: function($scope, $modalInstance, grades){

                    $scope.courselist = courselist;
                    $scope.gradescheme = gradescheme;
                    var coursecolour;
                    var coursename;
                    $scope.addGrade = function(){
                        if (courselist.indexOf($scope.gradecourse)){
                            coursecolour = courselist.coursecolour;
                            coursename = courselist.coursename;
                        }
                        grades.push({
                            coursecolour : $scope.gradecourse.coursecolour,
                            coursecode: $scope.gradecourse.coursecode,
                            coursename: $scope.gradecourse.coursename,
                            grade: $scope.grade
                        });
                    $modalInstance.dismiss('cancel');
                    };
            },
            resolve: {
                grades: function(){
                    return $scope.grades;
                }
            }
        });
    };
    for(i=0; i<$scope.grades.length;i++){
        var val = grades[i].grade + val;
    }
    $scope.GPA = val/$scope.grades.length;
    /*Calendar*/
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.events = events;

    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };

    /* Change View */
    $scope.renderCalender = function(calendar) {
      if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    };

    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'prev,next',
          center: 'title',
          right: 'month,basicWeek,basicDay'
        },
        eventRender: $scope.eventRender
      }
    };

    /* event sources array*/
    $scope.eventSources = [$scope.events];

});
