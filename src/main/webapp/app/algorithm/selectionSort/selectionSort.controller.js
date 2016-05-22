/**
 * Created by ksk on 2016-05-16.
 */

(function (window, angular) {
    "use strict";

    angular
        .module('myBlogApp')
        .controller('SelectionSortController', SelectionSortController);

    SelectionSortController.$inject = ['$timeout'];

    function SelectionSortController($timeout) {
        var vm = this;
        var drawing = document.getElementById("bubble-sort-drawing");
        var context = null;
        var timeoutClear = null;
        var roopCount = 0;
        vm.canvasConfirm = true;
        vm.valueArry = [];
        vm.roopSpeed = 2000;
        vm.sortStart = sortStart;
        vm.roopStop = roopStop;
        vm.editorJavascriptSource = {
            mode: {name: "text/javascript"},
            lineWrapping: true,
            lineNumbers: true,
            theme: 'dracula',
            value: 'function selectionSort(arry) {\n' +
            '\tvar criterionIndex = 0;\n' +
            '\tvar tmp = 0;\n' +
            '\tfor (var i = 0; i < valueArry.length - 1; i++) {\n' +
            '\t\tcriterionIndex = i;\n' +
            '\t\tfor (var j = i + 1; j < valueArry.length; j++) {\n' +
            '\t\t\tif (valueArry[j] < valueArry[criterionIndex]) {\n' +
            '\t\t\t\tcriterionIndex = j\n' +
            '\t\t\t}\n' +
            '\t\t}\n' +
            '\ttmp = valueArry[i];\n' +
            '\tvalueArry[i] = valueArry[criterionIndex];\n' +
            '\tvalueArry[criterionIndex] = tmp;\n' +
            '}\n'
        };
        vm.editorJavaSource = {
            mode: {name: "text/x-java"},
            lineWrapping: true,
            lineNumbers: true,
            theme: 'dracula',
            value: 'static void selectionSort(int[] arry) {\n' +
            '\tint criterionIndex;\n' +
            '\tint tmp;\n' +
            '\tfor (int i = 0; i < valueArry.length - 1; i++) {\n' +
            '\t\tcriterionIndex = i;\n' +
            '\t\tfor (int j = i + 1; j < valueArry.length; j++) {\n' +
            '\t\t\tif (valueArry[j] < valueArry[criterionIndex]) {\n' +
            '\t\t\t\tcriterionIndex = j;\n' +
            '\t\t\t}\n' +
            '\t\t}\n' +
            '\ttmp = valueArry[i];\n' +
            '\tvalueArry[i] = valueArry[criterionIndex];\n' +
            '\tvalueArry[criterionIndex] = tmp;\n' +
            '\t}\n' +
            '}\n'
        };

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

        function sortStart() {
            var tmp = 0;
            var i = 0;
            var j = 0;
            var criterionIndex = 0;

            if (roopCount === 0) {
                resetArry();

                //for (i = 0; i < valueArry.length - 1; i++) {
                //    criterionIndex = i;
                //    for (j = i + 1; j < valueArry.length; j++) {
                //        if (valueArry[j] < valueArry[criterionIndex]) {
                //            criterionIndex = j
                //        }                //
                //    }
                //    tmp = valueArry[i];
                //    valueArry[i] = valueArry[criterionIndex];
                //    valueArry[criterionIndex] = tmp;
                //}

                //참고
                //http://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop#_=_
                firstLoop();
            }

            function firstLoop() {
                timeoutClear = $timeout(function () {
                    criterionIndex = i;
                    for (j = i + 1; j < vm.valueArry.length; j++) {
                        if (vm.valueArry[j] < vm.valueArry[criterionIndex]) {
                            criterionIndex = j
                        }
                    }
                    tmp = vm.valueArry[i];

                    context.clearRect(0, 30, 30 * vm.valueArry.length, 60);
                    vm.valueArry[i] = vm.valueArry[criterionIndex];
                    reDraw(vm.valueArry[criterionIndex], i);

                    vm.valueArry[criterionIndex] = tmp;
                    reDraw(tmp, criterionIndex);

                    roopCount++;
                    if (i < vm.valueArry.length - 1) {
                        i++;
                        firstLoop();
                    } else {
                        initRoopCount();
                    }
                }, vm.roopSpeed);
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

        function roopStop() {
            initRoopCount();
            resetArry()
        }

        function initRoopCount() {
            for (var k = 0; k < roopCount; k++) {
                $timeout.cancel(timeoutClear);
            }
            roopCount = 0;
        }

        function resetArry() {
            vm.valueArry = [10, 8, 9, 1, 4, 3, 6, 2, 7, 5];
            context.clearRect(0, 0, vm.valueArry.length * 30, 60);
            for (var i = 0; i < vm.valueArry.length; i++) {
                context.strokeRect(i * 30, 0, 30, 30);
                context.fillText(vm.valueArry[i] + "", i * 30 + 15, 15)
            }
        }
    }
})(window, window.angular);
