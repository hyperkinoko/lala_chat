/**
 * Created by superkinoko on 2017/04/05.
 */
$(document).ready(function() {
    dispMessages();
});

function dispMessages() {
    $('#chat_box').empty();

    var messages = new Array();

    $.getJSON("http://153.126.169.85:8080/chat/MainServlet?",
        {
            api : "Messages",
            lang : "ja",
            token : "dummy"
        })
        .done(function (response) {
            messages = response.response.result;

            // 余力のある人はArray.forEachを使ってみましょう
            for(var index = 0; index < messages.length; index++) {
                var message = messages[index];
                $('#chat_box').append('<div class="message_box"></div>');
                $('.message_box').eq(index).append('<div class="content">とうこうないよう</div>');
                $('.content').eq(index).text(message.content);
            }
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            alert("Request Failed: " + err);
        });
}

function postMessage() {
    var content = $('#post_content').val();
    var createTime = Date.now();
    var messageId = createNewMessageId();

    var obj = {
        lang : "ja",
        token : "dummy",
        request :
        {
            message:
            {
                messageId : messageId,
                    messageOwner : {userId: "dummy", name: "John Doe"},
                createTime : createTime,
                    content : content
            }
        }
    }
    var jsonString = JSON.stringify(obj);
    //alert(jsonString);

    // 通信実行
    $.ajax(
        {
            type: "post",                // method = "POST"
            url: "http://153.126.169.85:8080/chat/MainServlet?api=Messages", // POST送信先のURL
            data: jsonString,  // JSONデータ本体
            contentType: "application/json;charset=UTF-8", // リクエストの Content-Type
            dataType: "json" // レスポンスをJSONとしてパースする
        }
    ).done(function() {
            //alert( "success" );
            dispMessages();
        }
    ).fail(function() {
            alert( "error" );
        }
    );
}

function createNewMessageId() {
    // 生成する文字列の長さ
    var l = 8;

    // 生成する文字列に含める文字セット
    var c = "abcdefghijklmnopqrstuvwxyz0123456789";

    var cl = c.length;
    var r = "";
    for(var i=0; i<l; i++){
        r += c[Math.floor(Math.random()*cl)];
    }
    var createTime = Date.now();
    var messId = r + createTime;
    //alert(messId);
    return messId;
}

