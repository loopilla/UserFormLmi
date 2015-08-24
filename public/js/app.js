(function(){
    angular.module('app', ['ngMessages', 'ngRoute', 'angucomplete-alt', 'datepicker'])
        .controller('FormController', ['$scope', '$http', function($scope, $http){
            
            $scope.master = {
                'name': '',
                'email': '',
                'occupation': '',
                'birthDate': ''
            };
            
            $scope.user = angular.copy($scope.master);
            
            $scope.getOccupationTitle = function(obj) {
                $scope.user.occupation = obj.title;
            };
            
            $scope.resetUser = function() {
                $scope.user = angular.copy($scope.master);
                $scope.userForm.$setPristine();
            };
            
            $scope.submitUser = function() {
                //Create copy of the user form data and convert birthDate to number (getTime())
                var data = angular.copy($scope.user);
                var dt = new Date($scope.user.birthDate);
                if(dt.getTime() === dt.getTime()) {
                    //valid date
                    data.birthDate = Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDay());
                }

                $http.post('/api/user', {user: data}).then(
                    function success(response){
                        //console.log(arguments);
                        alert(response.data.message);
                    },
                    function error(response){
                    }
                );
                console.log($scope);
            };
            
            $scope.reset = function() {
                $scope.user = angular.copy($scope.master);
                $scope.userForm.$setPristine();
                $scope.userForm.$setUntouched();
            };
    }]);
    angular.element(document).ready(function() {
/*        var page = document.getElementById('mainContainer');
        page.style.height = window.innerHeight + 'px';
        page.style.width = window.innerWidth + 'px';*/

        new WOW().init();
    });
})();