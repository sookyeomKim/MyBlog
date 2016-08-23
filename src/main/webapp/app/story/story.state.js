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
        $stateProvider.state('story', {
            parent: 'app',
            url: '/story',
            data: {
                authorities: [],
                pageTitle: 'KSKBLOG-story'
            },
            views: {
                'content@': {
                    templateUrl: 'app/story/story.html'
                }
            }
        })
    }
})();
