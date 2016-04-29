/**
 * Created by ksk on 2015-12-01.
 */
'use strict';

angular.module('myBlogApp').directive('fixAside', fixAside);

fixAside.$inject = ['$document'];

function fixAside($document) {
    var directive = {
        restrict: 'A',
        link: link
    };
    return directive;

    function link(sco, el) {
        $document.on('scroll', function () {
            return $document.scrollTop() <= 50 ? asideRemoveClass(el) : asideAddClass(el)
        })
    }

    function asideAddClass(el) {
        el.addClass('fixed');
        angular.element(el[0].querySelector('.aside-outer-scroller')).addClass('outFixed');
        angular.element(el[0].querySelector('.aside-inner-scroller')).addClass('inFixed')
    }

    function asideRemoveClass(el) {
        el.removeClass('fixed');
        angular.element(el[0].querySelector('.aside-outer-scroller')).removeClass('outFixed');
        angular.element(el[0].querySelector('.aside-inner-scroller')).removeClass('inFixed')
    }
}
