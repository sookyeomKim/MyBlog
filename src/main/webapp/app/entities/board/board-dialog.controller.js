(function() {
    'use strict';

    angular
        .module('myBlogApp')
        .controller('BoardDialogController', BoardDialogController);

    BoardDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Board'];

    function BoardDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Board) {
        var vm = this;
        vm.board = entity;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('myBlogApp:boardUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.board.id !== null) {
                Board.update(vm.board, onSaveSuccess, onSaveError);
            } else {
                Board.save(vm.board, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.todaydate = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
