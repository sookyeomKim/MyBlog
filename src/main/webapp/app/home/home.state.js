(function () {
    'use strict';

    angular
        .module('myBlogApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('home', {
                parent: 'app',
                url: '/',
                data: {
                    authorities: [],
                    pageTitle:'KSKBLOG-HOME'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/home/home.html',
                        controller: 'HomeController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('home.profile', {
                parent: 'home',
                url: 'profile',
                data: {
                    authorities: []
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    return $uibModal.open({
                        templateUrl: 'app/home/home-profile-dialog.html',
                        controller: 'HomeProfileDialogController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg'
                    }).result.then(function () {
                        $state.go('home', null, {reload: true});
                    }, function () {
                        $state.go('home');
                    });
                }]
            })
    }
})();
