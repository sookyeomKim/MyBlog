(function () {
    'use strict';

    angular
        .module('myBlogApp')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope', 'screenSize', 'Contact'];

    function ProfileController($scope, screenSize, Contact) {
        var vm = this;

        vm.isXs = getScreenSize();
        vm.contact = {
            email: null,
            massage: null,
            id: null
        };

        function getScreenSize() {
            return screenSize.on('xs', function (match) {
                return vm.isXs = match;
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

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.$on('$destroy', function () {
            vm.isXs = null;
        });
    }
})();
