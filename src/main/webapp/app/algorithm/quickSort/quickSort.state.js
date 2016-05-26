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
        return $stateProvider.state('quickSort', {
            url: '/quickSort',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/algorithm/quickSort/quickSort.html',
                    controller: 'QuickSortController',
                    controllerAs: 'vm'
                }
            },
            parent: 'algorithm'
        })
    }
})(window, window.angular);
