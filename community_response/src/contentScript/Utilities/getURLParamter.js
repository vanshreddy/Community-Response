
function getURLParameter(name) {
    //  console.log("Location uno:",getURLParameter('v'));
  // eslint-disable-next-line
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

export default getURLParameter