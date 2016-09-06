(function () {
    'use strict';

    angular
        .module('myBlogApp')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', 'screenSize', 'Contact'];

    function MainController($scope, screenSize, Contact) {
        var vm = this;


    }
})();
