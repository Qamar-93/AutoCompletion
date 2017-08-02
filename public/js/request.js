// var request = (function () {
  function _request (url,cb) {
    var xhr = new XMLHttpRequest();


    
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          cb(null, JSON.parse(xhr.responseText));
        } else {
          
          console.log("XHR ELSE not 200")
        }
      }
    };
    xhr.open('GET',url,true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
  };



// })();




// module.exports = request