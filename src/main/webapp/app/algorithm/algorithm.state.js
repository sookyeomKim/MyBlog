/**
 * Created by ksk on 2016-05-16.
 */

(function (window, angular) {
    "use strict";

    angular
        .module('myBlogApp')
        .config(algorithmConfig);

    algorithmConfig.inject = ['$stateProvider'];

    function algorithmConfig($stateProvider) {
        return $stateProvider.state('algorithm', {
            url: '/algorithm',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/algorithm/algorithm.html'
                }
            },
            parent: 'app'
        })
    }
})(window, window.angular);
