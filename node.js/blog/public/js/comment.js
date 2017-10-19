//每页显示的评论数
var prepage = 3;
//当前页
var page = 1;
//总页数
var pages = 0;
//由于点击上下页时的需要，所以将其该为全局的
var comments = [];


//提交评论
$('#messageBtn').on('click', function () {
    $.ajax({
        type: 'post',
        url: '/api/comment/post',
        data: {
            contentid: $('#contentId').val(),
            content: $('#messageContent').val()
        },
        success: function (responseData) {
            // console.log(responseData);
            //清空文本域中的内容
            $('#messageContent').val('');
            comments = responseData.data.comments.reverse();
            //reverse()反转一次数组，让最新评论显示在最上面
            renderComment();
        }
    })
});

//每次页面重载，就获取该文章的所有评论
$.ajax({
    //默认为get方式请求
    url: '/api/comment',
    data: {
        contentid: $('#contentId').val()
    },
    success: function (responseData) {
        // console.log(responseData);
        //清空文本域中的内容
        $('#messageContent').val('');
        //reverse()反转一次数组，让最新评论显示在最上面
        comments = responseData.data.reverse();
        console.log(page);
        // renderComment(responseData.data.reverse())
        renderComment();
    }
});


//处理上下页的点击
$('.pager').delegate('a', 'click', function () {
    if ($(this).parent().hasClass('previous')) {
        // alert('上一页');
        page--;
        // page++;
    } else {
        // alert('下一页');
        page++;
        // page--;
    }
    console.log(page);
    renderComment();
    //每次都会导致页面刷新，可能是还原了page的值
});


//渲染评论的内容
function renderComment() {
    //设置评论数
    $('#messageCount').html(comments.length);

    /**
     * 评论分页
     */

    pages = Math.ceil(comments.length / prepage);
    var start = Math.max(0,(page - 1) * prepage);
    var end = Math.min(start + prepage,comments.length);
    //所有li
    var $lis = $('.pager li');
    //lis的第二个元素
    $lis.eq(1).html(page + '/' + pages);


    if (page <= 1) {
        page = 1;
        $lis.eq(0).html('<span>没有上一页了</span>');
    } else {
        $lis.eq(0).html('<a href="">上一页</a>');
    }

    if (page >= pages) {
        page = pages;
        $lis.eq(2).html('<span>没有下一页了</span>');
    } else {
        $lis.eq(2).html('<a href="">下一页</a>');
    }


    //评论
    var html = '';
    for (var i = start; i < end; i++) {
        html += '<div class="messageBox">' +
            '<p class="name clear">' +
            '<span class="fl">' + comments[i].username + '</span><span class="fr">' + formatDate(comments[i].postTime) + '</span>' +
            '</p>' +
            '<p>' + comments[i].content + '</p>' +
            '</div>';
    }

    $('.messageList').html(html);
}


function formatDate(d) {
    var date1 = new Date(d);
    return date1.getFullYear() + '年' +
        (date1.getMonth() + 1) + '月' +
        date1.getDay() + '日' +
        date1.getHours() + ':' +
        date1.getMinutes() + ':' +
        date1.getSeconds();
}