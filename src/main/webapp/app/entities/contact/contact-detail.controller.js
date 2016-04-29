(function() {
    'use strict';

    angular
        .module('myBlogApp')
        .controller('ContactDetailController', ContactDetailController);

    ContactDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Contact'];

    function ContactDetailController($scope, $rootScope, $stateParams, entity, Contact) {
        var vm = this;
        vm.contact = entity;
        
        var unsubscribe = $rootScope.$on('myBlogApp:contactUpdate', function(event, result) {
            vm.contact = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
