/**
 * Created by ksk on 2016-03-31.
 */
(function (window, angular) {
    "use strict";

    angular.module('myBlogApp')
        .directive('owlCarousel', owlCarousel)
        .directive('owlCarouselItem', owlCarouselItem);

    owlCarousel.$inject = [];
    owlCarouselItem.$inject = [];
    
    function owlCarousel() {
        return {
            restrict: 'E',
            controller: 'OwlCarouselController',
            controllerAs: 'vm',
            bindToController: true,
            compile: compile,
            scope: {
                items: '=',
                itemsCustom: '=',
                itemsDesktop: '=',
                itemsDesktopSmall: '=',
                itemsTablet: '=',
                itemsTabletSmall: '=',
                itemsMobile: '=',
                singleItem: '=',
                itemsScaleUp: '=',

                slideSpeed: '=',
                paginationSpeed: '=',
                rewindSpeed: '=',

                autoPlay: '=',
                stopOnHover: '=',

                navigation: '=',
                navigationText: '=',
                rewindNav: '=',
                scrollPerPage: '=',

                pagination: '=',
                paginationNumbers: '=',

                responsive: '=',
                responsiveRefreshRate: '=',
                responsiveBaseWidth: '=',

                baseClass: '=',
                theme: '=',

                lazyLoad: '=',
                lazyFollow: '=',
                lazyEffect: '=',

                autoHeight: '=',

                jsonPath: '=',
                jsonSuccess: '=',

                dragBeforeAnimFinish: '=',
                mouseDrag: '=',
                touchDrag: '=',

                addClassActive: '=',
                transitionStyle: '=',

                beforeUpdate: '=',
                afterUpdate: '=',
                beforeInit: '=',
                afterInit: '=',
                beforeMove: '=',
                afterMove: '=',
                afterAction: '=',
                startDragging: '=',
                afterLazyLoad: '='
            },
            template: '<div class="owl-wrapper-outer"><div class="owl-wrapper" ng-transclude></div></div>',
            transclude: true
        };

        function compile(el) {
            angular.element(el).css("display", "block");
            angular.element(el).css({opacity: 0});
            angular.element(angular.element(el)[0].querySelector(".owl-wrapper")).css("display", "none");
            return {
                post: function (sco) {
                    sco.vm.init();
                }
            }
        }
    }

    function owlCarouselItem() {
        return {
            restrcit: 'E',
            template: '<div class="owl-item"><div class="item" ng-transclude></div></div>',
            transclude: true,
            replace: true
        }
    }
})(window, window.angular);
