// Firebase project is configured already

var db = firebase.firestore();

// ============Enable Offline Access===========
// The default cache size threshold is 40 MB. Configure "cacheSizeBytes"
// for a different threshold (minimum 1 MB) or set to "CACHE_SIZE_UNLIMITED"
// to disable clean-up.
firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});

firebase.firestore().enablePersistence().catch(function(err) {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });
// Subsequent queries will use persistence, if it was enabled successfully

db.collection("cities").where("state", "==", "CA")
  .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
              console.log("New city: ", change.doc.data());
          }

          var source = snapshot.metadata.fromCache ? "local cache" : "server";
          console.log("Data came from " + source);
      });
  });
// ============================================

db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
});
add=()=>{
	db.collection("users").add({
	    first: "Ada",
	    last: "Lovelace",
	    born: 1815
	})
	.then(function(docRef) {
	    console.log("Document written with ID: ", docRef.id);
	})
	.catch(function(error) {
	    console.error("Error adding document: ", error);
	});
}

// =============== DB Functions ===============
class FirestoreDB{
	constructor(){}
// log (replay), active panel (map), indexed name (report), indexed day (report)
	
	add(data){
		let timestampId = data.timestamp.replace("/",)
		// add to log
		db.collection('Log').doc(data.id).set(data).catch(e=>console.error("Error adding document Log: ", error));
		// add to active panel
		db.collection('Active').doc(data.id).set(data).catch(e=>console.error("Error adding document Active: ", error));
		// add to indexed Name
		db.collection('IndexedName').doc(data.name.replace('/','.')+'/'+data.id.replace('_','/')).set(data).catch(e=>console.error("Error adding document IndexedName: ", error));
		// add to indexed Day
		db.collection('IndexedDay').doc(getFmDate(new Date(),'yyyy/mmdd/'+data.id.split('_')[1])).set(data).catch(e=>console.error("Error adding document IndexedDay: ", error));
	}

	remove(data){
		let timestampId = data.timestamp.replace("/",)
		// add to log
		db.collection('Log').doc(data.id).set(data).catch(e=>console.error("Error remove document Log: ", error));
		// add to active panel
		db.collection('Active').doc(data.id).delete().catch(e=>console.error("Error remove document Active: ", error));
		// add to indexed Name
		db.collection('IndexedName').doc(data.name.replace('/','.')+'/'+data.id.replace('_','/')).set(data).catch(e=>console.error("Error remove document IndexedName: ", error));
		// add to indexed Day
		db.collection('IndexedDay').doc(getFmDate(new Date(),'yyyy/mmdd/'+data.id.split('_')[1])).set(data).catch(e=>console.error("Error remove document IndexedDay: ", error));
	}

	getActive(resultPromise){
		db.collection('Active').get().then(resultPromise).catch(this.genericError);
	}

	get(){
		db.collection('Active').get().then(this.genericListData).catch(this.genericError);
	}
	genericDocData(doc){if(doc.exists) logE('getDB:'+JSON.stringify(doc.data())); else logE('No such document!')}
	genericListData(snapshot){snapshot.forEach((doc)=>{logE(`getDB: ${doc.id}, " => ", ${JSON.stringify(doc.data())}`)})};
	genericError(error){logE(null,error)}
	
	testGetDB(){
		logE('testGetDB - start:');
		logE('Collection list test:')
		this.getDB({id:'all',type:'student'}).then(this.genericListData).catch(this.genericError);
		// logE('Empty param test:');
		// this.getDB().then(this.genericListData).catch(this.genericError);
	}

	// backup(p){
	// 	var tempData = {}, insightData = {};
	// 	this.getDB({id:'all',type:'student'}).then(snap=>{
	// 		var c=[],d=[];snap.forEach(doc=>{c.push(doc.data());d.push(doc.id)});tempData.hocvienList=c;insightData.hocvienListId=d;insightData.nangdinhList = valuesGrouping(c,'nangdinh');

	// 		this.getDB({id:'all',type:'course'}).then(snap=>{
	// 			var c=[],d=[];snap.forEach(doc=>{c.push(doc.data());d.push(doc.id)});tempData.courseList=c;insightData.courseListId=d;
	// 			p.outData = JSON.stringify(tempData);//compress here
	// 			p.outInsight = JSON.stringify(insightData);
	// 			p.data = tempData;
	// 			p.insight = insightData;
	// 		}).catch(this.genericError);	
	//   	}).catch(this.genericError);
	// }

	// restore(savedData, savedInsight){
	// 	var savedObj = JSON.parse(savedData);//decompress here
	// 	this.massUpdateDB({type:'student'},savedObj.hocvienList);
	// 	this.massUpdateDB({type:'course'},savedObj.courseList);
	// }

	// toSpreadsheet(){}
	// fromSpreadsheet(){}
		
}

