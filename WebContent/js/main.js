(function () {
	//css
	
    var $forget = $("#forget");
    var $register = $("#register");
    var $login = $("#login")
    //a标签
    console.log($("#alogin"));
     if (localStorage.getItem("HaveLogin")) {
        $("#aUser").css({
            display: "block",
        })
        $("#aLogout").css({
            display: "block",
        })
        $("#Login").css({
            display: "none",
        })
        $("#Register").css({
            display: "none",
        })
    } else {
       
        $("#aloginout").css({
            display: "none",
        })
        $("#alogin").css({
            display: "block",
        })
        $("#aregister").css({
            display: "block",
        })
    } 
 
     $("#aloginout").click(function (){
    	 localStorage.removeItem("HaveLogin");
    	 console.log(231);
        location.href = "index.html";
       
    }) 
    $("#alogin").on('click', function (e) {
      
        console.log(555)
        $('#pop-login').modal();
    });
    $("#aregister").on('click', function (e) {
       
        $('#pop-reg').modal();
    });
    $("#register").click(function () {
        $("#close-login").trigger("click");
        $('#pop-reg').modal();
    })
    $("#haveNum").click(function () {
        $("#close-reg").trigger('click');
        $('#pop-login').modal();

    })
    $forget.click(function () {
        $("#close-login").trigger("click");
        $('#pop-forget').modal();
    })
    
//登录
    $login.click(function (e) {
        e.preventDefault()
        $.ajax({
           url:"User_login",
            type: "post",
           
            data: { email: $("#email1").val(), password: $("#password1").val(),},

            success: function (data) {
            	console.log(1)
            	  
                if (data==="true") {
                    console.log(data);
                    localStorage.setItem('HaveLogin', data);
                    localStorage.setItem('email', $("#email1").val());
                    localStorage.setItem('password', $("#password1").val());
                   location.href = "index.html";
                  
                }else{
                	console.log("失败");
                	
                	alert("密码或邮箱错误");
                	$("#password1").focus();
                }
            }
        })
    })
    //获取验证码
   /*  $("#right").click(function () {
        if ($("#email2").val()!=="") {
        
            $.ajax({
                url: "/home/EmailValidation",
                type: 'POST',
                data: { email: $("#email2").val() },
                success: function (data) {
                    if (data) {
                        console.log(1);
                        $("#right").html("验证码已发送")
                    }
                }
            })
        }
        else {
            document.getElementById("email2").focus()
        }
    }) */
    //注册
    $("#register1").click(function (e) {
        e.preventDefault()
        console.log(555)
        $.ajax({
            url: 'User_register', 
            type: 'POST',
            data: { email: $("#email2").val(), password: $("#password2").val() },
            success: function(data) {
            	
            	if (data==="true") {
                    console.log(data);
                    
                    localStorage.setItem('HaveLogin', data);
                    localStorage.setItem('email', $("#email2").val());
                    localStorage.setItem('password', $("#password2").val());
                    location.href = "index.html";
                    
                }else{
                	alert("邮箱已存在");
                	$("#email2").focus();
                }
            
        }
            
        })
    })
   /*  $("#left").click(function () {
        if ($("#email3").val()!=="") {
            console.log(123)
            $.ajax({
                url: "/home/EmailValidation",
                type: 'POST',
                data: { email: $("#email3").val() },
                success: function (data) {
                    if (data) {
                        console.log(1);
                        $("#left").html("验证码已发送");
                    }
                }
            })
        }
        else {
            document.getElementById("email3").focus();
        }
    }) */
    //重置密码
    $("#send").click(function (e) {
        e.preventDefault()
        $.ajax({
            url: "User_confirmEmail", 
            type: 'POST',
            data: { email: $('#email3').val() },
            success: function (data) {
                console.log(5);
                if (data==="true") {
                	 localStorage.setItem('email', $('#email3').val());
                    console.log(111)
                   
                    $("#close-forget").trigger("click");
                    $('#pop-twice').modal();

                }else{
                	console.log("失败");
                	alert("邮箱不存在");
                	$("#email3").focus();
                }
            }
        })
    }),
    //确定密码
      $("#confirm").click(function () {
          $.ajax({
              url: 'User_updatePassword',
              type: 'POST',
              data: { email: localStorage.getItem('email'), password: $("#password3").val() },
              success: function (data) {
                  console.log(2);
              }
          })
      })

    /*  
     * 邮箱格式验证事件
     */
    $(".form-horizontal").bootstrapValidator({

        fields: {
            email: {
                message: "邮箱无效",
                validators: {
                    notEmpty: {
                        message: "邮箱不能为空",

                    },
                },
            },
                password: {
                    validators: {
                        notEmpty: {
                            message: "密码不能为空",
                        },
                        /*  identical: {
                         field: 'repeat',
                         message: '两次输入的密码不一致'
                     }, */

                        stringLength: {
                            min: 6,
                            max: 20,
                            message: '长度在6到20之间'
                        },
                    },
                },

                repeat: {
                    validators: {
                        identical: {
                            field: 'password',
                            message: '两次输入的密码不一致'
                        },
                        notEmpty: {
                            message: "密码不能为空",

                        },

                        stringLength: {
                            min: 6,
                            max: 20,
                            message: '长度在6到20之间'
                        },
                    }
                },
                username: {
                    message: " ",
                    validators: {
                        notEmpty: {
                            message: "用户名不能为空",

                        },
                        stringLength: {
                            min: 2,
                            max: 10,
                            message: '长度在2到10之间'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_\.]+$/,
                            message: '用户名只能有由字母、数字、点和下划线。'
                        },
                        /*  remote: {//ajax验证。server result:{"valid",true or false} 
                     url: url,
                     message: '用户已存在',
                     delay: 3000,
                     type: 'POST',
                     //自定义参数
                     data: {
                         clusterName: $('#username').val(),
                         "apptype": 1
                           }
                    
                      }, */

                    }

                },
               /*  validate: {
                    message: " ",
                    validators: {
                        notEmpty: {
                            message: "验证码不能为空",

                        },
                    }
                }, */
            }
        
    });

    
       
   /*获取资源*/
    var m = {
            "TransCode": "020112",
            "OpenId": "123456789",
            "Body": {
                "SongListId": "141998290"
            }
        }
       var paihang ={};
        $.ajax({
            url: "https://api.hibai.cn/api/index/index",
            type: "post",
            data: m,
            success: function (data) {
                var messageArray = data.Body;
             
                var jsonHot = JSON.stringify(messageArray)
                localStorage.setItem("hotsongs", jsonHot)
                console.log(data.Body);
               // console.log(localStorage.getItem("hotsongs"))
                var impl = "";
                impl = "<div class='row1'>\
                <div class='big'>\
                    <div class='top'>\
                        <img src='"+ messageArray[0].pic + "'alt='图片' class='pic'>\
                    </div>\
                    <div class='word'>\
                        <p class='name' id='name1'></p>\
                        <p class='author' id='author1'></p>\
                    </div>\
                </div>\
                <div class='big'>\
                <div class='top'>\
                <img src='"+ messageArray[1].pic + "'alt='图片' class='pic'>\
            </div>\
            <div class='word'>\
                <p class='name' id='name2'></p>\
                <p class='author' id='author2'></p>\
            </div>\
                </div>\
                <div class='big'>\
                <div class='top'>\
                <img src='"+ messageArray[2].pic + "'alt='图片' class='pic'>\
            </div>\
            <div class='word'>\
                <p class='name' id='name3'></p>\
                <p class='author' id='author3'></p>\
            </div>\
                </div>\
                <div class='big'>\
                <div class='top'>\
                <img src='"+ messageArray[3].pic + "'alt='图片' class='pic'>\
            </div>\
            <div class='word'>\
                <p class='name' id='name4'></p>\
                <p class='author' id='author4'></p>\
            </div>\
                </div>\
                <div class='big'>\
                <div class='top'>\
                <img src='"+ messageArray[4].pic + "'alt='图片' class='pic'>\
            </div>\
            <div class='word'>\
                <p class='name' id='name5'></p>\
                <p class='author' id='author5'></p>\
            </div>\
                </div>\
                </div>\
                <div class='row2'>\
                <div class='big'>\
                <div class='top'>\
                <img src='"+ messageArray[5].pic + "'alt='图片' class='pic'>\
            </div>\
            <div class='word'>\
                <p class='name' id='name6'></p>\
                <p class='author' id='author6'></p>\
            </div>\
                </div>\
                <div class='big'>\
                <div class='top'>\
                <img src='"+ messageArray[6].pic + "'alt='图片' class='pic'>\
            </div>\
            <div class='word'>\
                <p class='name' id='name7'></p>\
                <p class='author' id='author7'></p>\
            </div>\
                </div>\
                <div class='big'>\
                <div class='top'>\
                <img src='"+ messageArray[7].pic + "'alt='图片' class='pic'>\
            </div>\
            <div class='word'>\
                <p class='name' id='name8'></p>\
                <p class='author' id='author8'></p>\
            </div>\
                </div>\
                <div class='big'>\
                <div class='top'>\
                <img src='"+ messageArray[8].pic + "'alt='图片' class='pic'>\
            </div>\
            <div class='word'>\
                <p class='name' id='name9'></p>\
                <p class='author' id='author9'></p>\
            </div>\
                </div>\
                <div class='big'>\
                <div class='top'>\
                <img src='"+ messageArray[9].pic + "'alt='图片' class='pic'>\
            </div>\
            <div class='word'>\
                <p class='name' id='name10'></p>\
                <p class='author' id='author10'></p>\
            </div>\
                </div>\
                </div>\
            ";
                $(".hotsource").html(impl)
                for (var i = 0; i < 10; i++) {
                    $("#name" + (i + 1)).html(messageArray[i].title.substring(0,11));
                    $("#author" + (i + 1)).html(messageArray[i].author);
                }
               $("#list").click(function(){
            	   location.href='mymusic.html'
               })
               $("#up").click(function(){
            	   location.href='upload.html'
               })
               $("#lib").click(function(){
            	   location.href='index.html'
               })
                $("img").css({
                    width: "200px",
                    height: '200px',
                })
                //图片点击事件,进入听歌
                $(".pic").click(function(e){
                    console.log(e);
                    var picurl=e.target.currentSrc;
                    localStorage.setItem("picurl",picurl);
                    localStorage.setItem("id",'0')
                    location.href='music.html'
                })
                //搜索框点击事件
                function getSongs(){
                    var musicName= $("#formGroupExampleInput").val()
                    $.ajax({
                        url:"https://api.hibai.cn/api/index/index",
                        type:'post',
                        data:{"TransCode":"020116","OpenId":"123456789","Body":{"key":musicName}},
                        success:function(data){
                            
                           $('#result1').modal();
                            var array=data.Body;
                            var len = array.length;  
                            /* localStorage.setItem('searchSongs',JSON.stringify(data)) */
                          if(data.ErrCode == "OK"){
                              var reseachIndex=0;
                              var templ="";
                                         for(var i=0;i<len;i++){
                                           templ+="<div class='form-group'>\
                                           <div class='col-sm-16 musicmodal' data-index="+i+">"+array[i].title +"&nbsp&nbsp-&nbsp&nbsp"+array[i].author+"</div>\
                                         </div>"
                                       }
                                       $(".musicResult").html(templ)
                                       $(".musicmodal").click(function(e){
                                           console.log(e.currentTarget)
                                           var el=e.currentTarget;
                                           reseachIndex=el.getAttribute('data-index');
                                           console.log(reseachIndex)
                                           var message=array[reseachIndex]
                                           var jsonMessage=JSON.stringify(message);
                                           console.log(jsonMessage)
                                           localStorage.setItem('searchSong',jsonMessage)
                                           localStorage.setItem("id",'1')
                                           location.href='music.html'
                                       })

                          }
                          else{
                           $(".musicResult").html('暂无数据，核实关键词')
                          }
                        }
                      
                    })
                }
                $("#search").click(function(e){
                       getSongs();
                })
                $("#formGroupExampleInput").keydown(function(e){
                    console.log(e)
                    if(e.keyCode == 13){
                        getSongs();
                     //  console.log(musicName)
                     
                    }
                })
                //获取排行榜
                var email=localStorage.getItem('email')
                 var password=localStorage.getItem('password')
                $.ajax({
                	url:'Music_getTop3',
                	type:'post',
                	 contentType:'application/x-www-form-urlencoded; charset=UTF-8',
                	data:{email:email,password:password},
                	success:function(data){
                		console.log(data)
                		var arr= JSON.parse(data);
                		paihang = arr;
                		$("#mfirst").text(arr[0].title);
                		$("#msecond").text(arr[1].title);
                		$("#mthird").text(arr[2].title);
                		$("#mforth").text(arr[3].title);
                		
                		$("#afirst").text(arr[0].author);
                		$("#asecond").text(arr[1].author);
                		$("#athird").text(arr[2].author);
                		$("#aforth").text(arr[3].author);
                	}
                })
                //排行榜点击听歌
                $(".musicm").click(function(e){
                	console.log(e)
                	var messs=e.currentTarget.innerHTML;
                	var idx = 0;
                	for(var i=0;i<paihang.length;i++){
                		if(paihang[i].title === messs){
                			idx = i;
                			break;
                		}
                	}
                	console.log(paihang)
                	var jsonP = {
                		url:paihang[idx].musicUrl,
                		picurl:paihang[idx].picUrl,
                		lyricurl:paihang[idx].lyricUrl,
                		author:paihang[idx].author,
                		 title:paihang[idx].title,
                	}
                	var jsonp = JSON.stringify(jsonP)
                	localStorage.setItem("paihangsongs",jsonp);
                	localStorage.setItem("id",'2');
                	location.href="music.html"
                	console.log(paihang[idx].musicUrl)
                })
            }
        });
})()