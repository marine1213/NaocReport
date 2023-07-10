var configs = [
	{source:'dentim1B-line-RC1-src',layerId:'1B-lineRC1',data:'./maps/dentim1B-line-RC1.geojson',type:'line',paint:{'line-color':"#40fe10",'line-width':2,'line-opacity':1},layout:{}},
	{source:'dentim1B-line-RC2-src',layerId:'1B-lineRC2',data:'./maps/dentim1B-line-RC2.geojson',type:'line',paint:{'line-color':"#fbdc13",'line-width':2,'line-opacity':1},layout:{}},
	{source:'dentim1B-line-Dist-src',layerId:'1B-lineDist',data:'./maps/dentim1B-line-distribution.geojson',type:'line',paint:{'line-color':"#363030",'line-width':3,'line-opacity':1},layout:{}},
	{source:'denle-r1-line-src',layerId:'R1',data:'./maps/denle-r1.geojson',type:'line',paint:{'line-color':"#00ffff",'line-width':3,'line-opacity':1},layout:{}},
	{source:'denle-r1-tx-src',layerId:'R1-tx',data:'./maps/denle-r1-tx.geojson',type:'symbol',paint:{'text-color':"#fbdc13",'text-opacity':1,'text-halo-color':'#ffffff','text-halo-width':2},layout:{'text-size':16,'text-field':["to-string",["get","name"]]},minzoom:16},
	{source:'denle-r2-line-src',layerId:'R2',data:'./maps/denle-r2.geojson',type:'line',paint:{'line-color':"#558855",'line-width':3,'line-opacity':1},layout:{}},
	{source:'denle-r2-tx-src',layerId:'R2-tx',data:'./maps/denle-r2-tx.geojson',type:'symbol',paint:{'text-color':"#ff1113",'text-opacity':1,'text-halo-color':'#ffffff','text-halo-width':2},layout:{'text-size':16,'text-field':["to-string",["get","name"]]},minzoom:16},
	{source:'denle-tw1-line-src',layerId:'Tw1',data:'./maps/denle-tw1.geojson',type:'line',paint:{'line-color':"#ff2e2e",'line-width':3,'line-opacity':1},layout:{}},
	//Credit to: https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/?q=text-fields%20formula&size=n_20_n
	//Credit to: https://docs.mapbox.com/studio-manual/examples/convert-units/
	{source:'denle-tw1-tx-src',layerId:'Tw1-tx',data:'./maps/denle-tw1-tx.geojson',type:'symbol',paint:{'text-color':"#fbdc13",'text-opacity':1,'text-halo-color':'#ff2e2e','text-halo-width':2},layout:{'text-size':16,'text-field':["to-string",["get","name"]]},minzoom:16},
	{source:'denle-tw2-line-src',layerId:'Tw2',data:'./maps/denle-tw2.geojson',type:'line',paint:{'line-color':"#5126fd",'line-width':3,'line-opacity':1},layout:{}},
	{source:'denle-tw2-tx-src',layerId:'Tw2-tx',data:'./maps/denle-tw2-tx.geojson',type:'symbol',paint:{'text-color':"#fbdc13",'text-opacity':1,'text-halo-color':'#5126fd','text-halo-width':2},layout:{'text-size':16,'text-field':["to-string",["get","name"]]},minzoom:16},
	{source:'denle-tw3-line-src',layerId:'Tw3',data:'./maps/denle-tw3.geojson',type:'line',paint:{'line-color':"#329ea8",'line-width':3,'line-opacity':1},layout:{}},
	{source:'denle-tw3-tx-src',layerId:'Tw3-tx',data:'./maps/denle-tw3-tx.geojson',type:'symbol',paint:{'text-color':"#fbdc13",'text-opacity':1,'text-halo-color':'#329ea8','text-halo-width':2},layout:{'text-size':16,'text-field':["to-string",["get","name"]]},minzoom:16},
	{source:'denle-tw4-line-src',layerId:'Tw4',data:'./maps/denle-tw4.geojson',type:'line',paint:{'line-color':"#fbdc13",'line-width':3,'line-opacity':1},layout:{}},
	{source:'denle-tw4-tx-src',layerId:'Tw4-tx',data:'./maps/denle-tw4-tx.geojson',type:'symbol',paint:{'text-color':"#fbdc13",'text-opacity':1,'text-halo-color':'#ffffff','text-halo-width':2},layout:{'text-size':16,'text-field':["to-string",["get","name"]]},minzoom:16},
	{source:'denle-tw5-line-src',layerId:'Tw5',data:'./maps/denle-tw5.geojson',type:'line',paint:{'line-color':"#5126fd",'line-width':3,'line-opacity':1},layout:{}},
	{source:'denle-tw5-tx-src',layerId:'Tw5-tx',data:'./maps/denle-tw5-tx.geojson',type:'symbol',paint:{'text-color':"#5126fd",'text-opacity':1,'text-halo-color':'#5126fd','text-halo-width':2},layout:{'text-size':16,'text-field':["to-string",["get","name"]]},minzoom:16},
	{source:'denle-tw6-line-src',layerId:'Tw6',data:'./maps/denle-tw6.geojson',type:'line',paint:{'line-color':"#329ea8",'line-width':3,'line-opacity':1},layout:{}},
	{source:'denle-tw6-tx-src',layerId:'Tw6-tx',data:'./maps/denle-tw6-tx.geojson',type:'symbol',paint:{'text-color':"#fbdc13",'text-opacity':1,'text-halo-color':'#329ea8','text-halo-width':2},layout:{'text-size':16,'text-field':["to-string",["get","name"]]},minzoom:16},
	{source:'denle-tw7-line-src',layerId:'Tw7',data:'./maps/denle-tw7.geojson',type:'line',paint:{'line-color':"#fbdc13",'line-width':3,'line-opacity':1},layout:{}},
	{source:'denle-tw7-tx-src',layerId:'Tw7-tx',data:'./maps/denle-tw7-tx.geojson',type:'symbol',paint:{'text-color':"#5126fd",'text-opacity':1,'text-halo-color':'#fbdc13','text-halo-width':2},layout:{'text-size':16,'text-field':["to-string",["get","name"]]},minzoom:16},
	{source:'denle-tw8-line-src',layerId:'Tw8',data:'./maps/denle-tw8.geojson',type:'line',paint:{'line-color':"#ff2e2e",'line-width':3,'line-opacity':1},layout:{}},
	{source:'denle-tw8-tx-src',layerId:'Tw8-tx',data:'./maps/denle-tw8-tx.geojson',type:'symbol',paint:{'text-color':"#fbdc13",'text-opacity':1,'text-halo-color':'#ff2e2e','text-halo-width':2},layout:{'text-size':16,'text-field':["to-string",["get","name"]]},minzoom:16},
	{source:'denle-tw9-line-src',layerId:'Tw9',data:'./maps/denle-tw9.geojson',type:'line',paint:{'line-color':"#329ea8",'line-width':3,'line-opacity':1},layout:{}},
	{source:'denle-tw9-tx-src',layerId:'Tw9-tx',data:'./maps/denle-tw9-tx.geojson',type:'symbol',paint:{'text-color':"#fbdc13",'text-opacity':1,'text-halo-color':'#ffffff','text-halo-width':2},layout:{'text-size':16,'text-field':["to-string",["get","name"]]},minzoom:16},
	{source:'denle-tw10-line-src',layerId:'Tw10',data:'./maps/denle-tw10.geojson',type:'line',paint:{'line-color':"#fbdc13",'line-width':3,'line-opacity':1},layout:{}},
	{source:'denle-tw10-tx-src',layerId:'Tw10-tx',data:'./maps/denle-tw10-tx.geojson',type:'symbol',paint:{'text-color':"#fbdc13",'text-opacity':1,'text-halo-color':'#ffffff','text-halo-width':2},layout:{'text-size':16,'text-field':["to-string",["get","name"]]},minzoom:16},
	];

var configIdList = null;

mapConfigOnLoad=(map)=>{
	configIdList = configs.map(config=>{
		map.addSource(config.source,{"type": "geojson",data: config.data});
    	map.addLayer({id:config.layerId,type: config.type,source: config.source,paint: config.paint,layout: config.layout,minzoom:config.minzoom?config.minzoom:10 });
		map.setLayoutProperty(configs.layerId,'visibility','visible')
    	return config.layerId;
    });
}