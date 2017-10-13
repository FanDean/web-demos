$(function () {
    var $loginBox = $('#loginBox');
    var $registerBox = $('#registerBox');

    //切换到注册面板
    $loginBox.find('a.colMint').on('click',function () {
        $registerBox.show();
        $loginBox.hide();
    })

    //切换到登录面板
    $registerBox.find('a.colMint').on('click',function () {
        $loginBox.show();
        $registerBox.hide();
    })

    //点击注册按钮
    $registerBox.find('button').on('click',function () {
        //通过ajax提交请求
        $.ajax({
            type:'post',
            url: '/api/user/register',
            data:{
                username: $registerBox.find('[name="username"]').val(),
                password: $registerBox.find('[name="password"]').val(),
                repassword: $registerBox.find('[name="repassword"]').val()
            },
            dataType:'json', //返回的数据类型
            success: function (result) { //输出返回的类型
                // console.log(result);
                $registerBox.find('.colWarning').html(result.message);

                //如果注册成功，显示登录页面
                if (!result.code){
                    //使用定时器，使得不要过渡的太快
                    setTimeout(function () {
                        $loginBox.show();
                        $registerBox.hide();
                    }, 1000);
                }
            }
        });
    })
})