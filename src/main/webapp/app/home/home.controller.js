(function () {
    'use strict';

    angular
        .module('myBlogApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'screenSize', 'Contact'];

    function HomeController($scope, screenSize, Contact) {
        var vm = this;

        vm.isSm = getScreenSize();
        vm.contact = {
            email: null,
            massage: null,
            id: null
        };

        function getScreenSize() {
            return screenSize.on('xs', function (match) {
                return vm.isSm = match;
            }, $scope);
        }

        var onSaveSuccess = function (result) {
            vm.contact = {
                email: null,
                massage: null,
                id: null
            };
            vm.isSaving = false;
            alert("성공")
        };

        var onSaveError = function () {
            vm.isSaving = false;
            alert("실패")
        };

        vm.save = function () {
            vm.isSaving = true;
            return Contact.save(vm.contact, onSaveSuccess, onSaveError);
        };

        $scope.$on('$destroy', function () {
            vm.isSm = null;
        });
    }
})();
