

var uiReady = false;
//Credit to:https://stackoverflow.com/questions/8835413/difference-between-load-vs-domcontentloaded

document.addEventListener('DOMContentLoaded', function() {
  logF(checkLocalStorage);
  logF(initFirebaseApp,{callback:()=>{logF(apiDriveUploadCheckAccessToken);logF(initScriptUI);uiReady=true;}});

  registerUIEvents();
 
  // setInterval(function(){
  //  loadMapPermissionCodeAndDataFromServer();
  // },600000);
  logF(mapPage.initMap);
});
 
initShortcut=()=>{
  // initFabShortcut=(classListName)=>{let elm = document.getElementsByClassName(classListName)[0];elm.click();elm.children[0].click();}
  // shortcut.add("Ctrl+d",()=>{initFabShortcut("btn-floating red del")})
  // shortcut.add("Ctrl+k",()=>{initFabShortcut("btn-floating blue edit")})
  // shortcut.add("Ctrl+l",()=>{initFabShortcut("btn-floating red set")})
}
initScriptUI=()=>{logF(initShortcut);}

