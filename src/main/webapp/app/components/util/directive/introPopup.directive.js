/**
 * Created by user on 2016-08-22.
 */
(function (window, angular) {
    "use strict";

    angular
        .module('myBlogApp').directive('introPopup', introPopup);

    introPopup.$inject = ['$document', '$window'];

    function introPopup($document, $window) {
        var directive = {
            rstrict: 'A',
            scope: {},
            compile: compile
        };
        return directive;

        function compile() {
            return {
                pre: function (sco, el) {
                    if ($window.sessionStorage.getItem('intro-popup') === 'on') {
                        angular.element(this).remove();
                    } else {
                        var moveButton = '<a href="/" id="go-button">Our\'s story &gt;</a>';
                        $window.sessionStorage.setItem('intro-popup', 'on');
                        angular.element($document).find('body').css({'overflow': 'hidden'});
                        angular.element(el).css({
                            'background': 'url("content/images/first-view-img.jpg") no-repeat center center fixed',
                            'position': 'fixed',
                            'top': '0',
                            'right': '0',
                            'bottom': '0',
                            'left': '0',
                            'z-index': '10',
                            '-webkit-background-size': 'cover',
                            '-moz-background-size': 'cover',
                            '-o-background-size': 'cover',
                            'background-size': 'cover'
                        }).addClass('first-view-wrap').find('.overlay').append(moveButton);
                        angular.element(el).find('#go-button').on('click', function () {
                            angular.element($document).find('body').removeAttr('style');
                            angular.element(el).fadeOut(function () {
                                angular.element(this).remove();
                            });
                        })
                    }
                },
                post: function () {

                }
            }
        }
    }
})(window, window.angular);
