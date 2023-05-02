export async function setImgData (data) {
  let myPromise = new Promise (function(myResolve, myReject) {
    setTimeout(function() { myResolve("I love You !!"); }, 3000);
  });
  let help = await myPromise;
  console.log(help);
}
