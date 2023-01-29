
var loggedInUser=null;
initFirebaseApp = (p)=>{
  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  // // The Firebase SDK is initialized and available here!
  // firebase.firestore().doc('/foo/bar').get().then(() => { });
  // firebase.messaging().requestPermission().then(() => { });
  // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
  firebase.analytics(); // call to activate
  firebase.analytics().logEvent('tutorial_completed');
  firebase.performance(); // call to activate
  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

try { let app = firebase.app(); let features = [ 'auth', 'firestore', 'analytics', 'performance' ].filter(feature => typeof app[feature] === 'function'); console.log(`Firebase SDK loaded with ${features.join(', ')}`); } catch (e) { console.error(e); }

	firebase.auth().onAuthStateChanged(
    (user)=>{
      console.log(user);
      (user)?/*Signed in.*/processUserData(user,p.callback):
      // (localStorage.getItem("accessToken")?firebase.auth().currentUser.getIdToken(true).then((accessToken)=>{localStorage.setItem("accessToken",accessToken);}):
                    /*Signed out.*/window.location.assign('signin.html')
                    // );
                  }, 
    (error)=>{logE(null,error);});
};

deinitFirebaseApp = (p)=>{
  firebase.auth().onAuthStateChanged(
    (user)=>{(user)?/*Signed in.*/onSignOut()://user.getIdToken().then((accessToken)=>{__})
                    /*Signed out.*/window.location.assign('signin.html');}, 
    (error)=>{logE(null,error);});
}
onSignOut=()=>{firebase.auth().signOut().then(()=>{logE('Signed Out');window.location.assign('signin.html');}, (error)=>{logE('Sign Out Error', error);});}

processUserData=(user,callback)=>{
  var url=`${appscriptConfig.userUrl}?action=signIn&email=${user.email}&uid=${user.uid}`;
  logE('signin:'+url);
  callGasApi(url,true).then(gasApiCb).then(message=>{// merge data + main.user
      logE('signin Ok');var aUser=message.data;aUser.tenkhac='('+user.displayName+')';aUser.uid=user.uid;aUser.img=user.photoURL;aUser.email=user.email;
      mainData.user=aUser;
      loadUserInfo();
      document.body.classList.remove('unseen');callback();

    },(er)=>{if(er.error!=501) {alertEr('GasApiError',er);  return;}
        var maAcv = prompt("Hãy nhập mã ACV của bạn vào ô dưới đây:", "ACV");
        var signupUrl=`${appscriptConfig.userUrl}?action=signUp&email=${user.email}&uid=${user.uid}&maAcv=${maAcv}`;
        // logE(null,er);logE('signup:'+signupUrl);
        callGasApi(signupUrl,true).then(gasApiCb).then(data=>{alert(`Đã đăng ký email ${data.email} thành công!`);window.location.assign('/');},
          er=>alertEr('Error signup',er));
      }
    );

}

const NetEr='Network response was not ok';
const FetchEr='There has been a problem with fetch operation';
alertEr=(description,er)=>{alert(description+':'+er);logE(description,er);}
