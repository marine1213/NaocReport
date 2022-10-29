var loadedData = [];
//============================form control========================================

var form = (function(){
   // main properties
   var publicData = {};
   var imgLinkData = [];
   var permissionCode = [0,0,0];
   
   // form properties
   var data;
   var lat,lng;
   var userName, userEmail, userInfo;
   
   //===========private function==============
  sendData=()=>{ mainData.db.add(data);// google.script.run.withSuccessHandler(formSubmitted).writeForm(data);  
  }
   
  updateData=()=>{}
   //===========public function===============
   publicData.setUserInfo=(newUserInfo)=>{userName = newUserInfo.hoten; userEmail = newUserInfo.email; userInfo = newUserInfo; }
   publicData.getUserInfo=()=>userInfo;
   
   publicData.setPermissionCode=(newPcode)=>{permissionCode = newPcode;}
   publicData.getPermissionCode=()=>permissionCode;
   publicData.setLatLng=(newlat,newlng)=>{lat = newlat; lng = newlng;}

   publicData.setData=(status, emergencyLevel, repairedMethod, fileId,size,tileName, detail)=>{
     let date = new Date(); fmDate = getFmDateTime(date);   // chuyển Object Date về dạng String 
     // '?' giúp tăng số last row lên, nếu để trống, dòng này coi như không có mới
     // data = ['?', date, lat+'', lng+'', tileName, status, emergencyLevel, repairedMethod, fileId, '',size, detail,userName, userEmail];
     data={
      id:getFmDateTime(date,'yyyymmdd','hhmiss.ms','_'),
      timestamp:fmDate,
      lat:lat+'', lng:lng+'', name:tileName, status:status, level:emergencyLevel, recovered:repairedMethod, 
      img:fileId, size:size, detail:detail, 
      user:userName, email: userEmail
     }
   }
   
   publicData.getData=()=> data;
   publicData.getImgLinkData=(id)=>imgLinkData[id];
   publicData.setImgLinkData=(id, item)=>{imgLinkData[id] = item};
   
   publicData.sendDataWithFile=(inData,file)=>{
      showMessage("Đang đọc ảnh...");
      publicData.inputData = inData;
     
     //<!-- File reader --> TODO: upload drive
     return new Promise(function(){
       var reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onloadend = function(e) { 
         showMessage('Đang gửi ảnh...'); 
         if (e.target.error != null) { showError("Có lỗi khi đọc " + file.name + ": " + e.target.error); } 
         else { google.script.run.withSuccessHandler(onFileTransmittingSucces).uploadFileToGoogleDrive(e.target.result, file.name); } 
       };
     });
    }
      
   publicData.sendDataToDB = function(inData){
    showMessage('Đang gửi thông tin...');
    
    // var colCode = { timestamp:0, lat:1, lng:2, posName:3, posEvent:4, posEmergencyLvl:5, posRecovered:6, posImg:7, posSize:9, posDescription:10, userName:11, userEmail:12, };
    if(inData.buttonId == -1){ // thêm sự cố mới
      //param: status,fileId,tileName,tileSize,detail
      this.setData(inData.status,inData.emergencyLevel,'-', inData.fileId,inData.tileSize,inData.tileLocation,inData.description); 
    }else{
      //status != 'Đã xử lý xong'(báo đã xong)
      let item = loadedData.find(currentItem=>{return currentItem.id == inData.buttonId});
      // logE(item);
      // logE(inData);
      this.setLatLng(item.lat, item.lng);
      this.setData(inData.status,item.level,inData.doneStatus,inData.fileId,inData.tileSize,item.name,inData.description)
    }
    sendData();
  }
  
  publicData.sendDoneToSheet = function(buttonId){ 
    sendData();
  }
   //===========event handle function============
   
   function formSubmitted(status) { // sẽ được gọi khi form được mở ra
     showMessage(status); //displays in item with the 'output' id
     logE('form is submitted');
     //TODO: firestore
     // google.script.run.withSuccessHandler(loadedDataFromSheet) 
     //  .loadDataFromSpreadSheet(loadedData); 
   }
   
   function onFileTransmittingSucces(e) { 
     showMessage('Đã gửi ảnh xong.');
     //Gửi ảnh xong thì lấy thông tin để vào form
     publicData.inputData.fileId = e;
     publicData.sendDataToDB(publicData.inputData);
   }
   //============================================
   return publicData;
   
})();
//============================end========================================
//=================Event Handler Data Handler===========================
function formSubmitting(event){
  event.preventDefault();      // ngăn tạo trang trắng
      
  onValidateInputData().then(function(inputData) {
    
    return onValidateFile().then(function(file){
      resetInputForm();
      closeOverlayForm();
      // form.sendDataWithFile(inputData,file);
    },function(error){
      if(error.length == 0){
        resetInputForm();
        closeOverlayForm();
        inputData.fileId = '';
        form.sendDataToDB(inputData);
      }
      else
        showError(error);
    });
  },function(error) {
    showError(error);
  });
  
}
function onValidateInputData(){ // các trường bắt buộc phải có
  return new Promise(function(resolve, reject){
    var radio_status_checking = $("#form_radio_status_checked").val();
    var radio_emergency_level_checking = $("#form_radio_emergency_level_checked").val();
    var done_radio_checking = $("#form_done_radio_checked").val();
  
    if(radio_status_checking == 'init')
      return reject('Loại sự cố (nứt vỡ,...) phải được chọn!');//return ;
  
    if(radio_status_checking != 'Đã xử lý xong' && radio_emergency_level_checking == 'init')
      return reject('Mức độ nguy hiểm phải được chọn!');
      
    if(radio_status_checking == 'Đã xử lý xong' && done_radio_checking == 'init')
      return reject('Phương pháp xử lý phải được chọn!');
    
    var inputTextChecking = $("#form_location").val();
    var buttonId = $('#form_button').val();
  
    if(buttonId == -1){ //status != 'Đã xử lý xong'(báo đã xong)/sự cố khác(thêm sự cố mới)
      var text = inputTextChecking.split(';');
      var tileNameChecking = text[0];
      if(tileNameChecking.length == 0)
        return reject('Vị trí sự cố không được để trống!');
    }
    var inputData = {
      status:$("#form_radio_status_checked").val(),
      emergencyLevel:$("#form_radio_emergency_level_checked").val(),
      doneStatus:$("#form_done_radio_checked").val(),
      tileLocation:$("#form_location").val(),
      
      buttonId:$('#form_button').val(),
      description:$("#form_text").val(),
      tileSize:$("#form_size").val()
    }
    return resolve(inputData);
  });
}
function onValidateFile(){
  return new Promise(function(resolve, reject){
    var files = $('#files_input')[0].files;
    
    if (files.length == 0) {
      return reject('');
    }
  
    var file = files[0];
    if (file.size > 1024 * 1024 * 7) {
      return reject("Chỉ hỗ trợ upload ảnh nhỏ hơn 7MB!");
    }
    
    return resolve(file);
  });
}
//========================================================================    
   //TODO: doi icon cho data marker:DONE
   //TODO: bat popup xem thong tin:DONE
   //TODO: hien thi nhieu su co tren 1 tam:DONE
   //TODO: hien thi anh tren popup:DONE
   //TODO: them chuc nang bao da xong:DONE
   function loadedDataFromSheet(snapList){
     log.event('loadedDataFromSheet','Data loaded from Firestore');
     let imgIdList = [];
     let idx = 0;
     var colCode = { timestamp:0, lat:1, lng:2, posName:3, posEvent:4, posEmergencyLvl:5, posRecovered:6, posImg:7, posSize:9, posDescription:10, userName:11, userEmail:12, };

    snapList.forEach((doc)=>{
      let popupContent;
      let markerProperties = {id: doc.id.replace(' ','_')};
      let docData = doc.data();
      docData.id = docData.id.replace(' ','_');
      loadedData[idx++] = docData;
   
      logE('loadedDataFromDB',JSON.stringify(doc.data()) );
      let emergencyLv = 9;
      switch(docData.level){ 
        case 'Rất nguy hiểm':   markerProperties.icon = 'flag-red'; break; 
        case 'Nguy hiểm':       markerProperties.icon = 'flag-yellow'; break; 
        case 'Ít nguy hiểm':    markerProperties.icon = 'flag-green'; break; 
      }

      popupContent = "<div><strong>"+docData.name+"</strong>";
      popupContent += "<br>"+docData.timestamp+' - '+docData.status;
      popupContent += "<br>Mô tả: "+docData.detail;
      popupContent += "<br>Kích thước: "+docData.size;
      popupContent += "<br>Mức độ: "+ docData.level;
//          popupContent += "<br>Người gửi: "+ docData.user;
//          popupContent += "<br>Email: "+ docData.email;
      if(docData.img.length > 0 && docData.img[0] != 1){       
        var hrefLink = 'https://drive.google.com/open?id='+docData.img;
        // Credit to: https://www.w3schools.com/html/html_images.asp
        // Credit to: https://www.w3schools.com/tags/att_a_target.asp
        var errorString = "'Lỗi hiển thị, ấn vào dòng này để xem ảnh'"
        popupContent += "<br><a href="+hrefLink+" target=\"_blank\"><img id=img_"+docData.img+" alt="+errorString+"  style='max-width:9s0px;max-height:110px;width:auto;height:auto;'></a>";
        // Credit to: https://stackoverflow.com/questions/12991351/css-force-image-resize-and-keep-aspect-ratio 
        
        imgIdList.push(docData.img); // dùng để load tất cả link ảnh ở cuối hàm
        
        (markerProperties.imageList = markerProperties.imageList||[]).push(docData.img); // dùng để lấy ảnh khi có click vào cờ         
      }
      let pCode = form.getPermissionCode();
      if(pCode.code[2] == 1){
        // Them button
        popupContent += `<br><button type='button' id=-1 onclick=\'openOverlayForm(false,"${markerProperties.id}");\'>Báo đã xử lý xong</button></br>`;
      }

      markerProperties.popupContent = popupContent;
      markerProperties.name = name;
      
      // moi id duoc luu la duy nhat trong list da duoc group -> chi danh cho cac truong hop truoc sau
        logE('Add marker '+docData.name);  // Day la id cua marker moi --> them marker
        try{
          mapPage.addMarker(parseFloat(docData.lat),parseFloat(docData.lng),markerProperties);
        }catch(error){
          logE('add marker error', error.toString());
        }
    });

    // update data voi map moi
    if(mapPage)
      mapPage.updateSource();
    getDriveImgLink(imgIdList);
  }
