(function() {
    'use strict';

    angular
        .module('myBlogApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$state', 'Auth', 'Principal', 'ENV', 'LoginService'];

    function NavbarController ($state, Auth, Principal, ENV, LoginService) {
        var vm = this;

        vm.isNavbarCollapsed = true;
        vm.isAuthenticated = Principal.isAuthenticated;
        vm.login = login;
        vm.logout = logout;
        vm.toggleNavbar = toggleNavbar;
        vm.collapseNavbar = collapseNavbar;
        vm.$state = $state;

        $.material.init();

        function login () {
            collapseNavbar();
            LoginService.open();
        }

        function logout () {
            collapseNavbar();
            Auth.logout();
            $state.go('home');
        }

        function toggleNavbar () {
            vm.isNavbarCollapsed = !vm.isNavbarCollapsed;
        }

        function collapseNavbar () {
            vm.isNavbarCollapsed = true;
        }
    }
})();
