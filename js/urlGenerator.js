const url = window.location.href;

// if query string is not present/invalid then generate a random one
if (isQueryInValid(url) && history.pushState) {
  const query = getRandomQuery(8);
  const newurl =
    window.location.protocol + "//" + window.location.host + `?c=${query}`;
  window.history.replaceState({ path: newurl }, "", newurl);
}

function isQueryInValid(url) {
  const parsedUrl = new URL(url);
  const isEmpty = parsedUrl.searchParams.get("c") === "";
  const noQuery = url.indexOf("?c=") === -1;
  return isEmpty || noQuery;
}

function getRandomQuery(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
