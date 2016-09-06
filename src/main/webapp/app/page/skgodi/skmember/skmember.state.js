(function () {
    'use strict';

    angular
        .module('myBlogApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('skmember', {
            parent: 'skgodi',
            url: '.skgodi/skmember',
            data: {
                authorities: [],
                pageTitle: 'KSKBLOG-main'
            },
            views: {
                'content@': {
                    templateUrl: 'app/page/skgodi/skmember/skmember.html',
                    controller: 'MainController',
                    controllerAs: 'vm'
                }
            }
        })
            .state('skmember.modal', {
                parent: 'skmember',
                url: 'skmember/modal?joNum',
                data: {
                    authorities: []
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    return $uibModal.open({
                        templateUrl: 'app/page/skgodi/skmember/skmember-dialog.html',
                        controller: 'SkmemberDialogController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg'
                    }).result.then(function () {
                        $state.go('skmember', null, {reload: true});
                    }, function () {
                        $state.go('skmember');
                    });
                }]
            })
    }
})();
