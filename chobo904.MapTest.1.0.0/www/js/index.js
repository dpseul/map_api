
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
		// back버튼 이벤트 추가
		document.addEventListener("backbutton", function(e){
			var pageId = $(".ui-page-active").attr("id");
			if(pageId == "page1" || pageId == "page2" || pageId == "page3"){
				if(confirm("앱을 종료하시겠습니까?")){
					e.preventDefault();	
					navigator.app.exitApp();
				}
			}

		}, false);
		
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);

		navigator.geolocation.getCurrentPosition(this.onMapSuccess.bind(this), this.onMapError, { enableHighAccuracy: true });
		//navigator.geolocation.watchPosition(this.onMapWatchSuccess, this.onMapError, { enableHighAccuracy: true });
		
		$(document).on("pagebeforeshow","#page1",function(event){	// 네이버맵 페이지 열 때마다 실행
			this.getMap1(Latitude, Longitude);
		}.bind(this));
		
		$(document).on("pagebeforeshow","#page2",function(event){	// 카카오맵 페이지 열 때마다 실행
			this.getMap2(Latitude, Longitude);
		}.bind(this));
		
		$(document).on("pagebeforeshow","#page3",function(event){	// 구글맵 페이지 열 때마다 실행
			this.getMap3(Latitude, Longitude);
		}.bind(this));
    },
	
	onMapSuccess: function (position) {	// 현재 위치 지정후 지도 호출
		Latitude = position.coords.latitude;
		Longitude = position.coords.longitude;

		this.getMap1(Latitude, Longitude);
	},
	
	onMapWatchSuccess: function (position) {	// 주기적으로 위치 확인 후 현재 위치가 바뀌면 지도 호출용
		var updatedLatitude = position.coords.latitude;
		var updatedLongitude = position.coords.longitude;

		if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

			Latitude = updatedLatitude;
			Longitude = updatedLongitude;

			this.getMap1(updatedLatitude, updatedLongitude);
		}
	},
	
	getMap1: function (latitude, longitude) {	// 네이버 지도 가져오기
		if(map1 == undefined){
			var mapOptions = {
				useStyleMap: true,	// 새버전 사용옵션
				center: new naver.maps.LatLng(37.3595704, 127.105399),
				zoom: 0,	// 0~21
				mapTypeId: naver.maps.MapTypeId.NORMAL,
/*
				scaleControl: false,	// 지도 축척 컨트롤의 표시 여부입니다.
				mapDataControl: true,	// 지도 데이터 저작권 컨트롤의 표시 여부입니다.
				zoomControl: true,	// 줌 컨트롤의 표시 여부입니다.
				mapTypeControl: true	// 지도 유형 컨트롤의 표시 여부입니다.
*/
			};

			map1 = new naver.maps.Map(document.getElementById("map1"), mapOptions);
		}

		var latLong = new naver.maps.LatLng(latitude, longitude);
		
		var marker = new naver.maps.Marker({
			position: latLong
		});
		
		marker.setMap(map1);
		map1.setZoom(17);
		map1.setCenter(marker.getPosition());

	},
	
	getMap2: function (latitude, longitude) {	// 카카오 지도 가져오기
		if(map2 == undefined){
			var mapOptions = {
				center: new kakao.maps.LatLng(0, 0),
				level: 1,	//	SKYVIEW, HYBRID 일 경우 0 ~ 14, ROADMAP 일 경우 1 ~ 14.
				mapTypeId: kakao.maps.MapTypeId.ROADMAP
			};

			map2 = new kakao.maps.Map(document.getElementById("map2"), mapOptions);
		}

		var latLong = new kakao.maps.LatLng(latitude, longitude);
		
		var marker = new kakao.maps.Marker({
			position: latLong
		});
		
		marker.setMap(map2);
		map2.setLevel(5);
		map2.setCenter(marker.getPosition());
/*		
		var mapTypeControl = new kakao.maps.MapTypeControl();	// 지도 타입 변경 컨트롤을 생성한다
		map2.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);	// 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
		var zoomControl = new kakao.maps.ZoomControl();	// 지도에 확대 축소 컨트롤을 생성한다
		map2.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);	// 지도의 우측에 확대 축소 컨트롤을 추가한다
*/
	},
	
	getMap3: function (latitude, longitude) {	// 구글맵 가져오기
		if(map3 == undefined){
			var mapOptions = {
				center: new google.maps.LatLng(0, 0),
				zoom: 1,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
/*
				zoomControl: false,	// 확대 축소 컨트롤을 제거한다.
				scaleControl: true,	// 지도 축척 컨트롤을 표시한다.
				mapTypeControl: false,	// 지도 타입 변경 컨트롤을 제거한다.
				streetViewControl: false,	// 거리 보기 컨트롤을 제거한다.
				rotateControl: false,	// 지도 회전해서 보기 컨트롤을 제거한다.
				fullscreenControl: false	// 전체 화면으로 보기 컨트롤을 제거한다.
*/
			};

			map3 = new google.maps.Map(document.getElementById("map3"), mapOptions);
		}

		var latLong = new google.maps.LatLng(latitude, longitude);
		
		//var marker = new google.maps.Marker({position: latLong, map: map3});
		var marker = new google.maps.Marker({
			position: latLong
		});
		
		marker.setMap(map3);
		map3.setZoom(15);
		map3.setCenter(marker.getPosition());

	},

	onMapError: function (error) {	// 위치정보 호출 오류 시 메세지 출력
		alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	},

};

var Latitude, Longitude;	// 위도, 경도 (지도상의 위치)
var map1, map2, map3;	// 각각 네이버 지도, 카카오 지, 구글 맵 가져올 곳

app.initialize();