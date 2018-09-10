export const opCookie = {
	setCookie: function(key, value, time) {
		if(key == undefined) {
			return;
		}
		if(time !== undefined) {
			var d = new Date();
			d.setTime(d.getTime() + time * 1000 * 60);
			document.cookie = key + "=" + value + ";expires=" + d.toGMTString();
		} else {
			document.cookie = key + "=" + value;
		}
	},
	getCookie: function(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if(arr = document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	},
	delCookie: function(key){ //删除cookie方法
         var date = new Date(); //获取当前时间
         date.setTime(date.getTime()-10000); //将date设置为过去的时间
         document.cookie = key + "=v; expires =" +date.toGMTString();//设置cookie
      }
}