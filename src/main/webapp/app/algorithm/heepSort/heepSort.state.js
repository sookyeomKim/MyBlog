/**
 * Created by ksk on 2016-05-16.
 */

(function (window, angular) {
    "use strict";
    angular
        .module('myBlogApp')
        .config(bubbleSortConfig);

    bubbleSortConfig.inject = ['$stateProvider'];

    function bubbleSortConfig($stateProvider) {
        return $stateProvider.state('heepSort', {
            url: '/heepSort',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/algorithm/heepSort/heepSort.html',
                    controller: 'HeepSortController',
                    controllerAs: 'vm'
                }
            },
            parent: 'algorithm'
        })
    }
})(window, window.angular);
