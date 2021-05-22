/**
 * checks if the token is password protected
 */

// get token and make http post to server
// const parsedUrl = new URL(location.href);
// const token = parsedUrl.searchParams.get("c");

// async function checkPasswordProtected() {
//   const isProtected = await fetch(`http://localhost:5000/api/auth/${token}`);
//   if(isProtected) {
//     while(true) {
//       const password = prompt("enter password");
//       const isValid = await validatePassword(password);
//       if(isValid) break;
//     }
//   }
// }

// fetch(`http://localhost:5000/api/auth/${token}`)
//   .then((response) => {
//     // if password protected
//     if (response.status === 200) {

//     }
//     else {
//       alert("no password")
//     }
//   })
//   .catch((error) => console.log(error));
