var dropDown=function(){
	var publicData = {elm:{},data:{}};
	init=()=>{Array.from(document.getElementsByClassName('dropdown')).forEach(elm=>{publicData.elm[elm.id]=elm}); return publicData;}
	publicData.show=(dropDownId)=>publicData.elm[dropDownId].getElementsByClassName('dd-menu')[0].style.display='block';
	publicData.hide=(dropDownId)=>publicData.elm[dropDownId].getElementsByClassName('dd-menu')[0].style.display='none';
	publicData.get=function(dropDownId){ var subPublicData = {}; subPublicData.setData=(arrayInput)=>{ if(!Array.isArray(arrayInput)) throw 'Input is not an Array!'; publicData.data[dropDownId]=arrayInput; update(dropDownId);}; return subPublicData; };

	update=(dropDownId)=>{
		if(!publicData.data[dropDownId]) throw `Data at ${dropDownId} is empty!`;
		let outputHTML = publicData.data[dropDownId].reduce((out,ob)=>{out+=`<li onclick="">${ob.tx?ob.tx:ob}</li>`; return out;},'');
		publicData.elm[dropDownId].getElementsByClassName('dd-menu')[0].innerHTML = outputHTML;
	}
	return init();
}();