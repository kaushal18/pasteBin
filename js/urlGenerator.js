function isQueryValid(url) {
  const parsedUrl = new URL(url);
  const isTokenValid = parsedUrl.searchParams.get("c") !== "";
  const isTokenPreset = url.indexOf("?c=") !== -1;
  return isTokenPreset && isTokenValid;
}

function getRandomQuery(tokenLength) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < tokenLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// if query string is not present/invalid then generate a random one
if (!isQueryValid(location.href)) {
  const query = getRandomQuery(8);
  const newurl = location.protocol + "//" + location.host + `?c=${query}`;
  history.replaceState({ path: newurl }, "", newurl);
}
