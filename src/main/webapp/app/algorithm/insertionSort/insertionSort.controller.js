/**
 * Created by ksk on 2016-05-16.
 */

(function (window, angular) {
    "use strict";

    angular
        .module('myBlogApp')
        .controller('InsertionSortController', InsertionSortController);

    InsertionSortController.$inject = ['$timeout', '$document'];

    function InsertionSortController($timeout, $document) {
        var vm = this;
        var drawing = $document[0].getElementById("bubble-sort-drawing");
        var context = null;
        var timeoutClear = null;
        var roopState = true;
        var textarea = $document[0].getElementById("editor");
        var textarea2 = $document[0].getElementById("editor2");
        var editor = CodeMirror.fromTextArea(textarea, {
            lineNumbers: true,
            readOnly: true,
            theme: "dracula",
            mode: "javascript"
        });
        var editor2 = CodeMirror.fromTextArea(textarea2, {
            lineNumbers: true,
            readOnly: true,
            theme: "dracula",
            mode: "text/x-java"
        });
        vm.canvasConfirm = true;
        vm.valueArry = [];
        vm.roopSpeed = 2000;
        vm.sortStart = sortStart;
        vm.roopStop = roopStop;

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

        function sortStart() {
            var tmp = 0;
            var i = 1;
            var auxIndex = 0;

            if (roopState === true) {
                roopState = false;
                resetArry();

                //for (i = 1; i < arry.length; i++) {
                //    temp = arry[i];
                //    aux = i - 1;
                //    while ((aux >= 0) && (arry[aux] > temp)) {
                //        arry[aux + 1] = arry[aux];
                //        aux--;
                //    }
                //    arry[aux + 1] = temp;
                //}

                //참고
                //http://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop#_=_
                firstLoop();
            }

            function firstLoop() {
                tmp = vm.valueArry[i];
                auxIndex = i - 1;
                secondLoop();
                function secondLoop() {
                    timeoutClear = $timeout(function () {
                        if ((auxIndex >= 0) && (vm.valueArry[auxIndex] > tmp)) {
                            context.clearRect(0, 30, 30 * vm.valueArry.length, 60);
                            vm.valueArry[auxIndex + 1] = vm.valueArry[auxIndex];
                            reDraw(vm.valueArry[auxIndex], auxIndex + 1);
                            auxIndex--;
                            secondLoop();
                        } else if (i < vm.valueArry.length) {
                            context.clearRect(0, 30, 30 * vm.valueArry.length, 60);
                            vm.valueArry[auxIndex + 1] = tmp;
                            reDraw(tmp, auxIndex + 1);
                            i++;
                            firstLoop();
                        } else {
                            $timeout.cancel(timeoutClear);
                            roopState = true;
                        }
                    }, vm.roopSpeed, false);
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

        function resetArry() {
            vm.valueArry = [6, 8, 9, 1, 4, 3, 10, 2, 7, 5];
            context.clearRect(0, 0, vm.valueArry.length * 30, 60);
            for (var i = 0; i < vm.valueArry.length; i++) {
                context.strokeRect(i * 30, 0, 30, 30);
                context.fillText(vm.valueArry[i] + "", i * 30 + 15, 15)
            }
        }

        function roopStop() {
            $timeout.cancel(timeoutClear);
            roopState = true;
            resetArry()
        }
    }
})(window, window.angular);
