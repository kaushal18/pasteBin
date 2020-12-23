const textArea = document.querySelector("#content");
const copyLinkButton = document.querySelector(".copyLink");
const newUrlBtn = document.querySelector("#newUrlBtn");

const parsedUrl = new URL(window.location.href);
const queryParam = parsedUrl.searchParams.get("c");
const debouceParams = {
  timerId: null,
  debouceParams: 300,
};

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
  clearTimeout(debouceParams.timerId);

  debouceParams.timerId = setTimeout(() => {
    socket.emit("message", event.target.value);
  }, debouceParamsdelay);
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

// generate new url
newUrlBtn.addEventListener("click", () => {
  window.location.href =
    window.location.protocol + "//" + window.location.host + `?c=`;
});
