/**
 * Created by user on 2016-08-22.
 */
(function (window, angular) {
    "use strict";

    angular
        .module('myBlogApp')
        .controller('SkmemberDialogController', SkmemberDialogController);

    SkmemberDialogController.$inject = ['$uibModalInstance', 'FeMemberJson', '$stateParams'];

    function SkmemberDialogController($uibModalInstance, FeMemberJson, $stateParams) {
        var vm = this;

        vm.memberArry = FeMemberJson.getJson($stateParams.joNum - 1);

        vm.clear = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})(window, window.angular);
