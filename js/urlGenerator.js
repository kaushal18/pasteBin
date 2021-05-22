/**
 * generates a random token if not already present
 */

const CONSTANTS = {
  tokenSet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  tokenLength: 8,
};

function getRandomQuery(tokenLength) {
  let result = "";
  const characters = CONSTANTS.tokenSet;
  const charactersLength = characters.length;
  for (let i = 0; i < tokenLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function isQueryValid(url) {
  const parsedUrl = new URL(url);
  const isTokenValid = parsedUrl.searchParams.get("c") !== "";
  const isTokenPreset = url.indexOf("?c=") !== -1;
  return isTokenPreset && isTokenValid;
}

// if query string is not present/invalid then generate a random one
if (!isQueryValid(location.href)) {
  const query = getRandomQuery(CONSTANTS.tokenLength);
  const newurl = location.protocol + "//" + location.host + `?c=${query}`;
  history.replaceState({ path: newurl }, "", newurl);
}
