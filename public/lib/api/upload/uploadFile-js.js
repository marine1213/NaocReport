	
	onInitUploadEvent=(className,callback)=>{
		var fileUploadElmList = document.querySelectorAll(className);
		Array.from(fileUploadElmList).forEach(node=>node.addEventListener('change', e => {logE(e);logF(handleFileUpload,e,callback); }));
		//Credit to: https://stackoverflow.com/questions/43113018/javascript-change-event-trigger-multiple-times/43113191
		// callback?alert(callback):'';
	}


	handleFileUpload = (event,callback) => { 
  		const elm = event.target,f=elm.files[0]; 
  		if(elm.files.length==0) return;
  		if(f.size>fSizeLimit){alert('Chỉ chọn được file có kích thước nhỏ hơn 30MB!'); return;}

  		var fs = new FileReader();
  		fs.readAsDataURL(f);
  		var thumbnailParent = elm.parentElement.parentElement.parentElement;
  		var thumbnailElm = thumbnailParent.getElementsByClassName('flexThumbnailContainer')[0]; //the first is the only
		var thumbnailIdx = thumbnailElm.getElementsByClassName('customFileItem').length;
		var origin = thumbnailElm.innerHTML;

		let newName = elm.getAttribute('rename'); 
		newName = newName?(eval(newName)+f.name.substring(f.name.lastIndexOf('.'))):(mainData.user.hoten+'.'+f.name);
		var newNameFile = renameFile(f,newName);

  		fs.onload=(fileEvent)=>{
  			thumbnailElm.innerHTML = origin+`<div class="customFileItem">
									<div class="frameThumbnail">
										<img src="./icons/svg/753/753345.svg" class="closeOnTopThumbnail lv4" onclick="this.parentElement.parentElement.remove(); return false" width="20px">
										<div class="fadeContainer">
											<img width="80px" src="${fileEvent.target.result}" alt="Lỗi Ảnh" class="fadeUnder">
											<div class="lds-spinner fadeAbove" width="80px">
												<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
											</div>
										</div>
									</div>
									<label>${newNameFile.name}</label>
								</div>`;
  		}
  		event.handled = false;
  		if(elm.classList.contains('oneFileOnly') && elm.files.length > 0 ){elm.disabled = true; elm.parentElement.classList.add('hidden');logE('Disabled Upload Button');}

  		postMultipart(newNameFile,localStorage.getItem("accessToken")).then(response=>{fileUploadCompleted(thumbnailParent,newNameFile.name,response.id,thumbnailIdx);
  			callback?callback(`${response.id}?${newNameFile.name}`):null;});

  	}
	
	fileUploadCompleted = (elmParent,fileName,fileId,thumbnailIdx)=>{//add file preview
		var thumbnailElm = elmParent.getElementsByClassName('flexThumbnailContainer')[0]; //the first is the only
		var loadingElm = thumbnailElm.getElementsByClassName('customFileItem')[thumbnailIdx];
		var thumbnailUrl = getThumbnailUrl(fileId), driveUrl = getDriveUrl(fileId);
		replaceLoadedImage=()=>{
			loadingElm.innerHTML = `
				<div class="frameThumbnail">
						<img src="./icons/svg/753/753345.svg" class="closeOnTopThumbnail" onclick="onRemoveFilePreview(this.parentElement.parentElement,'${fileId}')" width="20px">
						<img width="80px" src="${thumbnailUrl}" onclick="window.open('${driveUrl}')" alt="Lỗi Ảnh" >
				</div>
				<label onclick="window.open('${driveUrl}')">${fileName}</label>
				<input type="text" class="hidden fileUploadedId" value="${fileId}?${fileName}">`;
		}
		replaceLoadedImage();
		testImage(thumbnailUrl).then(replaceLoadedImage,()=>{setTimeout(()=>{testImage(thumbnailUrl).then(replaceLoadedImage,replaceLoadedImage);},10000);});

	 	// logE(fileId+' - '+fileName);
	}

	handleFileUploadForSmall = event => {
  		const elm=event.target, f=elm.files[0]; //todo
  		if(elm.files.length==0) return;
  		if(f.size>fSizeLimit){alert('Chỉ chọn được file có kích thước nhỏ hơn 30MB!'); return;}

  		logF(testGetJSON);

  		var fs = new FileReader();
  		fs.readAsDataURL(f);
  		var thumbnailParent = elm.parentElement.parentElement.parentElement;
  		var thumbnailElm = thumbnailParent.getElementsByClassName('flexThumbnailContainerSmall')[0]; //the first is the only
		var thumbnailIdx = thumbnailElm.getElementsByClassName('customFileItemSmall').length;
		var origin = thumbnailElm.innerHTML;
		
		let newName = elm.getAttribute('rename'); newName = newName?(eval(newName)+f.name.substring(f.name.lastIndexOf('.'))):(mainData.user.hoten+'.'+f.name);
		var newNameFile = renameFile(f,newName);
		
  		fs.onload=(fileEvent)=>{
  			thumbnailElm.innerHTML = origin+`<div class="customFileItemSmall">
									<div class="frameThumbnail">
										<img src="./icons/svg/753/753345.svg" class="closeOnTopThumbnail lv4" onclick="this.parentElement.parentElement.remove(); return false" width="20px">
										<div class="fadeContainer">
											<img width="80px" src="${fileEvent.target.result}" alt="Lỗi Ảnh" class="fadeUnder">
											<div class="lds-spinner fadeAbove" width="80px">
												<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
											</div>
										</div>
									</div>
									<label>${newNameFile.name}</label>
								</div>`;
  		}
  		event.handled = false;
  		postMultipart(newNameFile,localStorage.getItem("accessToken")).then((response=>fileUploadCompletedForSmall(thumbnailParent,newNameFile.name,response.id,thumbnailIdx)),(error=>alert(JSON.stringify(error))));
  	}

  	fileUploadCompletedForSmall = (elmParent,fileName,fileId,thumbnailIdx)=>{
		//add file preview
		var thumbnailElm = elmParent.getElementsByClassName('flexThumbnailContainerSmall')[0]; //the first is the only
		var loadingElm = thumbnailElm.getElementsByClassName('customFileItemSmall')[thumbnailIdx];
		var thumbnailUrl = getThumbnailUrl(fileId), driveUrl = getDriveUrl(fileId);

		var inpElm = elmParent.getElementsByClassName('fileUploadInitDetailControl')[0];
		replaceLoadedImage=()=>{
			loadingElm.innerHTML = `<div class="frameThumbnail">
										<img src="./icons/svg/753/753345.svg" class="closeOnTopThumbnail lv4" onclick="onRemoveFilePreview(this.parentElement.parentElement,'${fileId}')" width="20px">
										<img width="80px" src="${thumbnailUrl}" onclick="window.open('${driveUrl}')" alt="Lỗi Ảnh" >
								</div>
								<label onclick="window.open('${driveUrl}')">${fileName}</label>
								<input type="text" name="${inpElm.name}" class="hidden fileUploadedId" value="${fileId}?${fileName}">`;
		}
		replaceLoadedImage();
		testImage(thumbnailUrl).then(replaceLoadedImage,()=>{setTimeout(()=>{testImage(thumbnailUrl).then(replaceLoadedImage,replaceLoadedImage);},10000);});

		var resultElm = elmParent.getElementsByClassName('fileUploadedId')[0];
		eval(inpElm.getAttribute('callback').replace('this','resultElm'));
		
	 	logE(fileId+' - '+fileName);
	}


	onInitUploadEventRemotely=(thisDocument, className)=>{// not used
		var fileUploadElmList = thisDocument.querySelectorAll(className);
		Array.from(fileUploadElmList).forEach(node=>node.addEventListener('change', e => {logE(e);logF(handleFileUploadRemotely,e); }));
		//Credit to: https://stackoverflow.com/questions/43113018/javascript-change-event-trigger-multiple-times/43113191
	}

	handleFileUploadRemotely = event => {
  		const elm = event.target,f=elm.files[0]; 
  		if(elm.files.length==0) return;
  		if(f.size>fSizeLimit){alert('Chỉ chọn được file có kích thước nhỏ hơn 30MB!'); return;}

  		var fs = new FileReader();
  		fs.readAsDataURL(f);
  		var thumbnailParent = elm.parentElement.parentElement.parentElement;
  		var thumbnailElm = thumbnailParent.getElementsByClassName('flexThumbnailContainer')[0]; //the first is the only
		var thumbnailIdx = thumbnailElm.getElementsByClassName('customFileItem').length;
		var origin = thumbnailElm.innerHTML;

		let newName = elm.getAttribute('rename'); newName = newName?(eval(newName)+f.name.substring(f.name.lastIndexOf('.'))):(mainData.user.hoten+'.'+f.name);
		
		var newNameFile = renameFile(f,newName);

  		fs.onload=(fileEvent)=>{
  			thumbnailElm.innerHTML = origin+`<div class="customFileItem">
									<div class="frameThumbnail">
										<img src="./icons/svg/753/753345.svg" class="closeOnTopThumbnail lv4" onclick="this.parentElement.parentElement.remove(); return false" width="20px">
										<div class="fadeContainer">
											<img width="80px" src="${fileEvent.target.result}" alt="Lỗi Ảnh" class="fadeUnder">
											<div class="lds-spinner fadeAbove" width="80px">
												<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
											</div>
										</div>
									</div>
									<label>${newNameFile.name}</label>
								</div>`;
  		}
  		event.handled = false;
  		if(elm.classList.contains('oneFileOnly') && elm.files.length > 0 ){elm.disabled = true; elm.parentElement.classList.add('hidden');logE('Disabled Upload Button');}

  		postMultipart(newNameFile,localStorage.getItem("accessToken")).then(response=>fileUploadCompletedRemotely(thumbnailParent,newNameFile.name,response.id,thumbnailIdx));

  	}
	
	fileUploadCompletedRemotely = (elmParent,fileName,fileId,thumbnailIdx)=>{//add file preview
		var thumbnailElm = elmParent.getElementsByClassName('flexThumbnailContainer')[0]; //the first is the only
		var loadingElm = thumbnailElm.getElementsByClassName('customFileItem')[thumbnailIdx];
		var thumbnailUrl = getThumbnailUrl(fileId), driveUrl = getDriveUrl(fileId);

		var inpElm = elmParent.getElementsByClassName('fileUploadInitDetailControl')[0];
		replaceLoadedImage=()=>{
			loadingElm.innerHTML = `
				<div class="frameThumbnail">
					<img src="./icons/svg/753/753345.svg" class="closeOnTopThumbnail" onclick="window.opener.onRemoveFilePreview(this.parentElement.parentElement,'${fileId}')" width="20px">
					<img width="80px" src="${thumbnailUrl}" onclick="window.open('${driveUrl}')" alt="Lỗi Ảnh" >
				</div>
				<label onclick="window.open('${driveUrl}')">${fileName}</label>
				<input type="text" name="${inpElm.name}" class="hidden fileUploadedId" value="${fileId}?${fileName}">`;
		}
		replaceLoadedImage();
		testImage(thumbnailUrl).then(replaceLoadedImage,()=>{setTimeout(()=>{testImage(thumbnailUrl).then(replaceLoadedImage,replaceLoadedImage);},10000);});

		var resultElm = elmParent.getElementsByClassName('fileUploadedId')[0];
		eval(inpElm.getAttribute('callback').replace('this','resultElm'));
	 	// logE(fileId+' - '+fileName);
	}

	onRemoveFilePreview=(parentElm,fileId)=>{var elm=null; if(elm=parentElm.parentElement.parentElement.getElementsByClassName('oneFileOnly')[0]){elm.disabled = false; elm.parentElement.classList.remove('hidden');logE('Enabled Upload Button'); parentElm.remove();deleteFile(fileId,localStorage.getItem('accessToken'));}return false;}

	getThumbnailUrl=(fileId)=>`${DRIVE_THUMBNAIL}&sz=w80&id=${fileId}`;
	getViewUrl=(fileId)=>`${DRIVE_THUMBNAIL}&sz=w1200&id=${fileId}`;

	getDriveUrl=(fileId)=>`${DRIVE_OPEN}id=${fileId}`;

	getFileUploadedIdList=(p)=>Array.from(p.elm.form.getElementsByClassName('fileUploadedId')).map(elm=>elm.value).join(',');

	async function testImage(url){ return await new Promise(function imgPromise(resolve, reject) {
	        // Create the image
	        const imgElement = new Image();
	        // When image is loaded, resolve the promise
	        imgElement.addEventListener('load', function imgOnLoad() {resolve(this);});
	        // When there's an error during load, reject the promise
	        imgElement.addEventListener('error', function imgOnError() {reject();})

	        // Assign URL
	        imgElement.src = url;
	    });
	}


  	// Credit to: https://stackoverflow.com/questions/21720390/how-to-change-name-of-file-in-javascript-from-input-file
  	renameFile=(file, newName)=>{var blob = file.slice(0, file.size, file.type); return new File([blob], newName, {type: file.type,lastModified: file.lastModified});}