function myFunction1() {
  document.getElementById("stable1").style.display = "block";
  searchEl = document.getElementById("searchInput");
  var searchName = searchEl.value;
  document.getElementById("fname").textContent = searchName;
}

function addFriend() {
  User.friends.push(document.getElementById("fname").value);
}

function hideButton() {
  var button = document.getElementById('addbutton');
  button.style.display = 'none';
}


const userName = window.localStorage.get("userName"); 

