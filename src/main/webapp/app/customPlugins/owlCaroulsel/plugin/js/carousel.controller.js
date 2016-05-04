/**
 * Created by ksk on 2016-03-31.
 */
(function (window, angular, undefined) {
    "use strict";

    angular.module('myBlogApp').controller('OwlCarouselController', OwlCarouselController);

    OwlCarouselController.$inject = ['$scope', '$element', '$window', '$timeout', '$interval', '$document', '$animateCss'];

    function OwlCarouselController($scope, $element, $window, $timeout, $interval, $document, $animateCss) {
        var vm = this;
        var base = {};
        var defaultOptions = {

            items: 5,
            itemsCustom: false,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 2],
            itemsTabletSmall: false,
            itemsMobile: [479, 1],
            singleItem: false,
            itemsScaleUp: false,

            slideSpeed: 200,
            paginationSpeed: 800,
            rewindSpeed: 1000,

            autoPlay: false,
            stopOnHover: false,

            navigation: false,
            navigationText: ["prev", "next"],
            rewindNav: true,
            scrollPerPage: false,

            pagination: true,
            paginationNumbers: false,

            responsive: true,
            responsiveRefreshRate: 200,
            responsiveBaseWidth: $window,

            baseClass: "owl-carousel",
            theme: "owl-theme",

            lazyLoad: false,
            lazyFollow: true,
            lazyEffect: "fade",

            autoHeight: false,

            jsonPath: false,
            jsonSuccess: false,

            dragBeforeAnimFinish: true,
            mouseDrag: true,
            touchDrag: true,

            addClassActive: false,
            transitionStyle: false,

            beforeUpdate: false,
            afterUpdate: false,
            beforeInit: false,
            afterInit: false,
            beforeMove: false,
            afterMove: false,
            afterAction: false,
            startDragging: false,
            afterLazyLoad: false
        };

        vm.init = init;

        function init() {
            base.$elem = $element;
            base.userOptions = (function (obj) {
                var userOptionsObj = {};
                for (var key in obj) {
                    if (obj[key] !== undefined) {
                        userOptionsObj[key] = obj[key]
                    }
                }
                return userOptionsObj;
            })(vm);
            base.options = angular.extend(defaultOptions, base.userOptions);
            loadContent();
        }

        function loadContent() {//컨텐트 불러오기
            var url;

            function getData(data) {
                var i, content = "";
                if (typeof base.options.jsonSuccess === "function") {
                    base.options.jsonSuccess.apply(this, [data]);
                } else {
                    for (i in data.owl) {
                        if (data.owl.hasOwnProperty(i)) {
                            content += data.owl[i].item;
                        }
                    }
                    base.$elem.html(content);
                }
                logIn();
            }

            if (typeof base.options.beforeInit === "function") {//초기화 하기 전에 함수를 설정할 경우
                base.options.beforeInit.apply(this, [base.$elem]);
            }

            if (typeof base.options.jsonPath === "string") {//json으로 불러올 경우
                url = base.options.jsonPath;
                //TODO - $http()로 바꿔야 함
                /*$.getJSON(url, getData);*/
            } else {//기본 :3
                logIn();
            }
        }

        function logIn() {
            base.$elem.data("owl-originalStyles", base.$elem.attr("style"));
            base.$elem.data("owl-originalClasses", base.$elem.attr("class"));

            base.$elem.css({opacity: 0});//초기화할 땐 안 보이다가
            base.orignalItems = base.options.items;//아이템 갯수 설정
            checkBrowser();//브라우저 검사, 각 브라우저 체크에서 터치 하는지 아닌지 체크하는 놈?
            base.wrapperWidth = 0;//컨텐트 가로길이 초기화
            base.checkVisible = null;
            setVars();//값 세팅 :4*/
        }

        function setVars() {//값 세팅
            if (base.$elem.children().length === 0) {
                return false;
            }

            baseClass();//테마를 위한 기본옵션에 의한 클래스 설정
            eventTypes();//터치,마우스 이벤트를 위한 기본옵션에 의한 이벤트 설정
            base.$userItems = angular.element(base.$elem[0].querySelector(".owl-wrapper")).children().children();//아이템들의 레퍼런스
            base.itemsAmount = base.$userItems.length;//아이템들의 갯수 레퍼런스
            base.wrapperOuter = angular.element(base.$elem[0].querySelector(".owl-wrapper-outer"));//owl-wrapper-outer dom레퍼런스
            base.$owlItems = angular.element(base.$elem[0].querySelectorAll(".owl-item"));//owl-item으로 감싼 아이템dom 레퍼런스
            base.$owlWrapper = angular.element(base.$elem[0].querySelector(".owl-wrapper"));//owl-wrapper dom 레퍼런스
            base.playDirection = "next";//방향설정 -노파악
            base.prevItem = 0;//이전 아이템 초기화 -노파악
            base.prevArr = [0];//이전 배열 초기화 -노파악
            base.currentItem = 0;//현재 아이템 초기화 -노파악
            /*customEvents();*///버튼 이벤트 설정
            onStartup();//인터렉션 시즈악! :5
        }

        function updateVars() {//세팅 값 업데이트
            if (typeof base.options.beforeUpdate === "function") {
                base.options.beforeUpdate.apply(this, [base.$elem]);
            }
            watchVisibility();  //visible 체크
            updateItems();//표시할 아이템 개수 설정
            calculateAll();//각종 계산
            updatePosition();
            updateControls();//제어기 업데이트 :14
            eachMoveUpdate();
            if (typeof base.options.afterUpdate === "function") {
                base.options.afterUpdate.apply(this, [base.$elem]);
            }
        }

        function onStartup() {//인터렉션 시즈악! :5
            updateItems();//표시할 아이템 개수 설정 :6
            calculateAll();//각종 계산 :7
            buildControls();//제어기 생성(페이지네이션, 네비게이션) :13
            updateControls();//제어기 업데이트 :14
            response();//반응형 설정 :15
            moveEvents();//드래그 및 스왑 이벤트
            stopOnHover();//캐러셀 대상 dom 호버이벤트
            owlStatus();

            if (base.options.transitionStyle !== false) {
                base.transitionTypes(base.options.transitionStyle);
            }
            if (base.options.autoPlay === true) {
                base.options.autoPlay = 5000;
            }

            play();

            angular.element(base.$elem[0].querySelector(".owl-wrapper")).css("display", "block");

            if (base.$elem.find("div")[0].offsetWidth === 0) {
                watchVisibility();//visible 체크
            } else {
                base.$elem.css("opacity", 1);
            }

            base.onstartup = false;
            eachMoveUpdate();
            if (typeof base.options.afterInit === "function") {
                base.options.afterInit.apply(this, [base.$elem]);
            }
        }

        function updateItems() {//표시할 아이템 개수 설정 :6
            var width, i;

            if (base.options.responsive === false) {//반응형 설정 아니면 넘기기
                return false;
            }
            if (base.options.singleItem === true) {//싱글아이템 설정이면 item관련 모두 false시키고 넘기기
                base.options.items = base.orignalItems = 1;//아이템 개수 하나로 설정
                base.options.itemsCustom = false;
                base.options.itemsDesktop = false;
                base.options.itemsDesktopSmall = false;
                base.options.itemsTablet = false;
                base.options.itemsTabletSmall = false;
                base.options.itemsMobile = false;
                return false;
            }

            width = base.options.responsiveBaseWidth.document.documentElement.offsetWidth;//처음은 윈도우 width

            //base.options.itemsDesktop[0] : 기본 혹은 사용자가 설정한 데스크탑 max-width설정
            //base.orignalItems : 아이템 갯수 설정
            //위 2개중 하나라도 위의 width보다 작으면
            if (width > (base.options.itemsDesktop[0] || base.orignalItems)) {
                base.options.items = base.orignalItems;
            }

            if (base.options.itemsCustom !== false) {//itemsCustom가 true면
                //Reorder array by screen size
                base.options.itemsCustom.sort(function (a, b) {
                    return a[0] - b[0];
                });//내림차순으로 소팅

                //현재 width보다 커스텀 width가 작은 것 중 window width에 제일 근접한 것의 아이템 개수를 현재 아이템 개수로 설정
                for (i = 0; i < base.options.itemsCustom.length; i += 1) {
                    if (base.options.itemsCustom[i][0] <= width) {
                        base.options.items = base.options.itemsCustom[i][1];
                    }
                }

            } else {//itemsCustom가 false면
                //itemsDesktop이 true고 itemsDesktop의 max-width값이 현재 window width보다 클 경우 itemsDesktop의 아이템 개수로 설정
                if (width <= base.options.itemsDesktop[0] && base.options.itemsDesktop !== false) {
                    base.options.items = base.options.itemsDesktop[1];
                }

                //
                if (width <= base.options.itemsDesktopSmall[0] && base.options.itemsDesktopSmall !== false) {
                    base.options.items = base.options.itemsDesktopSmall[1];
                }

                //
                if (width <= base.options.itemsTablet[0] && base.options.itemsTablet !== false) {
                    base.options.items = base.options.itemsTablet[1];
                }

                //
                if (width <= base.options.itemsTabletSmall[0] && base.options.itemsTabletSmall !== false) {
                    base.options.items = base.options.itemsTabletSmall[1];
                }

                //
                if (width <= base.options.itemsMobile[0] && base.options.itemsMobile !== false) {
                    base.options.items = base.options.itemsMobile[1];
                }
            }

            //아이템의수가 설정한 것보다 작으면
            if (base.options.items > base.itemsAmount && base.options.itemsScaleUp === true) {
                base.options.items = base.itemsAmount;
            }
        }

        function calculateAll() {//각종 계산 :7
            calculateWidth();//아이템의 width 계산하여 옵션에 설정 :8
            appendWrapperSizes();//$owlWrapper width 계산하여 설정 :9
            loops();//이동할 위치를 담은 배열 생성 :11
            max();//마지막 위치 계산 :12
        }

        function calculateWidth() {//아이템의 width 계산하여 옵션에 설정 :8
            //base.$elem.find("div")[0].offsetWidth : 대상 dom width
            //base.options.items : 현재 아이템 설정 갯수
            base.itemWidth = Math.round(base.$elem.find("div")[0].offsetWidth / base.options.items);
        }

        function appendWrapperSizes() {//$owlWrapper width 계산하여 css 적용 :9
            var width = base.$owlItems.length * base.itemWidth;
            base.$owlWrapper.css({
                "left": 0,
                "width": width * 2 + "px"
            });
            appendItemsSizes();//아이템 width css 적용 :10
        }

        function appendItemsSizes() {//아이템 width css 적용 :10
            var roundPages = 0,
            //base.itemsAmount : 총 아이템 갯수
            //base.options.items : 보여지는 아이템 갯수
                lastItem = base.itemsAmount - base.options.items;//안 보이는 아이템의 갯수
            angular.forEach(base.$owlItems, function (value, index) {
                var $this = angular.element(value);
                //item에 width css 적용
                $this
                    .css({"width": base.itemWidth + 'px'})
                    .data("owl-item", Number(index));

                if (index % base.options.items === 0 || index === lastItem) {//보여지는 아이템의 갯수의 배수 혹은 안 보여지는 아이템의 갯수
                    if (!(index > lastItem)) {//index가 lastItem보다 작거나 같은 경우
                        roundPages += 1;//총 아이템수에 따른 페이지를 산정한다.
                    }
                }
                $this.data("owl-roundPages", roundPages);//아이템에 페이지 번호 설정
            });
        }

        function loops() {//이동할 위치를 담은 배열 생성. :11
            var prev = 0,
                elWidth = 0,
                i,
                item,
                roundPageNum;

            base.positionsInArray = [0];//아이템 당 스크롤 이동을 위해 아이템의 위치를 담는다.
            base.pagesInArray = [];//페이지 당 스크롤 이동을 위해 페이지의 위치를 담는다.

            for (i = 0; i < base.itemsAmount; i += 1) {
                elWidth += base.itemWidth;
                base.positionsInArray.push(-elWidth);

                if (base.options.scrollPerPage === true) {//페이지 당 스크롤 이동을 true로 할 경우
                    item = angular.element(base.$owlItems[i]);
                    roundPageNum = item.data("owl-roundPages");//페이지 수 뽑아내고
                    if (roundPageNum !== prev) {
                        base.pagesInArray[prev] = base.positionsInArray[i];
                        prev = roundPageNum;
                    }
                }
            }
        }

        function max() {//마지막 위치 계산 :12
            //base.itemsAmount : 아이템의 총 갯수
            //base.itemWidth : 아이템의 width
            //base.options.items : 보여지는 아이템 갯수
            var maximum = ((base.itemsAmount * base.itemWidth) - base.options.items * base.itemWidth) * -1;
            if (base.options.items > base.itemsAmount) {//총 갯수보다 보여지는 갯수가 더 클 경우
                base.maximumItem = 0;
                maximum = 0;
                base.maximumPixels = 0;
            } else {//작을 경우
                base.maximumItem = base.itemsAmount - base.options.items;//안 보여지는 갯수번째의 아이템을 최대치 아이템으로 설정
                base.maximumPixels = maximum;//최대치 아이템의 위치
            }
            return maximum;
        }

        function buildControls() {//제어기 생성(페이지네이션, 네비게이션) :13
            //네비게이션 또는 페이지네이션이 true일 경우
            if (base.options.navigation === true || base.options.pagination === true) {
                //대상 dom에 제어기 wrap 생성
                base.owlControls = angular.element("<div class=\"owl-controls\"/>").toggleClass("clickable", !base.browser.isTouch);
                angular.element(base.$elem).append(base.owlControls);
            }
            if (base.options.pagination === true) {//페이지네이션이 true일 경우 페이지네이션 생성(현재 기본은 true)
                buildPagination();//페이지네이션 생성
            }
            if (base.options.navigation === true) {//이전,다음 버튼 생성 true일 때
                buildButtons();//이전, 다음 버튼 생성
            }
        }

        function buildPagination() {//페이지네이션 생성
            base.paginationWrapper = angular.element("<div class=\"owl-pagination\"/>");
            base.owlControls.append(base.paginationWrapper);//제어기 wrap에 페이지네이션 wrap 생성

            angular.element(base.paginationWrapper[0].querySelector(".owl-page")).on('touchend.owlControls mouseup.owlControls', function (event) {
                event.preventDefault();
                //TODO - 여기도 수정
                if (Number($(this).data("owl-page")) !== base.currentItem) {//현 페이지의 첫 번째 아이템과 owl-page의 data가 다를 경우
                    base.goTo(Number($(this).data("owl-page")), true);//아이템 이동
                }
            });
        }

        function buildButtons() {//이전, 다음 버튼 생성
            //TODO - 여기도 수정
            var buttonsWrapper = angular.element("<div class=\"owl-buttons\"/>");
            base.owlControls.append(buttonsWrapper);//controll wrap에 버튼 wrap에 추가

            base.buttonPrev = angular.element("<div/>", {
                "class": "owl-prev",
                "html": base.options.navigationText[0] || ""
            });

            base.buttonNext = angular.element("<div/>", {
                "class": "owl-next",
                "html": base.options.navigationText[1] || ""
            });

            //button wrap에 버튼 추가
            buttonsWrapper
                .append(base.buttonPrev)
                .append(base.buttonNext);

            buttonsWrapper.on("touchstart.owlControls mousedown.owlControls", "div[class^=\"owl\"]", function (event) {
                event.preventDefault();
            });

            buttonsWrapper.on("touchend.owlControls mouseup.owlControls", "div[class^=\"owl\"]", function (event) {
                event.preventDefault();
                if ($(this).hasClass("owl-next")) {
                    base.next();
                } else {
                    base.prev();
                }
            });
        }

        function updateControls() {//제어기 업데이트 :14
            updatePagination();//페이지네이션 업데이트
            checkNavigation();//네비게이션 체크
            if (base.owlControls) {
                if (base.options.items >= base.itemsAmount) {
                    base.owlControls.css({"display": "none"})
                } else {
                    base.owlControls.css({"display": "block"})
                }
            }
        }

        function updatePagination() {//페이지네이션 업데이트
            var counter,
                lastPage,
                lastItem,
                i,
                paginationButton,
                paginationButtonInner;

            if (base.options.pagination === false) {
                return false;
            }

            base.paginationWrapper.html("");

            counter = 0;
            lastPage = base.itemsAmount - base.itemsAmount % base.options.items;

            for (i = 0; i < base.itemsAmount; i += 1) {
                if (i % base.options.items === 0) {
                    counter += 1;
                    if (lastPage === i) {
                        lastItem = base.itemsAmount - base.options.items;
                    }
                    paginationButton = angular.element("<div/>").addClass("owl-page");
                    paginationButtonInner = angular.element("<span></span>")
                        .text(base.options.paginationNumbers === true ? counter : "")
                        .addClass(base.options.paginationNumbers === true ? "owl-numbers" : "");
                    paginationButton.append(paginationButtonInner);

                    paginationButton.data("owl-page", lastPage === i ? lastItem : i);
                    paginationButton.data("owl-roundPages", counter);

                    base.paginationWrapper.append(paginationButton);
                }
            }
            checkPagination();
        }

        function checkPagination() {//페이지네이션 activate 갱신
            if (base.options.pagination === false) {//페이지네이션이 false면 취소
                return false;
            }
            angular.forEach(angular.element(base.paginationWrapper[0].querySelectorAll(".owl-page")), function (value, index) {
                var $this = angular.element(value);
                if ($this.data("owl-roundPages") === angular.element(base.$owlItems[base.currentItem]).data("owl-roundPages")) {
                    angular.element(base.paginationWrapper[0].querySelectorAll(".owl-page")).removeClass("active");
                    $this.addClass("active");
                }
            });
        }

        function checkNavigation() {//네비게이션 버튼 disabled 갱신
            if (base.options.navigation === false) {
                return false;
            }
            if (base.options.rewindNav === false) {
                if (base.currentItem === 0 && base.maximumItem === 0) {
                    base.buttonPrev.addClass("disabled");
                    base.buttonNext.addClass("disabled");
                } else if (base.currentItem === 0 && base.maximumItem !== 0) {
                    base.buttonPrev.addClass("disabled");
                    base.buttonNext.removeClass("disabled");
                } else if (base.currentItem === base.maximumItem) {
                    base.buttonPrev.removeClass("disabled");
                    base.buttonNext.addClass("disabled");
                } else if (base.currentItem !== 0 && base.currentItem !== base.maximumItem) {
                    base.buttonPrev.removeClass("disabled");
                    base.buttonNext.removeClass("disabled");
                }
            }
        }

        function response() {//반응형 설정 :15
            var smallDelay,
                lastWindowWidth;

            if (base.options.responsive !== true) {//responsive false일 경우 취소
                return false;
            }
            lastWindowWidth = $window.document.documentElement.offsetWidth;

            base.resizer = function () {//리사이저
                if ($window.document.documentElement.offsetWidth !== lastWindowWidth) {
                    //TODO - 나중에 수정
                    if (base.options.autoPlay !== false) {//autoPlay 설정일 경우 인터벌 초기화
                        window.clearInterval(base.autoPlayInterval);
                    }
                    $timeout.cancel(smallDelay);
                    smallDelay = $timeout(function () {
                        lastWindowWidth = $window.document.documentElement.offsetWidth;
                        //TODO - 업데이트벨류 마무리
                        updateVars();//세팅 값 업데이트
                    }, base.options.responsiveRefreshRate);
                }
            };
            angular.element($window).on('resize', base.resizer);

            $scope.$on("$destroy", function () {
                $timeout.cancel(smallDelay);
                angular.element($window).off('resize', base.resizer);
            });
        }

        function moveEvents() {//드래그 및 스왑 이벤트
            if (base.options.mouseDrag !== false || base.options.touchDrag !== false) {
                gestures();
                disabledEvents();
            }
        }

        function gestures() {
            /*jslint unparam: true*/
            var locals = {
                offsetX: 0,
                offsetY: 0,
                baseElWidth: 0,
                relativePos: 0,
                position: null,
                minSwipe: null,
                maxSwipe: null,
                sliding: null,
                dargging: null,
                targetElement: null
            };

            base.isCssFinish = true;

            function getTouches(event) {
                if (event.touches !== undefined) {//터치일 경우
                    return {
                        x: event.touches[0].pageX,
                        y: event.touches[0].pageY
                    };
                }

                if (event.touches === undefined) {//마우스일 경우
                    if (event.pageX !== undefined) {//event.pageX가 있으면 event.pageX를 사용하고
                        return {
                            x: event.pageX,
                            y: event.pageY
                        };
                    }
                    if (event.pageX === undefined) {//event.pageX가 없으면 event.clientX를 사용한다.
                        return {
                            x: event.clientX,
                            y: event.clientY
                        };
                    }
                }
            }

            function swapEvents(type) {
                if (type === "on") {
                    $document.on(base.ev_types.move, dragMove);
                    $document.on(base.ev_types.end, dragEnd);
                } else if (type === "off") {
                    $document.off(base.ev_types.move, dragMove);
                    $document.off(base.ev_types.end, dragEnd);
                }
            }

            function dragStart(event) {//드래그 스타트!!!
                var ev = event.originalEvent || event || window.event,
                    position;

                if (ev.which === 3) {
                    return false;
                }
                if (base.itemsAmount <= base.options.items) {
                    return;
                }
                if (base.isCssFinish === false && !base.options.dragBeforeAnimFinish) {
                    return false;
                }
                if (base.isCss3Finish === false && !base.options.dragBeforeAnimFinish) {
                    return false;
                }

                //오토플레이 중일 경우 초기화
                if (base.options.autoPlay !== false) {
                    $interval.cancel(base.autoPlayInterval);
                }

                /*그래빙 중일 경우 grabbing 클래스 추가*/
                if (base.browser.isTouch !== true && !base.$owlWrapper.hasClass("grabbing")) {
                    base.$owlWrapper.addClass("grabbing");
                }

                base.newPosX = 0;
                base.newRelativeX = 0;

                /*transition 초기화*/
                angular.element(this).css(removeTransition());

                //angular.element(this) : owl-wrapper
                position = owl_postion(angular.element(this));//owl-wrapper의 left, top을 따온다.

                locals.relativePos = position.left;//이동하기 전 left위치

                locals.offsetX = getTouches(ev).x - position.left;
                locals.offsetY = getTouches(ev).y - position.top;
                /*console.log("클릭한 위치"+getTouches(ev).x)
                 console.log("요소 이동하기 전 위치"+position.left)
                 console.log("옵셋(요소의 맨 왼쪽부터 현재 클릭한 부분까지)"+locals.offsetX)*/

                swapEvents("on");//swap 이벤트 시작

                locals.sliding = false;
                locals.targetElement = ev.target || ev.srcElement;

            }

            function dragMove(event) {
                var ev = event.originalEvent || event || window.event,
                    minSwipe,
                    maxSwipe;


                base.newPosX = getTouches(ev).x - locals.offsetX;//현재 클릭 위치에서 요소의 맨 왼쪽부터 요소를 처음 클릭한 위치까지의 값을 뺀다 = 이동한 수치가 된다.
                base.newPosY = getTouches(ev).y - locals.offsetY;
                base.newRelativeX = base.newPosX - locals.relativePos;
                /*console.log("클릭한 위치" + getTouches(ev).x)
                 console.log("요소 이동하기 전 위치" + locals.offsetX)
                 console.log("이동한 수치" + base.newPosX)
                 console.log("" + locals.relativePos)
                 console.log("" + base.newRelativeX)*/

                if (typeof base.options.startDragging === "function" && locals.dragging !== true && base.newRelativeX !== 0) {
                    locals.dragging = true;
                    base.options.startDragging.apply(base, [base.$elem]);
                }

                if ((base.newRelativeX > 8 || base.newRelativeX < -8) && (base.browser.isTouch === true)) {
                    if (ev.preventDefault !== undefined) {
                        ev.preventDefault();
                    } else {
                        ev.returnValue = false;
                    }
                    locals.sliding = true;
                }

                if ((base.newPosY > 10 || base.newPosY < -10) && locals.sliding === false) {
                    $document.off("touchmove");
                }

                minSwipe = function () {
                    return base.newRelativeX / 5;
                };

                maxSwipe = function () {
                    return base.maximumPixels + base.newRelativeX / 5;
                };
                base.newPosX = Math.max(Math.min(base.newPosX, minSwipe()), maxSwipe());
                if (base.browser.support3d === true) {
                    transition3d(base.newPosX);
                } else {
                    css2move(base.newPosX);
                }
            }

            function dragEnd(event) {
                var ev = event.originalEvent || event || window.event,
                    newPosition,
                    clickPreventCallback,
                    handlers,
                    owlStopEvent;

                locals.target = ev.target || ev.srcElement;

                locals.dragging = false;

                if (base.browser.isTouch !== true) {
                    base.$owlWrapper.removeClass("grabbing");
                }

                if (base.newRelativeX < 0) {
                    base.dragDirection = base.owl.dragDirection = "left";
                } else {
                    base.dragDirection = base.owl.dragDirection = "right";
                }

                if (base.newRelativeX !== 0) {
                    newPosition = getNewPosition();
                    goTo(newPosition, false, "drag");

                    //off가 작동하지 않아 preventDefault()가 해제되지 않았다.
                    //jQuery의 on은 namespace를 사용하여 특정 이벤트를 바로 off시킬 수 있었지만,
                    //angularjs의 jqlite의 on은 namespace를 지원하지 않기 때문에
                    //특정 이벤트를 off시키기 위해선 다음과 같이 off의 두번째 매개변수로 on의 콜백함수를 넣어준다.
                    //http://stackoverflow.com/questions/28308839/angular-dom-event-namespace
                    clickPreventCallback = function (ev) {
                        ev.stopImmediatePropagation();
                        ev.stopPropagation();
                        ev.preventDefault();
                        return angular.element(this).off("click", clickPreventCallback);
                    };

                    angular.element(locals.target).on("click", clickPreventCallback);

                    /*handlers = jQuery._data(ev.target, "events").click;
                     console.log(handlers)
                     owlStopEvent = handlers.pop();
                     console.log(owlStopEvent)
                     handlers.splice(0, 0, owlStopEvent);
                     console.log(handlers)*/

                }
                swapEvents("off");
            }

            //base.$elem : 캐러셀 대상 dom
            //드래그 이벤트 시작 dragStart()로 ㄱㄱ
            angular.element(base.$elem[0].querySelector(".owl-wrapper")).on(base.ev_types.start, dragStart);
        }

        function getNewPosition() {
            var newPosition = closestItem();

            if (newPosition > base.maximumItem) {
                base.currentItem = base.maximumItem;
                newPosition = base.maximumItem;
            } else if (base.newPosX >= 0) {
                newPosition = 0;
                base.currentItem = 0;
            }
            return newPosition;
        }

        function closestItem() {
            var array = base.options.scrollPerPage === true ? base.pagesInArray : base.positionsInArray,
                goal = base.newPosX,
                closest = null;

            angular.forEach(array, function (v, i) {
                if (goal - (base.itemWidth / 20) > array[i + 1] && goal - (base.itemWidth / 20) < v && moveDirection() === "left") {
                    closest = v;
                    if (base.options.scrollPerPage === true) {
                        base.currentItem = base.positionsInArray.indexOf(closest);
                    } else {
                        base.currentItem = i;
                    }
                } else if (goal + (base.itemWidth / 20) < v && goal + (base.itemWidth / 20) > (array[i + 1] || array[i] - base.itemWidth) && moveDirection() === "right") {
                    if (base.options.scrollPerPage === true) {
                        closest = array[i + 1] || array[array.length - 1];
                        base.currentItem = base.positionsInArray.indexOf(closest);
                    } else {
                        closest = array[i + 1];
                        base.currentItem = i + 1;
                    }
                }
            });
            return base.currentItem;
        }

        function moveDirection() {
            var direction;
            if (base.newRelativeX < 0) {
                direction = "right";
                base.playDirection = "next";
            } else {
                direction = "left";
                base.playDirection = "prev";
            }
            return direction;
        }

        function disabledEvents() {
            base.$elem.on("dragstart", function (event) {
                event.preventDefault();
            });
            base.$elem.on("mousedown", function (e) {
                if (e.target.tagName === ('INPUT' || 'TEXTAREA' || 'SELECT' || 'OPTION')) {
                    return false
                }
            });
        }

        function stopOnHover() {
            if (base.options.stopOnHover === true && base.browser.isTouch !== true && base.options.autoPlay !== false) {
                base.$elem.on("mouseover", function () {
                    stop();
                });
                base.$elem.on("mouseout", function () {
                    if (base.hoverStatus !== "stop") {
                        play();
                    }
                });
            }
        }

        function owlStatus() {
            base.owl = {
                "userOptions": base.userOptions,
                "baseElement": base.$elem,
                "userItems": base.$userItems,
                "owlItems": base.$owlItems,
                "currentItem": base.currentItem,
                "prevItem": base.prevItem,
                "visibleItems": base.visibleItems,
                "isTouch": base.browser.isTouch,
                "browser": base.browser,
                "dragDirection": base.dragDirection
            };
        }

        function play() {
            base.apStatus = "play";
            if (base.options.autoPlay === false) {
                return false;
            }
            $interval.cancel(base.autoPlayInterval);
            base.autoPlayInterval = $interval(function () {
                next(true);
            }, base.options.autoPlay);
            $scope.$on("$destroy", function () {
                    $interval.cancel(base.autoPlayInterval);
                }
            );
        }

        function watchVisibility() {//visible 체크
            if (base.$elem.find("div")[0].offsetWidth === 0) {
                base.$elem.css({opacity: 0});
                $interval.cancel(base.autoPlayInterval);
                $interval.cancel(base.checkVisible);
            } else {
                return false;
            }
            base.checkVisible = $interval(function () {
                if (base.$elem.find("div")[0].offsetWidth !== 0) {
                    reload();
                    var animator = $animateCss(base.$elem, {
                        to: {opacity: 1},
                        duration: 0.2
                    });
                    animator.start();
                    animator = null;
                    $interval.cancel(base.checkVisible);
                }
            }, 500);
        }

        function updatePosition() {
            jumpTo(base.currentItem);
            if (base.options.autoPlay !== false) {
                checkAp();
            }
        }

        function checkAp() {//stop을 눌렀는지 안 눌렀는지 체크
            if (base.apStatus !== "stop") {
                play();//넘버에 맞게 next()메소드 인터벌
            }
        }

        function eachMoveUpdate() {//이동 후 각 이벤트 업데이트(레이지로드, 오토헤이트)
            if (base.options.lazyLoad === true) {
                lazyLoad();
            }
            if (base.options.autoHeight === true) {
                autoHeight();
            }
            onVisibleItems();//addClassActive가 true일 경우 현재 보여지는 아이템에 activate설정, 현재 보여지는 아이템들 배열 설정

            if (typeof base.options.afterAction === "function") {//이동 후 function 설정하였다면 실행
                base.options.afterAction.apply(this, [base.$elem]);
            }
        }

        function onVisibleItems() {//addClassActive가 true일 경우 현재 보여지는 아이템에 activate설정, 현재 보여지는 아이템들 배열 설정
            var i;

            if (base.options.addClassActive === true) {
                base.$owlItems.removeClass("active");
            }
            base.visibleItems = [];
            for (i = base.currentItem; i < base.currentItem + base.options.items; i += 1) {
                base.visibleItems.push(i);

                if (base.options.addClassActive === true) {
                    $(base.$owlItems[i]).addClass("active");
                }
            }
            base.owl.visibleItems = base.visibleItems;
        }

        function reload() {
            $timeout(function () {
                updateVars();
            })
        }

        function goTo(position, speed, drag) {//아이템 이동
            var goToPixel;

            if (base.isTransition) {// -노파악
                return false;
            }
            if (typeof base.options.beforeMove === "function") {//이동 전에 이벤트를 걸어주기 위해 beforeMove에 함수를 선언해줬을 경우
                base.options.beforeMove.apply(this, [base.$elem]);//해당함수에 this와 대상 dom 바인딩
            }

            //postion 설정
            if (position >= base.maximumItem) {//이동할 위치를 나타내는 position가 최대치 아이템의 인덱스보다 클 경우
                position = base.maximumItem;//postion을 최대치 아이템의 인덱스로 설정
            } else if (position <= 0) {
                position = 0;//0보다 작을 경우 0으로 설정
            }

            base.currentItem = base.owl.currentItem = position;//현재 아이템의 인덱스를 position으로 설정

            //transitionStyle을 설정하고 아이템이 하나일 때
            if (base.options.transitionStyle !== false && drag !== "drag" && base.options.items === 1 && base.browser.support3d === true) {
                swapSpeed(0);
                if (base.browser.support3d === true) {
                    base.transition3d(base.positionsInArray[position]);
                } else {
                    base.css2slide(base.positionsInArray[position], 1);
                }
                afterGo();
                singleItemTransition();
                return false;
            }

            goToPixel = base.positionsInArray[position];//위치값이 담긴 배열에서 움직이고자 하는 아이템의 인덱스를 찾아 이동할 위치 설정

            if (base.browser.support3d === true) {//translate3d를 지원할 경우
                base.isCss3Finish = false;

                //타입별 스피드 적용
                if (speed === true) {
                    swapSpeed("paginationSpeed");
                    $timeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.paginationSpeed);

                } else if (speed === "rewind") {
                    swapSpeed(base.options.rewindSpeed);
                    $timeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.rewindSpeed);
                } else {
                    swapSpeed("slideSpeed");
                    $timeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.slideSpeed);
                }
                transition3d(goToPixel);//$owlWrapper에 translate3d 적용(해당 위치로)
            } else {//transition3d를 지원하지 않을 경우 jquery메소드 이용
                if (speed === true) {
                    css2slide(goToPixel, base.options.paginationSpeed);
                } else if (speed === "rewind") {
                    css2slide(goToPixel, base.options.rewindSpeed);
                } else {
                    css2slide(goToPixel, base.options.slideSpeed);
                }
            }
            afterGo();//이동 후 행동들 설정
        }

        function jumpTo(position) {
            if (typeof base.options.beforeMove === "function") {
                base.options.beforeMove.apply(this, [base.$elem]);
            }
            if (position >= base.maximumItem || position === -1) {
                position = base.maximumItem;
            } else if (position <= 0) {
                position = 0;
            }
            swapSpeed(0);
            if (base.browser.support3d === true) {
                transition3d(base.positionsInArray[position]);
            } else {
                css2slide(base.positionsInArray[position], 1);
            }
            base.currentItem = base.owl.currentItem = position;
            afterGo();//이동 후 행동들 설정
        }

        function afterGo() {//이동 후 행동들 설정
            base.prevArr.push(base.currentItem);//이전 버튼을 위해 현 위치 임시 저장
            base.prevItem = base.owl.prevItem = base.prevArr[base.prevArr.length - 2];//첫 번째 요소 추출하여 이전버튼 위치 설정
            base.prevArr.shift(0);//배열의 첫번째 요소 삭제하여 저장한 현재 위치가 다음 이동시 이전 버튼 위치로 설정되도록 한다.

            if (base.prevItem !== base.currentItem) {//현재 아이템과 이전 아이템이 다를 경우
                checkPagination();//페이지네이션 activate 갱신
                checkNavigation();//네비게이션 버튼 disabled 갱신
                eachMoveUpdate();//이동 후 각 이벤트 업데이트(레이지로드, 오토헤이트)

                if (base.options.autoPlay !== false) {//autoPlay가 설정되어 있을 경우
                    checkAp();//stop을 눌렀는지 안 눌렀는지 체크
                }
            }
            if (typeof base.options.afterMove === "function" && base.prevItem !== base.currentItem) {
                base.options.afterMove.apply(this, [base.$elem]);
            }
        }

        function swapSpeed(action) {//owlWrapper에 스피드 타입별 적용
            if (action === "slideSpeed") {
                base.$owlWrapper.css(addCssSpeed(base.options.slideSpeed));
            } else if (action === "paginationSpeed") {
                base.$owlWrapper.css(addCssSpeed(base.options.paginationSpeed));
            } else if (typeof action !== "string") {
                base.$owlWrapper.css(addCssSpeed(action));
            }
        }

        function addCssSpeed(speed) {//스피드 메소드
            return {
                "-webkit-transition": "all " + speed + "ms ease",
                "-moz-transition": "all " + speed + "ms ease",
                "-o-transition": "all " + speed + "ms ease",
                "transition": "all " + speed + "ms ease"
            };
        }

        function transition3d(value) {//$owlWrapper에 translate3d 적용
            base.$owlWrapper.css(doTranslate(value));
        }

        function doTranslate(pixels) {//translate3d css 설정
            return {
                "-webkit-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "transform": "translate3d(" + pixels + "px, 0px,0px)"
            };
        }

        function removeTransition() {
            return {
                "-webkit-transition": "",
                "-moz-transition": "",
                "-o-transition": "",
                "transition": ""
            };
        }

        function css2slide(value, speed) {
            base.isCssFinish = false;
            //TODO - $elementCss로 바꾸자
            var animator = $animateCss(base.$owlWrapper, {
                to: {
                    "left": value + "px"
                },
                duration: speed || base.options.slideSpeed,
                end: function () {
                }
            });
            animator.start().finally(function () {
                base.isCssFinish = true;
            });
            animator = null;
        }

        function css2move(value) {
            base.$owlWrapper.css({"left": value + "px"});
        }

        function checkBrowser() {//브라우저 검사, 각 브라우저 체크에서 터치 하는지 아닌지 체크하는 놈?
            var translate3D = "translate3d(0px, 0px, 0px)",
                tempElem = angular.element('<div/>')[0],
                regex,
                asSupport,
                support3d,
                isTouch;
            tempElem.style.cssText = "  -moz-transform:" + translate3D +
                "; -ms-transform:" + translate3D +
                "; -o-transform:" + translate3D +
                "; -webkit-transform:" + translate3D +
                "; transform:" + translate3D;
            regex = /translate3d\(0px, 0px, 0px\)/g;
            asSupport = tempElem.style.cssText.match(regex);
            support3d = (asSupport !== null && asSupport.length === 1);//translate3d 지원 여부

            isTouch = "ontouchstart" in window || window.navigator.msMaxTouchPoints;
            /*console.log(support3d + ", " + isTouch);*/
            base.browser = {
                "support3d": support3d,
                "isTouch": isTouch
            };
        }

        function baseClass() {//테마를 위한 기본옵션에 의한 클래스 설정
            var hasBaseClass = base.$elem.hasClass(base.options.baseClass),
                hasThemeClass = base.$elem.hasClass(base.options.theme);

            if (!hasBaseClass) {
                base.$elem.addClass(base.options.baseClass);
            }

            if (!hasThemeClass) {
                base.$elem.addClass(base.options.theme);
            }
        }

        function eventTypes() {//환경 설정에 따른 이벤트 타입 설정
            var types = ["s", "e", "x"];

            base.ev_types = {};

            if (base.options.mouseDrag === true && base.options.touchDrag === true) {
                types = [
                    "touchstart mousedown",
                    "touchmove mousemove",
                    "touchend touchcancel mouseup"
                ];
            } else if (base.options.mouseDrag === false && base.options.touchDrag === true) {
                types = [
                    "touchstart",
                    "touchmove",
                    "touchend touchcancel"
                ];
            } else if (base.options.mouseDrag === true && base.options.touchDrag === false) {
                types = [
                    "mousedown",
                    "mousemove",
                    "mouseup"
                ];
            }

            base.ev_types.start = types[0];
            base.ev_types.move = types[1];
            base.ev_types.end = types[2];
        }

        function getWindow(elem) {
            return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
        }

        function isWindow(obj) {
            return obj != null && obj === obj.window;
        }

        function nodeName(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        }

        function owl_offsetParent(el) {
            var offsetParent = el[0].offsetParent || window.document.documentElement;
            return angular.element(offsetParent);
        }

        function owl_offset(el) {
            var docElem, win,
                elem = el[0],
                box = {top: 0, left: 0},
                doc = elem && elem.ownerDocument;
            if (!doc) {
                return;
            }

            docElem = doc.documentElement;

            // Support: BlackBerry 5, iOS 3 (original iPhone)
            // If we don't have gBCR, just use 0,0 rather than error
            if (typeof elem.getBoundingClientRect !== undefined) {
                box = elem.getBoundingClientRect();
            }
            win = getWindow(doc);

            return {
                top: box.top + win.pageYOffset - docElem.clientTop,
                left: box.left + win.pageXOffset - docElem.clientLeft
            };
        }

        function owl_postion(el) {
            if (!el[0]) {
                return;
            }

            var offsetParent, offset,
                elem = el[0],
                parentOffset = {top: 0, left: 0};

            // Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
            if (angular.element(elem).css("position") === "fixed") {
                // Assume getBoundingClientRect is there when computed position is fixed
                offset = elem.getBoundingClientRect();

            } else {
                // Get *real* offsetParent
                offsetParent = owl_offsetParent(el);

                // Get correct offsets
                offset = owl_offset(el);
                if (!nodeName(offsetParent[0], "html")) {
                    parentOffset = owl_offset(offsetParent);
                }

                // Add offsetParent borders
                if (window.jQuery) {
                    parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
                    parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
                } else {
                    parentOffset.top += Number(offsetParent.css("borderTopWidth"));
                    parentOffset.left += Number(offsetParent.css("borderLeftWidth"));
                }
            }

            // Subtract parent offsets and element margins
            if (window.jQuery) {
                return {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
                };
            } else {
                return {
                    top: offset.top - parentOffset.top - Number(angular.element(elem).css("marginTop")),
                    left: offset.left - parentOffset.left - Number(angular.element(elem).css("marginLeft"))
                };
            }
        }
    }
})(window, window.angular);
