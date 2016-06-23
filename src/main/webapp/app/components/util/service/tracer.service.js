/**
 * Created by sukyum on 2016-06-23.
 */
/**
 * Created by ksk on 2016-05-16.
 */

(function (window, angular) {
    "use strict";

    angular
        .module('myBlogApp')
        .service('Tracer', Tracer);

    Tracer.$inject = ['$document', '$timeout'];

    function Tracer($document, $timeout) {
        var vm = this;
        var drawing = null;
        var context = null;
        var loopSequenceArray = [];
        var timeoutClear = null;
        var traceLoopCount = 0;

        vm.valueArry = [];
        vm.init = init;
        vm.resetLoop = resetLoop;
        vm.resetArry = resetArry;
        vm.tracer = tracer;
        vm.traceOn = traceOn;
        vm.cleanTimeout = cleanTimeout;

        function init(targetElId) {
            drawing = $document[0].getElementById(targetElId);
            if (drawing.getContext) {
                context = drawing.getContext("2d");
                context.strokeStyle = "#e47911";
                context.font = "blod 14px Arial";
                context.textAlign = "center";
                context.textBaseline = "middle";
                resetArry();
                return true;
            } else {
                return false;
            }
        }

        function resetLoop() {
            cleanTimeout();
            loopSequenceArray = [];
            traceLoopCount = 0;
        }

        function resetArry() {
            vm.valueArry = [10, 8, 9, 1, 4, 3, 6, 2, 7, 5];
            context.clearRect(0, 0, vm.valueArry.length * 30, 60);
            for (var i = 0; i < vm.valueArry.length; i++) {
                context.strokeRect(i * 30, 0, 30, 30);
                context.fillText(vm.valueArry[i] + "", i * 30 + 15, 15)
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

        function traceOn(roopSpeed) {
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
                    traceOn(roopSpeed);
                }
            }, roopSpeed, false)
        }

        function cleanTimeout() {
            $timeout.cancel(timeoutClear);
        }
    }
})(window, window.angular);
