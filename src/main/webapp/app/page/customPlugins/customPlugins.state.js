/**
 * Created by ksk on 2016-05-04.
 */

(function (window, angular) {
    "use strict";

    angular
        .module('myBlogApp')
        .config(customPluginsConfig);

    customPluginsConfig.$inject = ['$stateProvider'];

    function customPluginsConfig($stateProvider) {
        $stateProvider.state('customPlugins', {
            url: '/customPlugins',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/page/customPlugins/customPlugins.html'
                }
            },
            parent: 'app'
        })
    }
})(window, window.angular);
