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

var urlCall = generateUrl.getRequestUrl()

function renderMember(user) {
  var $user = $('<div>').addClass('user');
  $user.append($('<img>'). attr("src", user.picture.large))
  var name = user.name.first + user.name.last;
  $user.append($('<h4>').text(name));
  $user.append($('<p>').text(user.email))
  return $user;
}

function generateRowUsers (users) {
  var $rowUsers = $('<div>').addClass('rowUsers')
  for (var user of users.results) {
      $($rowUsers).append(renderMember(user))
    }
  console.log($rowUsers)
  return $rowUsers;
};


function generateRandom () {
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
  generateRandom()
  $("#js-btn-action-more").on('click', function (e) {
    e.preventDefault();
    console.log("counter: ", counter)
    if (counter >= 5) {
      $("#js-btn-action-more").css('background-color', 'red');
      $("#js-btn-action-more").text('Maxed out');
    }
    else {
      counter++;
      generateRandom()
    }
  }
)

});
