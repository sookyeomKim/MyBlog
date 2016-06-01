/**
 * Created by ksk on 2016-05-16.
 */

(function (window, angular) {
    "use strict";

    angular
        .module('myBlogApp')
        .controller('HeepSortController', HeepSortController);

    HeepSortController.$inject = ['$timeout', '$document'];

    function HeepSortController($timeout, $document) {
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
            var heapSize = -1;

            function init() {
                roopState = false;
                $timeout.cancel(timeoutClear);
                loopSequenceArray = [];
                traceLoopCount = 0;
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

            function Swap(array, left, right) {
                var tmp = array[left];
                array[left] = array[right];
                array[right] = tmp;
            }
            
            function upHeep(heepArray, key) {
                //슈도코드
                //insert_max_heap(A, key)
                //  heap_size ← heap_size + 1;
                //  i ← heap_size;
                //  A[i] ← key;
                //  while (i ≠ 1 and A[i] > A[PARENT(i)]) do
                //      A[i] ↔ A[PARENT(i)];
                //      i ← PARENT(i);

                //PARENT(i) : (i/2)
                //LEFT(i) : (i * 2)
                //RIGHT(i) : (i * 2 + 1)
                heapSize = heapSize + 1;//새로운 요소가 들어가므로 사이즈 1 증감
                var i = heapSize;
                heepArray[i] = key;//heep배열의 마지막 위치에 새로운 요소 삽입
                while (i !== 0 && heepArray[i] > heepArray[Math.floor((i - 1) / 2)]) {//삽입된 요소가 루트노드가 아니고 삽입된 요소의 부모노드보다 삽입된 요소가 더 클 경우 반복
                    Swap(heepArray, i, Math.floor((i - 1) / 2));//부모노드와 위치 변경
                    tracer(i, heepArray[i], Math.floor((i - 1) / 2), heepArray[Math.floor((i - 1) / 2)]);
                    i = Math.floor((i - 1) / 2);//변경된 위치를 기준점으로 재설정
                }
            }

            function downHeep(heepArray) {
                //슈도코드
                //delete_max_heap(A)
                //  item ← A[1];
                //  A[1] ← A[hsize];
                //  heap_size ← hsize - 1;
                //  i ← 1;
                //  while (LEFT(i) ≤ hsize) do
                //      if (RIGHT(i) > hsize or A[LEFT(i)] > A[RIGHT(i)]) then
                //          largest ← LEFT(i);
                //      else
                //          largest ← RIGHT(i);
                //      if A[i] > A[largest] then break;
                //      A[i] ↔ A[largest];
                //      i ← largest;
                //  return item;
                var largest;
                var item = heepArray[0];//heep배열의 첫번째 요소를 빼넴
                heepArray[0] = heepArray[heapSize];//마지막 요소를 첫번째 위치로 이동
                heapSize = heapSize - 1;//요소를 하나 뺏으므로 배열의 크기 1 가감
                var i = 0;
                while ((i * 2 + 1) <= heapSize) {//왼쪽 자식노드가 있으면 반복
                    if ((i * 2 + 2) > heapSize || heepArray[i * 2 + 1] > heepArray[i * 2 + 2]) {//오른쪽 자식노드가 없거나 왼쪽 자식노드가 오른쪽 자식노드보다 클 경우 비교 대상으로 설정
                        largest = i * 2 + 1;
                    } else {
                        largest = i * 2 + 2;
                    }
                    if (heepArray[i] > heepArray[largest]) {//현재의 노드가 비교 대상이 되는 자식노드보다 클 경우 루프를 멈춤
                        break;
                    }
                    Swap(heepArray, i, largest);
                    tracer(i, heepArray[i], largest, heepArray[largest]);
                    i = largest;//자리를 바꾼 자식노드의 위치를 기준 위치로 재설정
                }
                /*console.log(item);*/
                return item;//첫번째 아이템 반환
            }

            function sort(array) {
                var heepArray = [];

                //입력된 배열을 upHeep으로 heep배열에 정렬
                array.forEach(function (value) {
                    upHeep(heepArray, value);
                });

                //heep배열의 요소들을 downHeep하여 원래의 배열로 재정렬
                for (var i = array.length - 1; i >= 0; i--) {
                    array[i] = downHeep(heepArray);
                    tracer(i, array[i]);
                }
                traceOn()
            }

            return {
                start: sort,
                init: init
            }
        })(context);

        function sortStart() {
            if (roopState === true) {
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
