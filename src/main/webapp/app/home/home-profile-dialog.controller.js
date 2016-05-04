/**
 * Created by ksk on 2016-05-03.
 */

(function (window, angular) {
    "use strict";
    
    angular
        .module('myBlogApp')
        .controller('HomeProfileDialogController', HomeProfileDialogController);

    HomeProfileDialogController.$inject = ['$uibModalInstance'];

    function HomeProfileDialogController($uibModalInstance) {
        var vm = this;

        vm.clear = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
})(window, window.angular);
