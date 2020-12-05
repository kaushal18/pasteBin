const textArea = document.querySelector("#content");
const copyLinkButton = document.querySelector(".copyLink");

const parsedUrl = new URL(window.location.href);
const queryParam = parsedUrl.searchParams.get("c");
let timerId = null;
const delay = 300;

// update title of page
document.title += ` / ${queryParam}`;
// make socket connection
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
  // debounce the request to server
  clearTimeout(timerId);

  timerId = setTimeout(() => {
    socket.emit("message", event.target.value);
  }, delay);
});

// copy link to clipboard
copyLinkButton.addEventListener("click", () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(
    function () {
      copyLinkButton.innerHTML = "Copied!";
    },
    function () {
      alert("error, please copy the link from browser search bar");
    }
  );
});
