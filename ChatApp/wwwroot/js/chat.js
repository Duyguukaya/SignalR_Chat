const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .withAutomaticReconnect() 
    .build();

connection.start().then(function () {
    console.log("SignalR baðlantýsý kuruldu.");
}).catch(function (err) {
    return console.error(err.toString());
});

connection.on("ReceiveMessage", function (user, message) {
    const li = document.createElement("li");
    li.textContent = `${user}: ${message}`;
    document.getElementById("messageList").appendChild(li);
});

document.getElementById("sendButton").addEventListener("click", function () {
    const user = document.getElementById("userInput").value;
    const message = document.getElementById("messageInput").value;

    if (connection.state === signalR.HubConnectionState.Connected) {
        connection.invoke("SendMessage", user, message).catch(function (err) {
            console.error(err);
        });
    } else {
        console.error("Baðlantý þu an aktif deðil. Lütfen bekleyin.");
    }
});