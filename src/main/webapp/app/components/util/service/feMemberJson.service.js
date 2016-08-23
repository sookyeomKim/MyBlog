/**
 * Created by user on 2016-08-22.
 */
(function (window, angular) {
    "use strict";

    angular
        .module('myBlogApp')
        .factory('FeMemberJson', FeMemberJson);
    function FeMemberJson() {
        var factory = {
            getJson: getJson
        };
        return factory;

        function getJson(joNumber) {
            var json = [
                [{
                    'name': '이민택',
                    'initial': 'lmt',
                    'officeName': '(주)대성쏠라',
                    'officeAddress': '경남 거제시 수양2길 9번지',
                    'hp': '010-3726-1226',
                    'email': 'mintaek2@naver.com'
                }, {
                    'name': '이지선',
                    'initial': 'ljs',
                    'officeName': '주식회사 엘씨벤처스',
                    'officeAddress': '서울 강남구 역삼동 696-20번지 도원빌딩 4층',
                    'hp': '010-2034-2580',
                    'email': '88jisun.lee@gmail.com'
                }, {
                    'name': '노시영',
                    'initial': 'nsy',
                    'officeName': '(주)티에이파트너스',
                    'officeAddress': '서울시 성동구 성수이로 51, 310호(성수동2가, 서울숲한라시그마밸리)',
                    'hp': '010-2293-8064',
                    'email': 'nsy13@naver.com'
                }, {
                    'name': '강한나',
                    'initial': 'khn',
                    'officeName': '아바드㈜',
                    'officeAddress': '경기도 용인시 기흥구 흥덕중앙로 120번 U타워 1404호',
                    'hp': '010-3705-6636',
                    'email': 'silvertter@nate.com'
                }, {
                    'name': '박윤수',
                    'initial': 'pys',
                    'officeName': '주식회사드림온',
                    'officeAddress': '서울시 마포구 월드컵북로396 누리꿈비즈타워11층',
                    'hp': '010-5131-5341',
                    'email': 'ys940917@me.com'
                }, {
                    'name': '황선미',
                    'initial': 'hsm',
                    'officeName': '레드벨벳벤처스',
                    'officeAddress': '서울시 강남구 테헤란로69길 5, 14층',
                    'hp': '010-8921-4060',
                    'email': 'hwangsm2209@naver.com'
                }], [{
                    'name': '전준민',
                    'initial': 'jjm',
                    'officeName': '(주)코소시스코리아',
                    'officeAddress': '서울송파구법원로11길11',
                    'hp': '010-3124-4427',
                    'email': 'joonmin314@naver.com'
                }, {
                    'name': '이근욱',
                    'initial': 'lgw',
                    'officeName': '가가멜소프트',
                    'officeAddress': '서울시 종로구 종로6길 5층 창조경제혁신센터',
                    'hp': '010-5592-2159',
                    'email': 'tootatoota@naver.com'
                }, {
                    'name': '배보아',
                    'initial': 'bba',
                    'officeName': '(주)프리코어',
                    'officeAddress': '경기도 성남시 분당구 판교로 289번길 판교테크노밸리 스타트업 캠퍼스 3동 309호',
                    'hp': '010-4905-4047',
                    'email': 'beaboa0531@naver.com'
                }, {
                    'name': '윤도진',
                    'initial': 'ydj',
                    'officeName': '(주)넥스모어시스템즈',
                    'officeAddress': '서울시 성동구 성수2가 281-20 앰코코리아D동 별관',
                    'hp': '010-6294-6200',
                    'email': 'oky9014@naver.com'
                }, {
                    'name': '김연주',
                    'initial': 'kyj',
                    'officeName': '씨노드',
                    'officeAddress': '인천 연수구 송도미래로 30 송도스마트밸리  D동 2002호',
                    'hp': '010-3726-1226',
                    'email': 'mintaek2@naver.com'
                }], [{
                    'name': '장진웅',
                    'initial': 'jjw',
                    'officeName': '(주)위누',
                    'officeAddress': '서울시 성동구 서울숲길 53, seam office 2층',
                    'hp': '010-7105-6977',
                    'email': 'woongzoo87@gmail.com'
                }, {
                    'name': '김수겸',
                    'initial': 'ksk',
                    'officeName': '주식회사 엘씨벤처스',
                    'officeAddress': '서울 강남구 역삼동 696-20번지 도원빌딩 4층',
                    'hp': '010-3328-8344',
                    'email': 'ikks06luck@naver.com'
                }, {
                    'name': '박상후',
                    'initial': 'psh',
                    'officeName': '씨노드',
                    'officeAddress': '인천 연수구 송도미래로 30 송도스마트밸리  D동 2002호',
                    'hp': '010-7180-7554',
                    'email': 'sanghoo9112@naver.com'
                }, {
                    'name': '조연승',
                    'initial': 'jys',
                    'officeName': '유플리트 주식회사',
                    'officeAddress': '서울시 마포구 잔다리로39 로뎀빌딩 4층',
                    'hp': '010-9275-1806',
                    'email': 'yonseng1218@gmail.com'
                }, {
                    'name': '김서진',
                    'initial': 'ksj',
                    'officeName': '아이비에스',
                    'officeAddress': '대전 유성구 테크로2로 187 미건테크노월드 2차 513호',
                    'hp': '010-2280-0341',
                    'email': 'violet0341@naver.com'
                }], [{
                    'name': '김요섭',
                    'initial': 'kys',
                    'officeName': '(주)코소시스코리아',
                    'officeAddress': '서울송파구법원로11길11',
                    'hp': '010-7624-1014',
                    'email': 'kapooo@naver.com'
                }, {
                    'name': '김창민',
                    'initial': 'kcm',
                    'officeName': '(주)씨드시스템',
                    'officeAddress': '부산 남구 수영로312 21센츄리시티빌딩 909호',
                    'hp': '010-6770-2301',
                    'email': 'rookiezine@naver.com'
                }, {
                    'name': '이찬희',
                    'initial': 'lch',
                    'officeName': '(주)넥스모어시스템즈',
                    'officeAddress': '서울시 성동구 성수2가 281-20 앰코코리아D동 별관',
                    'hp': '010-4343-2036',
                    'email': 'oriole0120@naver.com'
                }, {
                    'name': '이지훈',
                    'initial': 'ljh',
                    'officeName': '(주)플랜잇파트너스',
                    'officeAddress': '서울시 강남구 선릉로90길 70, 인텔빌딩 4층',
                    'hp': '010-7163-9893',
                    'email': 'jh98654@naver.com'
                }, {
                    'name': '이선형',
                    'initial': 'lsh',
                    'officeName': '주식회사 포스젠',
                    'officeAddress': '서울시 마포구 성암로330 DMC첨단산업센터 511호',
                    'hp': '010-6290-0529',
                    'email': 'lsh920529@naver.com'
                }]
            ];

            return json[joNumber]
        }
    }
})(window, window.angular);
