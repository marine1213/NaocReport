//==================log==================
var log = function(){
  var publicData = {};
  
  //=======private function========
  function logMethod(logString){
    alert(logString);
  }
  
  //=======public function========
  publicData.event = function(tag, eventString){
//    logMethod('Event: '+ tag + ' - ' +eventString);
  }
  
  publicData.value = function(tag, valueString){
//    logMethod('Value: '+ tag + ' - ' + valueString);
  }
  
  publicData.error = function(tag, errorString){
    logMethod('Error: '+ tag + ' - ' + errorString);
  }  
  return publicData;
}();