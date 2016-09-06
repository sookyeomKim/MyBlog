/**
 * Created by ksk on 2015-12-03.
 */
'use strict';

angular.module('myBlogApp').directive('whResize', whResize);

whResize.$inject = ['$window'];

function whResize($window) {
    var directive = {
        rstrict: 'A',
        scope: {
            propName: '@',
            ratio: '@',
            maxWidth: '@',
            margin: '@'
        },
        link: link
    };
    return directive;

    function link(sco, el) {
        if (!angular.isString(sco.propName) || !sco.propName) {
            return false
        }
        var wh;
        var domWidth = $window.document.documentElement.clientWidth;
        var domHeight = $window.document.documentElement.clientHeight;
        var watchCleanUp;

        startRepositioningOnResize();

        watchCleanUp = sco.$watchCollection(function getValue() {
            return ([domWidth, domHeight])
        }, function (newVal) {
            resizeWithHeightOffset(newVal);
        });

        function resizeWithHeightOffset(whObj) {
            if (sco.maxWidth) {
                sco.maxWidth = Number(sco.maxWidth);
                whObj[0] = (sco.maxWidth <= whObj[0]) ? sco.maxWidth : whObj[0]
            }
            wh = sco.propName.match('width') ? whObj[0] : whObj[1];
            wh = wh * (Number(sco.ratio) / 100);
            if (sco.margin) {
                wh = wh - (wh * (Number(sco.margin) / 100));
            }
            el.css(sco.propName, wh + "px")
        }

        function startRepositioningOnResize() {
            function refreshWidthNheight() {
                domWidth = $window.document.documentElement.clientWidth;
                domHeight = $window.document.documentElement.clientHeight;
                sco.$apply()
            }

            $window.addEventListener('resize', refreshWidthNheight);

            sco.$on('$destroy', function () {
                watchCleanUp();
                $window.removeEventListener('resize', refreshWidthNheight);
            });
        }
    }
}
