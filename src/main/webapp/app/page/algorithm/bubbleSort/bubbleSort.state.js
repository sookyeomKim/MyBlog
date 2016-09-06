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
        return $stateProvider.state('bubbleSort', {
            url: '/bubbleSort',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/page/algorithm/bubbleSort/bubbleSort.html',
                    controller: 'BubbleSortController',
                    controllerAs: 'vm'
                }
            },
            parent: 'algorithm'
        })
    }
})(window, window.angular);
