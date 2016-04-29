(function() {
    'use strict';

    angular
        .module('myBlogApp')
        .controller('ContactDialogController', ContactDialogController);

    ContactDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Contact'];

    function ContactDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Contact) {
        var vm = this;
        vm.contact = entity;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('myBlogApp:contactUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.contact.id !== null) {
                Contact.update(vm.contact, onSaveSuccess, onSaveError);
            } else {
                Contact.save(vm.contact, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
