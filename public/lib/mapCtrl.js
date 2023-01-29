	//================================map control===============================
	var config={bearing:17,coorL:'[105.80615562601713, 21.218605193793564]',coorM:'[105.8043684, 21.2140661]',mapboxStyle:'mapbox://styles/cuongbk56/cl6m1rma1000g14nfwqczpex5',mapboxAccessToken:'pk.eyJ1IjoiY3VvbmdiazU2IiwiYSI6ImNqeHJzbWJxbDBjY3Yzb241aWY1Nmt6OG0ifQ.98MN1Dl1vrRJKbnkZTnxbQ'}
	var mapPage = function(){

	  var publicData = {};
	  var loadedPopupList = [];
	  var currentMarker = {lMarker:null};
	  var lastMarkerFlag = false;
	    
	  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);        
	  // Credit to: https://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript

	  
	//  var coorM = [105.8043684, 21.2140661]; //NB
	//  var coorL = [105.80615562601713, 21.218605193793564]; //NB
	  
	  var coorM = JSON.parse(config.coorM);
	  var coorL = JSON.parse(config.coorL);
	  
	  var centerCoor = w<751?coorM:coorL;
	  var zoomlv = w < 449?12:w < 751?13:14;

	  // GeoJSON object to hold the flag features
	  var geojson = {"type": "FeatureCollection","features": []};
	  
	  var map = new mapboxgl.Map({
	      container: 'map',
	      style: config.mapboxStyle,
	     // style: 'mapbox://styles/iyalolo/cjzvyworg0c921cpbga1xmdn6', //Mapbox DenKB
	      center: centerCoor,
	      zoom: zoomlv, // starting zoom
	     maxBounds: [[105.749537,21.188519],[105.892,21.274]],
	      // bearing: parseInt(config.bearing),
	     bearing: config.bearing, // goc nghieng
	     accessToken: config.mapboxAccessToken,
	      // accessToken: 'pk.eyJ1IjoiaXlhbG9sbyIsImEiOiJjamZ0dGg0YWwwbW8zMzNxa3RyM3U2YjN2In0.RZ0yJN-V8GbpPclRSIg_sw'
	    });
	    
	  //Credit to: https://docs.mapbox.com/mapbox-gl-js/example/navigation/
	  var geoLocOption = {
	    positionOptions: {enableHighAccuracy:true,timeout:10000},
	    fitBoundsOptions: {maxZoom: 19},
	    trackUserLocation: true
	  };
	  var geoLocControl = new mapboxgl.GeolocateControl(geoLocOption);
	  geoLocControl.on('geolocate', onLocationFound);
	  
	    // Add zoom and rotation controls to the map.
	  map.addControl(new mapboxgl.NavigationControl(),'top-left');
	  map.addControl(new mapboxgl.FullscreenControl(), 'top-left');
	  map.addControl(geoLocControl,'top-left');
	  
	  
	//==========private===============
	  //Register map events
	  
	    map.on('click', onMapClicked);
	    map.on('moveend', function(e){
	      // load data(coordinate, ten tam, su co, ngay) từ spreadsheet// theo vung zoom nhìn thấy
	      // add marker theo coordinate
	      // add popup theo onclick
	      // loadMapPermissionCodeAndDataFromServer();
	      
	    });
	    map.on('click','suco-flag', function(e){
	     // xoa popup truoc
	     if(loadedPopupList.length > 0)
	       loadedPopupList.pop().remove();
	     
	     var coordinates = e.features[0].geometry.coordinates.slice();
	     var markerData = e.features[0].properties;
	     
	     var loadedPopup = new mapboxgl.Popup({offset:[10,-30], closeOnClick:false, anchor:'bottom' })
	     .setLngLat(coordinates)
	     .setHTML(markerData.popupContent)
	     .on('open',function(popup){
	         // //log.event('onPopupData', 'loading image'); //TODO: put data into geojson
	         
	         if(markerData.imageList){
	           var imgList = JSON.parse(markerData.imageList);  //sửa lỗi mảng JSON
	           for(var imgId = 0; imgId < imgList.length; imgId++){
	             var fileId = imgList[imgId];
	             var imageLink = form.getImgLinkData(fileId);
	             document.getElementById('img_'+fileId).src = imageLink;
	           } 
	         }
	     })
	     .on('close',function(popup){
	         loadedPopupList.pop();
	         //Credit to: https://stackoverflow.com/questions/3455405/how-do-i-remove-a-key-from-a-javascript-object
	     });
	     
	     loadedPopupList.push(loadedPopup);
	     loadedPopup.addTo(map);
	   });
	 	map.on('mouseenter', 'suco-flag', function(e) {
		  // Change the cursor style as a UI indicator.
		  map.getCanvas().style.cursor = 'pointer';
		});
		 
		map.on('mouseleave', 'suco-flag', function() {
		  map.getCanvas().style.cursor = '';
		});
	    map.on('load', function() {
	        // //log.event('maploaded','add layer suco with data source');
			map.addSource('geojson', {"type": "geojson","data": geojson});
	        map.addLayer({
	          id: 'suco-flag',
	          type: 'symbol',
	          source: 'geojson',
	          layout: {
	             "icon-image": "{icon}-30",
	             "icon-allow-overlap": true,
	             "icon-anchor": "bottom-left"
	          }
	       });
	   });
	//==========public===============      
	  publicData.initMap = function(){
	    if (!mapboxgl.supported()) 
	      alert('Your browser does not support Mapbox GL');
	  }
	  
	  publicData.flyTo=(lng,lat)=>{map.flyTo({
	  	zoom: 22,
		speed: 0.8,
		curve: 1,
	  	center:[lng, lat]
	  }); }

	  publicData.addMarker = function(lat,lng,markerProperties){
	    // //log.event('mapAddMarker','callback add marker');
	    var pointJSON = {
	      type: "Feature",
	      geometry: {
	        type: "Point",
	        coordinates: [lng,lat]
	      },
	      properties: markerProperties
	    };
	    geojson.features.push(pointJSON);
	    log.value('mapAddMarker', 'JSON: ' + JSON.stringify(geojson.features));
	  }
	  
	  publicData.updateSource = function(){
	    if(map&&geojson)
	      map.getSource('geojson').setData(geojson);
	  }
	  publicData.removeMarker = function(tileName){
	    // xoa marker 
	    //log.event('remove marker','remove marker id= '+ tileName);
	    loadedPopupList.pop().remove();
	    geojson.features = geojson.features.filter(function(flag) {
	      return flag.properties.tileName !== tileName;
	    });
	  }
	  
	  publicData.removeAllMarkers = function(){
	    // xoa marker 
	    //log.event('remove marker','remove all markers');
	    if(loadedPopupList.length > 0)
	      loadedPopupList.pop().remove();
	    geojson.features = geojson.features.filter(function() {return false;});
	  }  

	  var stateHolding = 0;
	  publicData.onAddDataMarker = function(lat,lng,notOpenCollector) {
	    // xoa marker cũ
	    if(lastMarkerFlag)
	      removeLastMarker();
	      
	      
	    // thêm marker mới và mở form nhập
	    var tempMarker = new mapboxgl.Marker({draggable:true}).setLngLat([lng,lat]).addTo(map);
	    tempMarker.on('dragstart', function(){ 
	      var lngLat = currentMarker.lMarker.getLngLat(); 
	      stateHolding = 0;
	      setTimeout(function(){ if(stateHolding == 0) {currentMarker.lMarker.prevLngLat = lngLat;  currentMarker.lMarker.setLngLat(lngLat); stateHolding = 1;}},10000);
	    });
	    tempMarker.on('dragend', function(){ 
	      if(stateHolding == 1)
	        {currentMarker.lMarker.setLngLat(currentMarker.lMarker.prevLngLat); }
	      var lngLat = currentMarker.lMarker.getLngLat();
	      collectData(lngLat.lat,lngLat.lng);
	      stateHolding = 2;
	    });
	    currentMarker.lMarker = tempMarker;
	    lastMarkerFlag = true;

	    if(notOpenCollector) return;
	    collectData(lat,lng);
	  }
	  
	  publicData.onQueryRenderedFeatures = function(e){
	    return map.queryRenderedFeatures(e.point);
	  }
	//=====private data process=======
	function collectData(lat,lng) {
	  form.setLatLng(lat,lng);
	  
	  // smoth openning popup
	  setTimeout(function() {
	  	openOverlayForm(true,-1);
	  }, 100);
	}

	  function removeLastMarker(){currentMarker.lMarker.remove();}
	      return publicData;
	}();

	  function onLocationFound(position){
	    var geoData = {
	      lat: position.coords.latitude,
	      lng: position.coords.longitude,
	      accuracy: position.coords.accuracy,
	    }
	    log.value('onLocationFound','timestamp: '+ position.timestamp + '\n coor:'+JSON.stringify(geoData));
	    // xóa marker cũ, thêm marker mới và mở form nhập
	    mapPage.onAddDataMarker(geoData.lat, geoData.lng, true);
	  }

	   function onMapClicked(e){     
	     // log.event('onMapClicked', 'add pointing marker');
	     try{
	       if(e != undefined){
	         var features = mapPage.onQueryRenderedFeatures(e);
	         if(features.length){ // neu click vao co thi ko phan ung alert(JSON.stringify(features));
	         }
	         else  // xóa marker cũ, thêm marker mới và mở form nhập
	          mapPage.onAddDataMarker(e.lngLat.lat,e.lngLat.lng);
	       }
	     }catch(error){
	         // log.error('mapClick',error);
	     }
	   }
	//============================end========================================