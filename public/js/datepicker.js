angular.module('datepicker', ['ui.bootstrap'])
    .controller('DatepickerCtrl', function ($scope) {
        $scope.datepickerOptions = {
            format: 'yyyy-mm-dd',
            language: 'en',
            startDate: "1900-10-01",
            endDate: "2012-10-31",
            autoclose: true,
            weekStart: 0
        };

        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = '';
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
            $scope.status.opened = true;
        };
/*
        $scope.clear = function($event) {
            document.userForm.birthDate.value = '';
        };
*/
        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.status = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 2);
        $scope.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        $scope.getDayClass = function(date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);

                for (var i=0;i<$scope.events.length;i++){
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        };
        return '';
    };
}).directive('under18', function(){
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl){
            ctrl.$validators.under18 = function(modelValue, viewValue) {
                var calculateAge = function(birthday) {
                    var ageDifMs = Date.now() - birthday.getTime();
                    var ageDate = new Date(ageDifMs); // miliseconds from epoch
                    return Math.abs(ageDate.getUTCFullYear() - 1970);
                };

                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty models to be valid
                    return true;
                }
                var dt = new Date(modelValue);
                
                if(dt.getTime() === dt.getTime()) {     //NaN !== NaN
                    if(calculateAge(new Date(modelValue)) < 18)
                        return false;
                }
                return true;
            };
        }
    };
});