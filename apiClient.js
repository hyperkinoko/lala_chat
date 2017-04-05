/**
 * Created by superkinoko on 2017/04/05.
 */
$(document).ready(function() {
    dispMessages();
});

function dispMessages() {
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
                $('.message_box').eq(index).append('<div class="user">なまえ</div>');
                $('.message_box').eq(index).append('<div class="content">とうこうないよう</div>');
                $('.content').eq(index).text(message.content);
                $('.user').eq(index).text(message.messageOwner.name);
            }
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            alert("Request Failed: " + err);
        });
}
