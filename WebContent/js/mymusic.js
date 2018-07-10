(function() {
	$(".active").removeClass('active');
	$("a:contains('我的歌单')").addClass('active')
	if (localStorage.getItem("HaveLogin") !== 'true') {
		var mes = "<div class='not'>请先登录!</div>"
		$(".main").html(mes)
	}
	$(".pic").css({
		width : '100%',
		height : '300px'
	})
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	 $("#list").click(function(){
	 	   location.href='mymusic.html'
	    })
	    $("#up").click(function(){
	 	   location.href='upload.html'
	    })
	    $("#lib").click(function(){
	 	   location.href='index.html'
	    })
	var templ ="<table class='head'>\
		  <tr>\
	    <th>歌曲</th>\
	    <th>歌手</th>\
	    <th>播放次数</th>\
	  </tr>";
	 var songs={};
	if (email !== null && password !== null) {
		$.ajax({
			url : 'User_getMusic',
			data : {
				email : email,
				password : password
			},
			type : 'post',
			dataType : "json",
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			success : function(data) {
				console.log(data)
				var arr = data
				songs = arr;
				if(arr.length ===0){
					$(".musics").html()
				}
				else{
				for (var i = 0; i < arr.length; i++) {
					templ += "<tr><td class='namen'>"+arr[i].title+"</td><td>"+arr[i].author+"</td>"+"<td>"+arr[i].times+"</td></tr>"
				}
				templ+="</table>"

			
				$(".musics").html(templ)
				}
				//歌曲点击事件
				$(".namen").click(function(e){
					console.log(e)
					var messs =e.currentTarget.innerHTML;
					var idx =0
					console.log(messs);
					console.log(songs)
					
					for(var i =0 ; i <songs.length;i++){
						if(songs[i].title== messs){
							idx = i;
							break;
						}
					}
					console.log(songs[idx])
					var jsonP = {
                		url:songs[idx].musicUrl,
                		picurl:songs[idx].picUrl,
                		lyricurl:songs[idx].lyricUrl,
                		author:songs[idx].author,
                		 title:songs[idx].title,
                	}
                	var jsonp = JSON.stringify(jsonP)
                	console.log(idx)
                	localStorage.setItem("mysongs",jsonp);
                	localStorage.setItem("id",'3');
                	location.href="music.html"
                	
				})
			}

		})
	}
})()