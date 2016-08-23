/**
 * Created by ksk on 2016-05-03.
 */

(function (window, angular) {
    "use strict";

    angular
        .module('myBlogApp')
        .controller('ProfileDialogController', ProfileDialogController);

    ProfileDialogController.$inject = ['$uibModalInstance'];

    function ProfileDialogController($uibModalInstance) {
        var vm = this;

        vm.clear = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})(window, window.angular);
