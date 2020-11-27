const textArea = document.querySelector("#textArea");
const socket = io("http://localhost:5000");
console.log(socket);

socket.on("connect", () => {
  console.log(socket.id);
});

// listen for content change from server
socket.on("message", (message) => {
  textArea.value = message;
});

// listner for changes in textArea
textArea.addEventListener("input", (event) => {
  socket.emit("message", event.target.value);
});
