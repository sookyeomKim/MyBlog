(function () {
    'use strict';

    angular
        .module('myBlogApp')
        .controller('BoardController', BoardController);

    BoardController.$inject = ['$scope', '$filter', 'Board', 'ParseLinks', 'AlertService', '$timeout', 'Principal'];

    function BoardController($scope, $filter, Board, ParseLinks, AlertService, $timeout, Principal) {
        var vm = this;
        vm.boards = [];
        vm.predicate = 'id';
        vm.reverse = false;
        vm.page = 0;
        vm.loadAll = function () {
            Board.query({
                page: vm.page,
                size: 20,
                sort: sort()
            }, onSuccess, onError);
            function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }

            function onSuccess(data, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                for (var i = 0; i < data.length; i++) {
                    vm.boards.push(data[i]);
                }
            }

            function onError(error) {
                AlertService.error(error.data.message);
            }
        };
        vm.reset = function () {
            vm.page = 0;
            vm.boards = [];
            vm.loadAll();
        };
        vm.loadPage = function (page) {
            vm.page = page;
            vm.loadAll();
        };

        vm.loadAll();


        /*************************/

        init();
        function init() {
            vm.board = {
                'content': null,
                'id': null,
                'name': null,
                'todaydate': $filter('date')(new Date(), "yyyy-MM-dd"),
                'todaytime': $filter('date')(new Date(), "shortTime")
            };
            Principal.identity().then(function (account) {
                vm.board.name = account.login;
            })
        }

        $timeout(function () {
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            vm.boards.unshift({
                'content': vm.board.content,
                'id': null,
                'name': vm.board.name,
                'todaydate': $filter('date')(new Date(), "yyyy-MM-dd"),
                'todaytime': $filter('date')(new Date(), "shortTime")
            });
            init();
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.board.id !== null) {
                Board.update(vm.board, onSaveSuccess, onSaveError);
            } else {
                Board.save(vm.board, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function () {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.todaydate = false;

        vm.openCalendar = function (date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
