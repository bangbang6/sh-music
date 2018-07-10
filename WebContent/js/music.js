(function () {
    var title = '';
    var author = '';
    var picurl = '';
    var url = '';
    var lrcurl = '';
   
    if (localStorage.getItem("id") == 0) {//图片点击
        picurl = localStorage.getItem("picurl");
        var hotsongs = JSON.parse(localStorage.getItem("hotsongs"))
        console.log(picurl)
        console.log(hotsongs)
        var index = 0;//hotsongs的位置
         
        for (var i = 0; i < hotsongs.length; i++) {
            if (picurl === hotsongs[i].pic) {
                index = i;
                break;
            }
        }
        title = hotsongs[index].title;
        author = hotsongs[index].author;
        url = hotsongs[index].url;
        lrcurl = hotsongs[index].lrc;
    }
    else if (localStorage.getItem("id") == 1) {//搜索点击
        var song = JSON.parse(localStorage.getItem("searchSong"))
        console.log(song);
        picurl = song.pic;
        title = song.title;
        author = song.author;
        url = song.url;
        lrcurl = song.lrc
    }
    else if(localStorage.getItem("id") == 2){//排行榜进入
    	 var song = JSON.parse(localStorage.getItem("paihangsongs"));
    	 picurl = song.picurl;
         title = song.title;
         author = song.author;
         url = song.url;
         lrcurl = song.lyricurl;
    }
    else if(localStorage.getItem("id") == 3){//排行榜进入
   	 var song = JSON.parse(localStorage.getItem("mysongs"));
   	 picurl = song.picurl;
        title = song.title;
        author = song.author;
        url = song.url;
        lrcurl = song.lyricurl;
   }
    $("#musicPic").attr("src", picurl);
    $("#musicPic").css({
        width: '200px',
        height: '200px'
    })
    $("#name").html(title);
    $("#author").html(author);
    $("#music").attr("src", url)
    $("#music").attr("controls", "controls")

    var lyric = "";

    function parseLyric(text) {
        //将文本分隔成一行一行，存入数组    
        var lines = text.split('\n'),
            //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]    
            pattern = /\[\d{2}:\d{2}.\d{2,3}\]/g,
            //保存最终结果的数组    
            result = [];
        //去掉不含时间的行    
        while (!pattern.test(lines[0])) {

            lines = lines.slice(1);
        };
        //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉    
        lines[lines.length - 1].length === 0 && lines.pop();
        lines.forEach(function (v /*数组元素值*/, i /*元素索引*/, a /*数组本身*/) {
            //提取出时间[xx:xx.xx]    
            var time = v.match(pattern),
                //提取歌词    
                value = v.replace(pattern, '');
            //因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔    
            time.forEach(function (v1, i1, a1) {
                //去掉时间里的中括号得到xx:xx.xx    
                var t = v1.slice(1, -1).split(':');
                //将结果压入最终数组    
                result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
            });
        });
        //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词    
        result.sort(function (a, b) {
            return a[0] - b[0];
        });
        return result;
    }

    $.ajax({
        url: lrcurl,
        type: 'get',
        data: {},
        success: function (data) {
            lyric = data;


            var str = parseLyric(data)
            console.log(str)
            for (var i = 0, li; i < str.length; i++) {
                li = $('<li>' + str[i][1] + '</li>');
                $('#gc ul').append(li);
            }
            $('#music')[0].ontimeupdate = function () {//视屏 音频当前的播放位置发生改变时触发    
                for (var i = 0, l = str.length; i < l; i++) {
                    if (this.currentTime /*当前播放的时间*/ > str[i][0]) {
                        //显示到页面    
                        $('#gc ul').css("position", "absolute")

                        $('#gc ul').css('top', -i * 27 + 150 + 'px'); //让歌词向上移动    
                        $('#gc ul li').css('color', '#fff');
                        $('#gc ul li').css('marign-top', '10px');
                        $('#gc ul li').css('font-size', '16px');
                        $('#gc ul li:nth-child(' + (i + 1) + ')').css('color', '#31c27c');
                        $('#gc ul li:nth-child(' + (i + 1) + ')').css('fontSize', '23px');
                        //高亮显示当前播放的哪一句歌词    
                    }
                }
                /*  if (this.ended) { //判断当前播放的音乐是否播放完毕    
                     var songslen = $('.songs_list li').length;
                     for (var i = 0, val; i < songslen; i++) {
                         val = $('.songs_list li:nth-child(' + (i + 1) + ')').text();
                         if (val == sgname) {
                             i = (i == (songslen - 1)) ? 1 : i + 2;
                             sgname = $('.songs_list li:nth-child(' + i + ')').text(); //音乐播放完毕之后切换下一首音乐    
                             $('#gc ul').empty(); //清空歌词    
                             $('#aud').attr('src', 'music/' + sgname + '.mp3');
                             fn(sgname);
                             return;
                         }
                     }
                 } */
            };
            //提交评论
            $("#submit").click(function (e) {
            	
                var comment = $("#message").html()
                console.log(comment);
                if (comment === '') {

                }

                else {
                    $.ajax({
                        url: 'Music_addComment',
                        data: { author: author, title: title, picUrl: picurl, musicUrl: url, lyricUrl: lrcurl,comment:comment },
                        type: 'post',
                        success: function (data) {
                            console.log(data)
                            if (data === 'true') {
                                $("#tishi").css({
                                    'opacity': '1'
                                })
                                setTimeout(function () {
                                    $("#tishi").css({
                                        'opacity': '0'
                                    })
                                }, 3000)
                            }
                            getComments();
                            $("#message").html("")
                        }
                    })
                }
            })
            var email= localStorage.getItem('email');
               var password= localStorage.getItem('password');
            //加入歌单
            $("#add").click(function () {
              console.log(email)
                $.ajax({
                    url: 'User_addMusic',
                    type: 'post',
                    data: { author: author, title: title, picUrl: picurl, musicUrl: url, lyricUrl: lrcurl,email:email,password:password },
                    success: function (data) {
                        if (data === 'true') {
                            $("#tishi").css({
                                'opacity': '1'
                            })
                            setTimeout(function () {
                                $("#tishi").css({
                                    'opacity': '0'
                                })
                            }, 3000)
                        }
                    }
                })
            })
            //评论区
            
            function getComments(){
              var temls=''
              $.ajax({
                url:'Music_getComments',
                data: { author: author, title: title, picUrl: picurl, musicUrl: url, lyricUrl: lrcurl },
                type:'post',
                success:function(data){
                    console.log(data)
                    var arr = JSON.parse(data);
                    console.log(arr)
                    for(var i=0;i<arr.length;i++){
                       temls+="<div class='comments'><p>匿名用户:</p><p id='messa'>"+arr[i]+"</p></div>"
                    }
                    $(".com").html(temls)
                }
                
              })
            }
            getComments();
            //获取所有歌单音乐
            
            //监听音乐播放，增加播放次数
            $("#music").bind('play',function(){
            	console.log(555)
            	  $.ajax({
                  	url:'Music_updateTimes',
                  	data:{ author: author, title: title, picUrl: picurl, musicUrl: url, lyricUrl: lrcurl },
                  	type:'post',
                  	success:function(data){
                  		console.log(data)
                  	}
                  })
            })
          
        }
    })



})()