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
        return $stateProvider.state('selectionSort', {
            url: '/selectionSort',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/algorithm/selectionSort/selectionSort.html',
                    controller: 'SelectionSortController',
                    controllerAs: 'vm'
                }
            },
            parent: 'algorithm'
        })
    }
})(window, window.angular);
