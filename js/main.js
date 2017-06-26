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
// use the getRequest URL method and use it for the ajax call.
var urlCall = generateUrl.getRequestUrl()
// Render individual member
function renderMember(user) {
  var $user = $('<div>').addClass('user');
  $user.append($('<img>'). attr("src", user.picture.large))
  var name = user.name.first + user.name.last;
  $user.append($('<h4>').text(name));
  $user.append($('<p>').text(user.email))
  return $user;
}
// A row of random user members
function generateRowUsers (users) {
  var $rowUsers = $('<div>').addClass('rowUsers')
  // users.results because the first key value is results and we want to increment every user which is a key after results.
  for (var user of users.results) {
      $($rowUsers).append(renderMember(user))
    }
  return $rowUsers;
};


function generateRandom () {
  // Call a ajax call and then append to the .members container.
  $.ajax({
  url: urlCall,
  dataType: 'json',
  success: function(data) {
    var $data = generateRowUsers(data);
    $('.members').append($data);
  }
  });
}




$(document).ready(function() {
  var counter = 1
  // Begin first generating the components
  generateRandom()
  $("#js-btn-action-more").on('click', function (e) {
    e.preventDefault();
    console.log("counter: ", counter)
    if (counter >= 5) {
      // if its more than 5 times then change the button color to red and change the text to Maxed out.
      $("#js-btn-action-more").css('background-color', 'red');
      $("#js-btn-action-more").text('Maxed out');
    }
    else {
      // otherwise increment the counter.
      counter++;
      generateRandom()
    }
  }
)

});
