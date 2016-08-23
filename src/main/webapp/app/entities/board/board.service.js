(function() {
    'use strict';
    angular
        .module('myBlogApp')
        .factory('Board', Board);

    Board.$inject = ['$resource', 'DateUtils'];

    function Board ($resource, DateUtils) {
        var resourceUrl =  'api/boards/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.todaydate = DateUtils.convertLocalDateFromServer(data.todaydate);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.todaydate = DateUtils.convertLocalDateToServer(data.todaydate);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.todaydate = DateUtils.convertLocalDateToServer(data.todaydate);
                    return angular.toJson(data);
                }
            }
        });
    }
})();
