(function () {
    'use strict';

    angular
        .module('myBlogApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('main', {
            parent: 'app',
            url: '/',
            data: {
                authorities: [],
                pageTitle: 'KSKBLOG-main'
            },
            views: {
                'content@': {
                    templateUrl: 'app/main/main.html',
                    controller: 'MainController',
                    controllerAs: 'vm'
                }
            }
        })
            .state('main.modal', {
                parent: 'main',
                url: 'main/modal?joNum',
                data: {
                    authorities: []
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    return $uibModal.open({
                        templateUrl: 'app/main/main-dialog.html',
                        controller: 'MainDialogController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg'
                    }).result.then(function () {
                        $state.go('main', null, {reload: true});
                    }, function () {
                        $state.go('main');
                    });
                }]
            })
    }
})();
