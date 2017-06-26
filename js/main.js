// Your code here ...
"use strict";

var options = {
        headers: {
          Accept: 'application/json'
        },
        method: 'get',
        queryparams: {
          results: 5
        },
        apibaseurl: 'https://randomuser.me',
        apipath: '/api'
}

var generateUrl = new ApiGetClient(options);

$(document).ready(function() {
  
  var urlCall = generateUrl.getRequestUrl()
  $.ajax({
  url: urlCall,
  dataType: 'json',
  success: function(data) {
    console.log(data);
  }
});



});
