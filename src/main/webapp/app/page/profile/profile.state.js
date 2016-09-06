(function () {
    'use strict';

    angular
        .module('myBlogApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('profile', {
            parent: 'app',
            url: '/',
            data: {
                authorities: [],
                pageTitle: 'KSKBLOG-profile'
            },
            views: {
                'content@': {
                    templateUrl: 'app/page/profile/profile.html',
                    controller: 'ProfileController',
                    controllerAs: 'vm'
                }
            }
        })
            .state('profile.modal', {
                parent: 'profile',
                url: '/profile',
                data: {
                    authorities: []
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    return $uibModal.open({
                        templateUrl: 'app/page/profile/profile-dialog.html',
                        controller: 'ProfileDialogController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg'
                    }).result.then(function () {
                        $state.go('profile', null, {reload: true});
                    }, function () {
                        $state.go('profile');
                    });
                }]
            })
    }
})();
