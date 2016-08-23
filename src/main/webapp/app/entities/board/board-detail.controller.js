(function() {
    'use strict';

    angular
        .module('myBlogApp')
        .controller('BoardDetailController', BoardDetailController);

    BoardDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Board'];

    function BoardDetailController($scope, $rootScope, $stateParams, entity, Board) {
        var vm = this;
        vm.board = entity;
        
        var unsubscribe = $rootScope.$on('myBlogApp:boardUpdate', function(event, result) {
            vm.board = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
