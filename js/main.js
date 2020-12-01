const parsedUrl = new URL(window.location.href);
const queryParam = parsedUrl.searchParams.get("c");
document.title += ` / ${queryParam}`;

const textArea = document.querySelector("#content");
const socket = io("http://localhost:5000", { query: `token=${queryParam}` });

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
