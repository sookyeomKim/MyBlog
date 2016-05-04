/**
 * Created by ksk on 2016-05-03.
 */

(function (window, angular) {
    "use strict";

    angular
        .module('myBlogApp')
        .controller('OwlCaroulselController', OwlCaroulselController);

    OwlCaroulselController.$inject = [];

    function OwlCaroulselController() {
        var vm = this;

        vm.editorOptions = {
            mode: {name: "htmlmixed"},
            lineWrapping: true,
            lineNumbers: true,
            readOnly: 'nocursor',
            theme: 'dracula',
            value: '<owl-carousel items="12" \t<!-- 보여지는 아이템 총 개수 -->\n' +
            '\t\t\titems-desktop="[1199, 9]" \t<!-- lg에서 보여지는 아이템 총 개수 -->\n' +
            '\t\t\titems-desktop-small="[979, 7]" \t<!-- md에서 보여지는 아이템 총 개수 -->\n' +
            '\t\t\titems-tablet="[768, 5]" \t<!-- sm에서 보여지는 아이템 총 개수 -->\n' +
            '\t\t\titems-mobile="[479, 3]"> \t<!-- xs에서 보여지는 아이템 총 개수 -->\n' +
            '\t<owl-carousel-item>\n' +
            '\t\t<button class="btn btn-warning btn-raised" ui-sref="customPlugins">1</button>\n' +
            '\t</owl-carousel-item>\n' +
            '\t<owl-carousel-item>\n' +
            '\t\t<button class="btn btn-warning btn-raised" ui-sref="customPlugins">2</button>\n' +
            '\t</owl-carousel-item>\n' +
            '\t<owl-carousel-item>\n' +
            '\t\t<button class="btn btn-warning btn-raised" ui-sref="customPlugins">3</button>\n' +
            '\t</owl-carousel-item>\n' +
            '\t<owl-carousel-item>\n' +
            '\t\t<button class="btn btn-warning btn-raised" ui-sref="customPlugins">4</button>\n' +
            '\t</owl-carousel-item>\n' +
            '\t<owl-carousel-item>\n' +
            '\t\t<button class="btn btn-warning btn-raised" ui-sref="customPlugins">5</button>\n' +
            '\t</owl-carousel-item>\n' +
            '\t<owl-carousel-item>\n' +
            '\t\t<button class="btn btn-warning btn-raised" ui-sref="customPlugins">6</button>\n' +
            '\t</owl-carousel-item>\n' +
            '\t<owl-carousel-item>\n' +
            '\t\t<button class="btn btn-warning btn-raised" ui-sref="customPlugins">7</button>\n' +
            '\t</owl-carousel-item>\n' +
            '\t<owl-carousel-item>\n' +
            '\t\t<button class="btn btn-warning btn-raised" ui-sref="customPlugins">8</button>\n' +
            '\t</owl-carousel-item>\n' +
            '\t<owl-carousel-item>\n' +
            '\t\t<button class="btn btn-warning btn-raised" ui-sref="customPlugins">9</button>\n' +
            '\t</owl-carousel-item>\n' +
            '\t<owl-carousel-item>\n' +
            '\t\t<button class="btn btn-warning btn-raised" ui-sref="customPlugins">10</button>\n' +
            '\t</owl-carousel-item>\n' +
            '\t<owl-carousel-item>\n' +
            '\t\t<button class="btn btn-warning btn-raised" ui-sref="customPlugins">11</button>\n' +
            '\t</owl-carousel-item>\n' +
            '\t<owl-carousel-item>\n' +
            '\t\t<button class="btn btn-warning btn-raised" ui-sref="customPlugins">12</button>\n' +
            '\t</owl-carousel-item>\n' +
            '\t<owl-carousel-item>\n' +
            '\t\t<button class="btn btn-warning btn-raised" ui-sref="customPlugins">13</button>\n' +
            '\t</owl-carousel-item>\n' +
            '\t<owl-carousel-item>\n' +
            '\t\t<button class="btn btn-warning btn-raised" ui-sref="customPlugins">14</button>\n' +
            '\t</owl-carousel-item>\n' +
            '</owl-carousel>'
        };
    }

})(window, window.angular);
