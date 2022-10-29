var appscriptConfig = {
  userUrl:'https://script.google.com/macros/s/AKfycbxBeG7SIkZb5wR-vzTvBepIxgfD1WIkmK4SbHKFuMZs2F7AO_x7/exec',
}
callGasApi=(url,isJson)=>new Promise(dataCb=>{fetch(url).then(r=>(r.ok)?isJson?r.json():r.blob():alertEr(NetEr,'GasApi')).then(dataCb).catch(er=>alertEr(FetchEr,er));})
gasApiCb=data=>new Promise((dataCb,errorCb)=>(data.status==false||data.message.error != undefined)?errorCb(data.message):dataCb(data.message))

compressSheetValues=arrayInput=>JSON.stringify(arrayInput).replace(/,""/g,'~').replace(/,"/g,'`');
decompressSheetValues=stringifyInput=>JSON.parse(stringifyInput.replace(/~/g,',""').replace(/`/g,',"'));

dateShort=(inputDate)=>inputDate?inputDate.slice(0,inputDate.lastIndexOf('/')):'';
formatDateForId=(date,delimiter)=>date?mergeStr(date.getFullYear())((1 + date.getMonth()).toString().padStart(2,'0'))(date.getDate().toString().padStart(2,'0'))(delimiter):undefined;
formatFormDate=(formDateSplitted,delimiter)=>mergeStr(formDateSplitted[0])(formDateSplitted[1])(formDateSplitted[2])(delimiter);
const mergeStr=y=>m=>d=>delimiter=>(delimiter == undefined)?(y + m + d):(typeof delimiter=='string')?d+delimiter+m+delimiter+y:d + '/' + m + '/' + y;

getToday=()=>formatDateForId(new Date(),1);
getTodayJSON=()=>getDateJSON(getToday());

nameShort=(name)=>{var ns=name.split(' '); return (ns.length>1 && ns[0].search(/(Mr)||(Mrs)||(Ms)/i)>-1)?lastWord(name):name}
lastWord=(word)=>word.slice(word.lastIndexOf(' ')+1);

appendLine=(lastLine,nextLine,numOfLines)=>lastLine.length>0?lastLine+'\n'+nextLine:('\n'.repeat(numOfLines)+nextLine);

lookForMadonvi=(tenDonvi)=>obSidebar.data[1].i.reduce((out,item,idx)=>(out==item)?obSidebar.data[1].c[idx]:out,tenDonvi);

getDonvinhanListJSON=(donviIdxList)=>{
	if(donviIdxList.length==0) throw 'Id list is empty - Donvinhan';
	if(donviIdxList.length==1) return getDonvinhanJSON(null,donviIdxList[0]);
	var tenDonvi = '', maDonvi = '';
	donviIdxList.forEach((donviIdx,idx)=>{ tenDonvi+=((idx>0?', ':'')+obSidebar.data[1].i[donviIdx]); maDonvi+=((idx>0?', ':'')+obSidebar.data[1].c[donviIdx])});//PAUSE
	return{ten:tenDonvi,madonvi:maDonvi}
}
getDonvinhanJSON=(name,donviIdxIfExist)=>{
	var viewState = mainData.view.state;
	var tenDonvi = donviIdxIfExist>-1?(mainData.staff.names[viewState=='NAOC'?'BGDKB':viewState].Donvinhan[donviIdxIfExist]):name;
	var maDonvi = lookForMadonvi(tenDonvi);
	return {ten:tenDonvi,madonvi:maDonvi==tenDonvi?'--':maDonvi}
}
getStaffJSON=(staffIdxList, appendedOb)=>{
	if(staffIdxList.length==0) throw 'Id list is empty - Staff';
	var keyList=['hoten','ten','maAcv','madonvi'],tpOb={};// pause adding nameshort
	staffIdxList.forEach(staffId=>{var staffOb=mainData.staffList[staffId];keyList.forEach((k,idx)=>{tpOb[k]=tpOb[k]?tpOb[k]:[];tpOb[k].push(idx==1?nameShort(staffOb.hoten):staffOb[k])});});
	return keyList.reduce((out,k)=>{var tpOut=tpOb[k].join(', '); out[k]=appendedOb?(((appendedOb[k]&&appendedOb[k].length>0)?(appendedOb[k]+'\n'):'')+tpOut):tpOut; return out;},{});
}
getPersonJSON=(name,appendedOb,noLines)=>{
	var staffIdx = mainData.staffList.reduce((out,item,idx)=>(item.hoten==name)?idx:out,-1);
	var staffItem = staffIdx>-1?mainData.staffList[staffIdx]:{maAcv:'',madonvi:''};
	return appendedOb?{hoten:appendLine(appendedOb.hoten,name,noLines),ten:appendLine(appendedOb.ten,nameShort(name,noLines),noLines),maAcv:appendLine(appendedOb.maAcv,staffItem.maAcv,noLines),madonvi:appendLine(appendedOb.madonvi,staffItem.madonvi,noLines)}:
		{hoten:name,ten:nameShort(name),maAcv:staffItem.maAcv,madonvi:staffItem.madonvi};
}
getDateJSON=(dateSlashForm)=>dateSlashForm?{full:dateSlashForm,short:dateShort(dateSlashForm)}:{full:'',short:''}

//function testMapJsonValue(){mapJsonValue(getJsonKey(),openSheet(workSj).getRange(3,1,1,10).getDisplayValues())}
mapJsonValue=(header,values)=>values.map((r)=>r.reduce((l,o,oIdx)=>setValueJson(l,header[oIdx].split('.'),o),{}))
//function testGetJsonKey(){getJsonKey()} - this is header - for gs only
getJsonKey=()=>openSheet(workSj).getRange('2:2').getDisplayValues()[0];
//function testSetValueJson(){var o={};setValueJson(o,['t','k','v'],'8');Logger.log(JSON.stringify(o))}
setValueJson=(ob,keys,value)=>(keys.reduce((o,k,ki)=>k?(o[k]=(ki==keys.length-1)?((k.search(/ngay|thoihan/g)>-1)?{full:value,short:dateShort(value)}:value):(o[k]?o[k]:{})):o,ob)||true)?ob:'';
setTxValueJson=(ob,keys,value)=>(keys.reduce((o,k,ki)=>k?(o[k]=(ki==keys.length-1)?value:(o[k]?o[k]:{})):o,ob)||true)?ob:'';
