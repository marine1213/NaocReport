	dataToMem=()=>{
		console.error("TODO: dataToMem");
		// if(mainData.support.storage && mainData.flags.loadCache){mainData.hash=localGet('hash');var t=localGet('hocvienList');mainData.hocvienList=JSON.parse(t?t:'[]');}

		// mainData.db.getDB({id:'all',type:'student'}).then(snap=>{
		// 	var c=[],d=[];snap.forEach(doc=>{c.push(doc.data());d.push(doc.id)});mainData.hocvienList=c;mainData.nangdinhList = valuesGrouping(mainData.hocvienList,'nangdinh');
		// 	mainData.hocvienListId=d;
		// 	repairUndefinedHocvienOb();
	 //  	}).catch(mainData.db.genericError);

		// mainData.db.getDB({id:'all',type:'course'}).then(snap=>{
		// 	var c=[],d=[];snap.forEach(doc=>{c.push(doc.data());d.push(doc.id)});mainData.courseList=c;logF(memToUi);logF(overlayHiddenAll);
		// 	mainData.courseListId=d;
		// }).catch(mainData.db.genericError);
	}
	
	memToUi=()=>{console.error("TODO: dataToMem"); }//logE('sidebarAddGroup()');sidebarAddGroup(mainData.hocvienList);logF(updateListDulieu);logF(loadStaffList);}

	loadStaffList=()=>{
		if(staffListReady) return;
		var url=`${appscriptConfig.userUrl}?action=getList`;
		logE('getList+user:'+url);
		callGasApi(url,true).then(gasApiCb).then(response=>{
			logE('getList User Ok:')
			staffListReady = true;
			mainData.staffList=mapJsonValue(response.header,decompressSheetValues(response.values));
			// mainData.staffAutoList=mainData.staffList.map(item=>item.hoten); //TODO: viet lai
			mainData.staff = staffGrouping(mainData.staffList);
			logF(initAutoList);logF(initAutoQuyenxemcongviec);
		},er=>alertEr('GasApiError',er));
	}
	
	onItemGetUI=(p)=>{// get data from input //send to gas //add to mainData // update main ui mainData.hocvienList.push(p);
		p.elm.disabled=true;
		var ext=p.index==-1?'':p.index, action=p.index==-1?'create':'edit';
		var idElmList=['idMaAcv','idHoten','idChucdanh','idDonvi','idVitriCongtac','idSoHoso'];
		const {vals,idxs}=macroTagActiveGetValues(idElmList,ext,p,1);
		if(idxs[0].length!=1) {alert('Lỗi: Chưa nhập Mã ACV!!'); p.elm.disabled=false;return;}

		var nangdinhList = macroNangdinhListGetValues(['idNagdinhTitle','idNgaythi','idThoihanFrom','idThoihanTo'],['ten','ngaythi','thoihan.den','thoihan.tu'],'nangdinhItem',p);
		if(flagInputErr) {alert('Lỗi: Chưa nhập hết các ô!!'); p.elm.disabled=false;return;}

		var fileList=getFileUploadedIdList(p).split(',');

		hvItm = mainData.staffList[mainData.staff.idxs[mainData.view.state].MaAcv[idxs[0]]];
		logE(hvItm);logE(fileList);
		logE(nangdinhList);
		var homnay=getToday();
		var queryData={
			// 	nguoigui:{hoten:mainData.user.hoten,maAcv:mainData.user.maAcv},
			// ngaygui:homnay,  // 04/10/2020
			id:{docId:hvItm.hoten+'-'+hvItm.maAcv,maAcv:hvItm.maAcv},
			canhan:{hoten:hvItm.hoten,donviCongtac:hvItm.donvi,vitriCongtac:vals[4],soHoso:vals[5],img:fileList?fileList[0]:undefined},
			donvi:{ten:hvItm.donvi,madonvi:hvItm.madonvi},
			nangdinh:nangdinhList,
			congviec:[],
			coban:[],
			taicho:[],
			tags:'',
			suco:[],
			nhanxet:{noidung:''},
			hlvien:[],
		};
		
		// if(action=='create') queryData.giaoviec.ngaygiao = getDateJSON(homnay); // {full:'04/10/2020',short:'04/10'}
		var searchInMem = mainData.hocvienList.filter(item=>item.id?item.id.docId==queryData.id.docId:false);

		if(searchInMem.length > 0) 
			alert('Đã có đối tượng trong danh sách!');
		else if(searchInMem.length == 0)
			mainData.db.updateDB({id:queryData.id.docId,type:'student',action:'add'},queryData);
		else if(searchInMem.length < -1)
			alert('Lỗi index, không tìm thấy trong danh sách!');

	    logF(dataToMem);
	      // return form to first state
		p.elm.disabled=false;
		idElmList.forEach((k,idx)=>{
	      	p.elm.form[k+ext].value = ''; if(idx==0) p.elm.form[k+ext].disabled = false;
	      	Array.from(p.elm.form.getElementsByClassName(k.replace('id','class')+'TagActive')).forEach(elm=>{elm.parentElement.parentElement.remove()})
	    });
	    Array.from(p.elm.form.getElementsByClassName('flexThumbnailContainer')).forEach(elm=>{elm.innerHTML=''});
	}

	searchForCourse=(courseId)=>mainData.courseList.reduce((last,course)=>course.id.docId==courseId?course:last,undefined);
	
	//=========================== idAddForm =========================

	getValueNestedObject=(key,ob)=>{var dotIdx = key.search('\\.'),subKey = dotIdx>-1?key.substring(0,dotIdx):null;return subKey?getValueNestedObject(key.substring(dotIdx+1),ob[subKey]):(ob[key]?trimImgName(key,ob[key]):'');}
	trimImgName=(key,value)=>{if(key!='img') return value; var gId = value.split('?')[0]; return gId.length>0?'https://drive.google.com/open?id='+value:''};
	getExportHocvienData=(data)=>
		// iterate all sheetKeys
		wsheets.key.reduce((sOut,sk,kIdx)=>{
			//  iterate all data row in indicated item
			sOut[wsheets.name[kIdx]]=data.reduce((dOut,item)=>{ 
				item[sk]?item[sk].forEach((elmData,itIdx)=>{
					var row={STT:dOut.length+1,'Mã ACV':item.id.maAcv,'Họ và tên':item.canhan.hoten};
					if(sk=='taicho'){
						var course=searchForCourse(elmData.linked);
						row = cols['taichoLinked'].key.reduce((cOut,ck,ckIdx)=>{cOut[cols['taichoLinked'].name[ckIdx]]=getValueNestedObject(ck,course.thongtinchung);return cOut;},row);
					}
					
					//iterate all keys of data
					row = cols[sk].key.reduce((cOut,ck,ckIdx)=>{cOut[cols[sk].name[ckIdx]]=getValueNestedObject(ck,elmData);return cOut;},row)
					dOut.push(row);  
				}):'';
				return dOut;
			},[]);
			return sOut;  
		},{'Danh sách':getBaseHocvienList(data)});
	

	//Credit to: https://github.com/SheetJS/sheetjs/tree/master/dist
	exportHocvienData=(data,fileName)=>{
		var adaptedData = getExportHocvienData(data);
	    var wb = XLSX.utils.book_new();

		Object.keys(adaptedData).forEach(sheetName=>{
			var ws = XLSX.utils.json_to_sheet(adaptedData[sheetName],sheetName);
		    XLSX.utils.book_append_sheet(wb, ws, sheetName);
		});   
	    XLSX.writeFile(wb, fileName+".xlsx");
	}
