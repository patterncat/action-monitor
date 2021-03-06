var stompClient = null;

function connect() {
    var socket = new SockJS('/action-monitor');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        stompClient.subscribe('/topic/action-message', function (message) {
            showMessage(JSON.parse(message.body));
        });
    });
}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
}

function showMessage(message) {
    $("#greetings").append("<tr><td>Record added: " + message.id + " - "+ message.data+" - "+ message.date+"+</td></tr>");
}

$(function () {
    connect();
});
