var configs = [
	{source:'dentim1B-line-RC1-src',layerId:'blue.fill',data:'./maps/thoatnuoc2023/Thoatnuoc2023.bue.fi.geojson',type:'fill',paint:{'fill-color':"#40fe10"},layout:{}},
	{source:'denle-tw2-line-src',layerId:'red.line',data:'./maps/thoatnuoc2023/Thoatnuoc2023.red.ine.geojson',type:'line',paint:{'line-color':"#f93e3e",'line-width':3,'line-opacity':1},layout:{}},
	{source:'dentim1B-line-RC2-src',layerId:'blue.line',data:'./maps/thoatnuoc2023/Thoatnuoc2023.bue.ine.geojson',type:'line',paint:{'line-color':"#fbdc13",'line-width':2,'line-opacity':1},layout:{}},
	{source:'dentim1B-line-Dist-src',layerId:'cyan.line',data:'./maps/thoatnuoc2023/Thoatnuoc2023.cyan.ine.geojson',type:'line',paint:{'line-color':"#17deb6",'line-width':3,'line-opacity':1},layout:{}},
	{source:'denle-r1-line-src',layerId:'gray.line',data:'./maps/thoatnuoc2023/Thoatnuoc2023.gray.ine.geojson',type:'line',paint:{'line-color':"#879b97",'line-width':3,'line-opacity':1},layout:{}},
	{source:'denle-r1-tx-src',layerId:'green.line',data:'./maps/thoatnuoc2023/Thoatnuoc2023.green.ine.geojson',type:'line',paint:{'line-color':"#54f225",'line-width':3,'line-opacity':1},layout:{}},
	{source:'denle-r2-tx-src',layerId:'orange.line',data:'./maps/thoatnuoc2023/Thoatnuoc2023.orange.ine.geojson',type:'line',paint:{'line-color':"#e7a15a",'line-width':3,'line-opacity':1},layout:{}},	
	//Credit to: https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/?q=text-fields%20formula&size=n_20_n
	//Credit to: https://docs.mapbox.com/studio-manual/examples/convert-units/
	{source:'denle-tw1-tx-src',layerId:'red.fill.tx',data:'./maps/thoatnuoc2023/Thoatnuoc2023.red.fi.tx.geojson',type:'fill',paint:{'fill-color':"#f93e3e"},layout:{}},	
	// {source:'denle-tw2-tx-src',layerId:'Tw2-tx',data:'./maps/thoatnuoc2023/Thoatnuoc2023.wh.fi.arrow.geojson',type:'fill',paint:{'fill-color':"#40fe10"},layout:{}},
	{source:'denle-tw3-line-src',layerId:'white.fill',data:'./maps/thoatnuoc2023/Thoatnuoc2023.wh.fi.geojson',type:'fill',paint:{'fill-color':"#40fe10"},layout:{}},
	{source:'denle-tw3-tx-src',layerId:'white.big',data:'./maps/thoatnuoc2023/Thoatnuoc2023.wh.ine.big.geojson',type:'line',paint:{'line-color':"#ffffff",'line-width':3,'line-opacity':1},layout:{}},
	{source:'denle-tw4-line-src',layerId:'white.line.hoga',data:'./maps/thoatnuoc2023/Thoatnuoc2023.wh.ine.hoga.geojson',type:'line',paint:{'line-color':"#fbdc13",'line-width':3,'line-opacity':1},layout:{}},
	{source:'denle-tw4-tx-src',layerId:'white.line',data:'./maps/thoatnuoc2023/Thoatnuoc2023.wh.ine.geojson',type:'line',paint:{'line-color':"#ff2e2e",'line-width':3,'line-opacity':1},layout:{}},
	{source:'denle-tw5-line-src',layerId:'white.line.le',data:'./maps/thoatnuoc2023/Thoatnuoc2023.wh.ine.le.geojson',type:'line',paint:{'line-color':"#ffffff",'line-width':3,'line-opacity':1},layout:{}},
	{source:'denle-tw5-tx-src',layerId:'white.line.sk',data:'./maps/thoatnuoc2023/Thoatnuoc2023.wh.ine.sk.vachDungCho.geojson',type:'line',paint:{'line-color':"#f01919",'line-width':3,'line-opacity':1},layout:{}},	
	{source:'denle-tw6-tx-src',layerId:'yellow.fill',data:'./maps/thoatnuoc2023/Thoatnuoc2023.ye.fi.vachSonVang.geojson',type:'fill',paint:{'fill-color':"#40fe10"},layout:{}},
	{source:'denle-tw7-line-src',layerId:'yellow.line',data:'./maps/thoatnuoc2023/Thoatnuoc2023.ye.ine.vachSonVang.geojson',type:'line',paint:{'line-color':"#fbdc13",'line-width':3,'line-opacity':1},layout:{}},
	{source:'denle-r2-line-src',layerId:'green.tx',data:'./maps/thoatnuoc2023/Thoatnuoc2023.green.tx.geojson',type:'symbol',paint:{'text-color':"#5ae75f",'text-opacity':1,'text-halo-color':'#ffffff','text-halo-width':2},layout:{'text-size':16,'text-transform':'uppercase','text-field':["to-string",["get","name"]]},minzoom:5},
	{source:'denle-tw1-line-src',layerId:'orange.tx',data:'./maps/thoatnuoc2023/Thoatnuoc2023.orange.tx.geojson',type:'symbol',paint:{'text-color':"#e48f3a",'text-opacity':1,'text-halo-color':'#ffffff','text-halo-width':2},layout:{'text-size':16,'text-transform':'uppercase','text-field':["to-string",["get","name"]]},minzoom:16},
	{source:'denle-tw6-line-src',layerId:'white.line.tx',data:'./maps/thoatnuoc2023/Thoatnuoc2023.wh.ine.tx.geojson',type:'line',paint:{'line-color':"#329ea8",'line-width':3,'line-opacity':1},layout:{}}
	];

var configIdList = null;

mapConfigOnLoad=(map)=>{
	configIdList = configs.map(config=>{
		map.addSource(config.source,{"type": "geojson",data: config.data});
    	map.addLayer({id:config.layerId,type: config.type,source: config.source,paint: config.paint,layout: config.layout,minzoom:config.minzoom?config.minzoom:10 });
		map.setLayoutProperty(config.layerId,'visibility','visible')
    	return config.layerId;
    });
}