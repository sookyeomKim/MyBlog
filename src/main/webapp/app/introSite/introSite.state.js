/**
 * Created by user on 2016-08-22.
 */
(function () {
    'use strict';

    angular
        .module('myBlogApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('introSite', {
            parent: 'app',
            url: '/introSite',
            data: {
                authorities: [],
                pageTitle: 'KSKBLOG-introSite'
            },
            views: {
                'content@': {
                    templateUrl: 'app/introSite/introSite.html'
                }
            }
        })
    }
})();