function getDriveImgLink(imgIdList){
    //TODO: upload drive
    imgIdList.forEach(imgId=>{
      let url = `https://drive.google.com/thumbnail?authuser=0&sz=w240&id=${imgId}`;
      form.setImgLinkData(imgId, imageLink);
    })
}



function genId(timestamp){
  var id = timestamp.replace(/\.|\/|\:|\ /gi, '');;
  return id;
}

function loadUserInfo(){
  form.setUserInfo(mainData.user);
  logF(loadMapPermissionCodeAndDataFromServer);
}

function onGetPermissionCodeSuccess(pcode){
    if(form.getPermissionCode().code) {
      var diff = form.getPermissionCode().code.filter(function(v,id){ return(pcode.code[id]!=v);});
      if(diff.length > 0){
        mapPage.removeAllMarkers();
      }
    }
    pcode.code = [1,1,1];//key
    form.setPermissionCode(pcode);
    if(pcode.error)
      log.error('onGetPermissionCodeSuccess',pcode.error);
    else
      log.value('onGetPermissionCodeSuccess',JSON.stringify(pcode));
    loadSavedDataFromSheet();
}

function loadMapPermissionCodeAndDataFromServer(){
  onGetPermissionCodeSuccess({code:[1,1,1]});
   // google.script.run.withSuccessHandler(onGetPermissionCodeSuccess)
   //  .getMapPermissionCode(form.getUserInfo()); 
}

function loadSavedDataFromSheet(clearAll){
   if(clearAll)
     loadedData.length = 0;
   mainData.db.getActive(loadedDataFromSheet);
   // google.script.run.withSuccessHandler(loadedDataFromSheet)
   //  .loadDataFromSpreadSheet(loadedData);     
}