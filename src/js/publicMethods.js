export const publicMethods={
	judgmentFlash:function(){
		var flag = false;
      if(window.ActiveXObject){
        try{
          var swf = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
          if(swf){
            flag = true;
          }
        }catch(e){
        }
      }else{
        try{
          var swf = navigator.plugins['Shockwave Flash'];
          if(swf){
            flag = true;
          }
        }catch(e){
        }
      }
      if(flag){
        console.log("running ok");
        return true;
      }else{
        console.log("running error");
        return false;
      }
	}
}
