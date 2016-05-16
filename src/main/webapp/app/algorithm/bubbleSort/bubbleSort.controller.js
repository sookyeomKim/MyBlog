/**
 * Created by ksk on 2016-05-16.
 */

(function (window, angular) {
    "use strict";

    angular
        .module('myBlogApp')
        .controller('BubbleSortController', BubbleSortController);

    BubbleSortController.$inject = ['$timeout'];

    function BubbleSortController($timeout) {
        var vm = this;
        var drawing = document.getElementById("bubble-sort-drawing");
        var context = null;
        var count = 0;
        vm.canvasConfirm = true;
        vm.valueArry = [];
        vm.sortStart = sortStart;
        vm.editorJavascriptSource = {
            mode: {name: "text/javascript"},
            lineWrapping: true,
            lineNumbers: true,
            readOnly: 'nocursor',
            theme: 'dracula',
            value: 'function bubbleSort(arry) {\n' +
            '\tvar tmp;\n' +
            '\tfor (var i = 0; i < arry.length-1; i++) {\n' +
            '\t\tfor (var j = 0; j < arry.length - 1-i; j++) {\n' +
            '\t\t\tif (arry[j] > arry[j+1]) {\n' +
            '\t\t\t\ttmp = arry[j+1];\n' +
            '\t\t\t\tarry[j+1] = arry[j];\n' +
            '\t\t\t\tarry[j] = tmp\n' +
            '\t\t\t}\n' +
            '\t\t}\n' +
            '\t}\n' +
            '}\n'
        };
        vm.editorJavaSource = {
            mode: {name: "text/x-java"},
            lineWrapping: true,
            lineNumbers: true,
            readOnly: 'nocursor',
            theme: 'dracula',
            value: 'static void bubbleSort(int[] arry) {\n' +
            '\tint temp;\n' +
            '\tfor (int i = 0; i < arry.length - 1; i++) {\n' +
            '\t\tfor (int j = 0; j < arry.length - 1 - i; j++) {\n' +
            '\t\t\tif (arry[j] > arry[j + 1]) {\n' +
            '\t\t\t\ttemp = arry[j + 1];\n' +
            '\t\t\t\tarry[j + 1] = arry[j];\n' +
            '\t\t\t\tarry[j] = temp;\n' +
            '\t\t\t}\n' +
            '\t\t}\n' +
            '\t}\n' +
            '}\n'
        };

        //캔버스지원 확인(어차피 blog자체가 ie9이상부터 호환이라 딱히 상관은 없다만...공부를 위해)
        if (drawing.getContext) {
            context = drawing.getContext("2d");

            context.strokeStyle = "#e47911";
            context.font = "blod 14px Arial";
            context.textAlign = "center";
            context.textBaseline = "middle";
            resetArry();
        } else {
            vm.canvasConfirm = false;
        }

        function resetArry() {
            vm.valueArry = [10, 8, 9, 1, 4, 3, 6, 2, 7, 5];
            context.clearRect(0, 0, vm.valueArry.length * 30, 60);
            for (var i = 0; i < vm.valueArry.length; i++) {
                context.strokeRect(i * 30, 0, 30, 30);
                context.fillText(vm.valueArry[i] + "", i * 30 + 15, 15)
            }
        }

        function sortStart() {
            var timeoutClear = null;
            var tmp = 0;
            var i = 0;
            var j = 0;

            if (count === 0) {
                resetArry();

                //for (i = 0; i < arry.length - 1; i++) { //firstLoop
                //    for (j = 0; j < arry.length - 1 - i; j++) { //secondLoop
                //        if (arry[j] > arry[j + 1]) {
                //            tmp = arry[j + 1];
                //            arry[j + 1] = arry[j];
                //            reDraw(arry[j], j + 1);
                //            arry[j] = tmp;
                //            reDraw(tmp, j);
                //        }
                //    }
                //}

                //참고
                //http://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop#_=_
                firstLoop();
            }

            function firstLoop() {
                j = 0;
                secondLoop();
                function secondLoop() {
                    timeoutClear = $timeout(function () {
                        if (vm.valueArry[j] > vm.valueArry[j + 1]) {
                            tmp = vm.valueArry[j + 1];

                            context.clearRect(0, 30, 30 * vm.valueArry.length, 60);
                            vm.valueArry[j + 1] = vm.valueArry[j];
                            reDraw(vm.valueArry[j], j + 1);

                            vm.valueArry[j] = tmp;
                            reDraw(tmp, j);
                        }
                        j++;
                        count++;
                        if (j < vm.valueArry.length - 1 - i) {
                            secondLoop();
                        } else if (i < vm.valueArry.length - 1) {
                            i++;
                            firstLoop();
                        } else {
                            for (var k = 0; k < count; k++) {
                                $timeout.cancel(timeoutClear);
                            }
                            count = 0;
                        }
                    }, 300);
                }
            }

            function reDraw(value, index) {
                canvas_arrow(context, index * 30 + 15, 60, index * 30 + 15, 30);
                context.clearRect(index * 30, 0, 30, 30);
                context.strokeRect(index * 30, 0, 30, 30);
                context.fillText(value + "", index * 30 + 15, 15);
            }

            //참고
            //http://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag
            function canvas_arrow(context, fromx, fromy, tox, toy) {
                var headlen = 10;   // length of head in pixels
                var angle = Math.atan2(toy - fromy, tox - fromx);
                context.beginPath();
                context.moveTo(fromx, fromy);
                context.lineTo(tox, toy);
                context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
                context.moveTo(tox, toy);
                context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
                context.stroke();
            }
        }
    }
})(window, window.angular);
