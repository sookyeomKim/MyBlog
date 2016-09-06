(function () {
    'use strict';

    angular
        .module('myBlogApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('skgodi', {
            parent: 'app',
            url: '/skgodi',
            data: {
                authorities: [],
                pageTitle: 'KSKBLOG-skgodi'
            },
            views: {
                'content@': {
                    templateUrl: 'app/page/skgodi/skgodi.html',
                    controlser: 'SkgodiController',
                    controllerAs: 'vm'
                }
            }
        })
    }
})();
