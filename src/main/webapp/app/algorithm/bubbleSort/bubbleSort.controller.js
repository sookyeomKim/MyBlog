/**
 * Created by ksk on 2016-05-16.
 */

(function (window, angular) {
    "use strict";

    angular
        .module('myBlogApp')
        .controller('BubbleSortController', BubbleSortController);

    BubbleSortController.$inject = ['$scope', '$document', 'Tracer'];

    function BubbleSortController($scope, $document, Tracer) {
        var vm = this;
        var Sort = null;
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
        vm.canvasConfirm = Tracer.init('bubble-sort-drawing');
        vm.valueArry = [];
        vm.roopSpeed = 2000;
        vm.sortStart = sortStart;
        vm.sortStop = sortStop;

        Sort = (function () {
            function Swap(array, left, right) {
                var tmp = array[left];
                array[left] = array[right];
                array[right] = tmp;
            }

            function start(array) {
                var tmp = 0;
                for (var i = 0; i < array.length - 1; i++) {
                    for (var j = 0; j < array.length - 1 - i; j++) {
                        if (array[j] > array[j + 1]) {
                            Swap(array, j, j + 1);
                            Tracer.tracer(j, array[j], j + 1, array[j + 1])
                        }
                    }
                }
                return Tracer.traceOn(vm.roopSpeed);
            }

            return {
                start: start
            }
        })();


        //캔버스지원 확인(어차피 blog자체가 ie9이상부터 호환이라 딱히 상관은 없다만...공부를 위해)
        /*if (drawing.getContext) {
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

         if (roopState === true) {
         roopState = false;
         resetArry();

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
         if (j < vm.valueArry.length - 1 - i) {
         secondLoop();
         } else if (i < vm.valueArry.length - 1) {
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
         vm.valueArry = [10, 8, 9, 1, 4, 3, 6, 2, 7, 5];
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
         }*/
        function sortStart() {
            sortStop();
            Sort.start(Tracer.valueArry);
        }

        function sortStop() {
            Tracer.resetLoop();
            Tracer.resetArry();
        }

        $scope.$on('$destroy', function () {
            Tracer.cleanTimeout();
            Sort = null;
        });
    }
})(window, window.angular);
