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
        $stateProvider.state('skstory', {
            parent: 'skgodi',
            url: '.skgodi/skstory',
            data: {
                authorities: [],
                pageTitle: 'KSKBLOG-skstory'
            },
            views: {
                'content@': {
                    templateUrl: 'app/page/skgodi/skstory/skstory.html'
                }
            }
        })
    }
})();
