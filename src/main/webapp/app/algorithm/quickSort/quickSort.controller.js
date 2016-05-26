/**
 * Created by ksk on 2016-05-16.
 */

(function (window, angular) {
    "use strict";

    angular
        .module('myBlogApp')
        .controller('QuickSortController', QuickSortController);

    QuickSortController.$inject = ['$timeout', '$document'];

    function QuickSortController($timeout, $document) {
        var vm = this;
        var drawing = $document[0].getElementById("bubble-sort-drawing");
        var context = null;
        var roopState = true;
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
        vm.canvasConfirm = true;
        vm.valueArry = [];
        vm.roopSpeed = 2000;
        vm.sortStart = sortStart;
        vm.roopStop = roopStop;

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

        Sort = (function (context) {
            var loopSequenceArray = [];
            var timeoutClear = null;
            var traceLoopCount = 0;

            function init() {
                $timeout.cancel(timeoutClear);
                loopSequenceArray = [];
                traceLoopCount = 0;
            }

            function Swap(array, left, right) {
                var tmp = array[left];
                array[left] = array[right];
                array[right] = tmp;
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
                var headLen = 10;   // length of head in pixels
                var angle = Math.atan2(toy - fromy, tox - fromx);
                context.beginPath();
                context.moveTo(fromx, fromy);
                context.lineTo(tox, toy);
                context.lineTo(tox - headLen * Math.cos(angle - Math.PI / 6), toy - headLen * Math.sin(angle - Math.PI / 6));
                context.moveTo(tox, toy);
                context.lineTo(tox - headLen * Math.cos(angle + Math.PI / 6), toy - headLen * Math.sin(angle + Math.PI / 6));
                context.stroke();
            }

            function tracer(leftIndex, leftValue, rightIndex, rightValue) {
                if (rightIndex) {
                    loopSequenceArray.push({
                        leftIndex: leftIndex,
                        leftValue: leftValue,
                        rightIndex: rightIndex,
                        rightValue: rightValue
                    })
                } else {
                    loopSequenceArray.push({
                        leftIndex: leftIndex,
                        leftValue: leftValue,
                        rightIndex: null,
                        rightValue: null
                    })
                }
            }

            function traceOn() {
                if (loopSequenceArray[traceLoopCount].rightIndex !== null) {
                    context.clearRect(0, 30, 30 * vm.valueArry.length, 60);
                    reDraw(loopSequenceArray[traceLoopCount].leftValue, loopSequenceArray[traceLoopCount].leftIndex);
                    reDraw(loopSequenceArray[traceLoopCount].rightValue, loopSequenceArray[traceLoopCount].rightIndex);
                } else {
                    context.clearRect(0, 30, 30 * vm.valueArry.length, 60);
                    reDraw(loopSequenceArray[traceLoopCount].leftValue, loopSequenceArray[traceLoopCount].leftIndex);
                }

                timeoutClear = $timeout(function () {
                    traceLoopCount++;
                    if (loopSequenceArray.length > traceLoopCount) {
                        traceOn()
                    }
                }, vm.roopSpeed, false)
            }

            function QuickSort(array, start, end) {
                var i = start;// 왼쪽에서 시작하여 오른쪽으로 피봇보다값이 큰 값을 찾기 위한 인덱스입니다.
                var k = end;// 오른쪽에서 시작하여 왼쪽으로 피봇보다값이 작은 값을 찾기 위한 인덱스입니다.
                if (start < end) {// 정렬의 추가 실행여부 확인(마지막과 시작의 인덱스가 같다는 것은 모든 정렬을 마치고 왔다는 의미이므로 바로 메소드를 벗어납니다)
                    var pivot = array[start];// 배열의 맨 좌측을 피봇으로 설정합니다.
                    while (k > i) {// i와 k가 엇갈리기 전까지 피봇을 기준으로 비교하여 Swap합니다.
                        while (array[i] <= pivot && i <= end && k > i) {// 피봇의 값보다 큰 요소의 위치를 찾아 냅니다.
                            i++;
                            tracer(i, array[i])
                        }
                        while (array[k] > pivot && k >= start && k >= i) {// 피봇의 값보다 작은 요소의 위치를 찾아 냅니다.
                            k--;
                            tracer(k, array[k])
                        }
                        if (k > i) {// 엇갈리기 전까지 피봇보다 값이 큰 요소와 작은 요소를 서로 Swap합니다.
                            Swap(array, i, k);
                            tracer(i, array[i], k, array[k]);
                        }
                    }
                    Swap(array, start, k);// 엇갈렸다면 피봇과 엇갈린 다음의 k(오른쪽에서 시작한 인덱스)와 Swap하여 기준점으로 삼습니다. 혹은 피봇이 최대값일 경우 맨 뒤의 요소와 Swap하여 정렬을 수행하도록 합니다.
                    tracer(start, array[start], k, array[k]);

                    QuickSort(array, start, k - 1); // 기준점의 왼쪽 partition을 재정렬합니다.
                    QuickSort(array, k + 1, end);   // 기준점의 오른쪽 partition을 재정렬합니다.
                }
            }

            function sort(array) {
                QuickSort(array, 0, array.length - 1);
                traceOn()
            }

            return {
                start: sort,
                init: init
            }
        })(context);

        function sortStart() {
            if (roopState === true) {
                roopState = false;
                resetArry();
                Sort.start(vm.valueArry);
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
            initRoopState();
            resetArry()
        }

        function initRoopState() {
            Sort.init();
            roopState = true;
        }
    }
})(window, window.angular);
