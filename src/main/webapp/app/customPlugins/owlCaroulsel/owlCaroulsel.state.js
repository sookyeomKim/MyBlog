/**
 * Created by ksk on 2016-05-03.
 */

(function (window, angular) {
    "use strict";

    angular
        .module('myBlogApp')
        .config(owlCarouselConfig);

    owlCarouselConfig.$inject = ['$stateProvider'];

    function owlCarouselConfig($stateProvider) {
        $stateProvider
            .state('owlCaroulsel', {
                url: '/owlCaroulsel',
                data: {
                    authorities: []
                },
                views: {
                    'content@': {
                        templateUrl: 'app/customPlugins/owlCaroulsel/owlCaroulsel.html',
                        controller: 'OwlCaroulselController',
                        controllerAs: 'vm'
                    }
                },
                parent: 'customPlugins'
            });
    }
})(window, window.angular);

