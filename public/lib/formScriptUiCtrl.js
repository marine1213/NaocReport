  //<!--Custom Effect: Overlay-->
   function openOverlayForm(showStatus, formButtonVal) {
     document.getElementById("input_form").style.display = "block";
     $("#form_body").show();
     $('#form_output').hide();
     $('#form_button').val(formButtonVal);
     
     if(formButtonVal == -1){ // Nếu chưa có data
       document.getElementById("form_location").placeholder="Ví dụ: 427/31";
     }else{// Nếu đã có rồi tương ứng với id trong mảng đã lưu
       document.getElementById("form_location").placeholder="Mô tả khác...";
     }
     
     if(showStatus == true) { //nếu báo xong, buttonId sẽ khác -1
       $('#form_radio_status_group').show();
       $('#form_radio_done_group').hide();
     }
     else{
       $('#form_radio_status_group').hide();
       $('#form_location_group').hide()
       $('#form_size_group').hide();
       $('#form_radio_done_group').show();     
       $("input[name=nv]").prop('checked', true);
       $('#form_radio_status_checked').val('Đã xử lý xong');
     }
   }
   
   function closeOverlayForm () {
     document.getElementById("input_form").style.display = "none";
   }
   
   function resetInputForm(){
     $(".form-check-input").prop('checked', false);
     $("#form_radio_status_checked").val("init");
     $("#form_done_radio_checked").val("init");
     $("#form_radio_emergency_level_checked").val("init");
     $('#files_input').val("");
//     $('textarea').val("");
   }
   
   function showToast(text) {
     var snackbarStack = [];
     
     var x = document.getElementById("snackbar");
     var snackbarItem = document.createElement("div");
     snackbarItem.innerHTML = text;
     snackbarItem.className = "show snackbar";
     
     snackbarStack.push(snackbarItem);
     // After 3 seconds, remove the show class from DIV
     x.style.display = 'block';
     x.appendChild(snackbarItem);
     setTimeout(function(){ x.removeChild(snackbarStack.shift()); if(snackbarStack.length == 0) {x.style.display = 'hidden';}}, 2900);
   }   
   //===========show function===============
   
   function showError(error){
//     $('#form_output').addClass('red-text').html(error);
     showToast('Lỗi: '+error);
     return false;
   }   
   function showMessage(message){
   //  $('#form_output').show();
//     $('#form_output').removeClass('red-text').html(message);
     showToast(message);
   }
   
   //===========event handle functions============
   function onSlideUpdated(){
     log.event('onSlideUpdated','Slide Updated');
   }
   
   function setSuco(value) {$("#form_radio_status_checked").val(value);}
   function setCongNghe(value) {$("#form_done_radio_checked").val(value);}
   function setMucdo(value) {$("#form_radio_emergency_level_checked").val(value);}
     
   function registerUIEvents(){
     $("input[name=nv]").change(function () {setSuco(this.value);});
     $("input[name=congnghetramva]").change(function () {setCongNghe(this.value);});
     $("input[name=nguyhiem]").change(function () {setMucdo(this.value);});
   }