/**
 * socket connections
 */

const textArea = document.querySelector("#content");
const copyLinkButton = document.querySelector(".copyLink");
const newUrlBtn = document.querySelector("#newUrlBtn");
const migrateUrlBtn = document.querySelector("#migrateUrlBtn");

// get token from url
const parsedUrl = new URL(location.href);
const queryParam = parsedUrl.searchParams.get("c");
const debouceParams = {
  timerId: null,
  delay: 400,
};

// in memory stack
let undoStack = [];
let redoStack = [];

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
  undoStack.length = 0;
  redoStack.length = 0;
});

function debounceAndEmit(content) {
  // debounce the request to server
  clearTimeout(debouceParams.timerId);

  debouceParams.timerId = setTimeout(() => {
    socket.emit("message", content);
  }, debouceParams.delay);
}

// listner for changes in textArea
textArea.addEventListener("input", (event) => {
  const content = event.target.value;
  undoStack.push(content.trim());
  debounceAndEmit(content);
});

// copy link to clipboard
copyLinkButton.addEventListener("click", () => {
  const url = location.href;
  navigator.clipboard.writeText(url).then(
    () => (copyLinkButton.innerHTML = "Copied!"),
    () => alert("error, please copy the link from browser url bar")
  );
});

// migrate to new url
migrateUrlBtn.addEventListener("click", () => {
  const newToken = prompt("enter a new url");
  if (newToken === null) return;
  if (newToken.trim() === "") return alert("invalid url");

  const payload = {
    oldToken: queryParam,
    newToken: newToken.trim(),
  };

  fetch("http://localhost:5000/api/migrate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (response.status === 200) {
        location.href =
          location.protocol + "//" + location.host + `?c=${newToken}`;
      } else {
        console.log(`error ${response.status} ${response.statusText}`);
        console.log(response.data);
      }
    })
    .catch((error) => console.log(error));
});

// generate new url
newUrlBtn.addEventListener("click", () => {
  location.href = location.protocol + "//" + location.host + `?c=`;
});

// listen for undo and redo
document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "z") {
    event.preventDefault();
    const currVal = undoStack.pop();
    if (currVal) {
      redoStack.push(currVal);
      const undoVal = undoStack[undoStack.length - 1];
      if (undoVal) {
        textArea.value = undoVal;
        debounceAndEmit(undoVal);
      }
    }
  } else if (event.ctrlKey && event.key === "y") {
    event.preventDefault();
    const redoVal = redoStack.pop();
    if (redoVal) {
      textArea.value = redoVal;
      undoStack.push(redoVal);
      debounceAndEmit(redoVal);
    }
  }
});
