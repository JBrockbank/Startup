function myFunction1() {
  document.getElementById("stable1").style.display = "block";
  searchEl = document.getElementById("searchInput");
  var searchName = searchEl.value;
  document.getElementById("fname").textContent = searchName;
}

function addFriend() {
  var user = JSON.parse(window.localStorage.getItem("user"));
  var FriendName = document.getElementById("fname").textContent;
  newFriend = new User(FriendName, "password");
  user.friends.push(newFriend);
  window.localStorage.setItem("user", JSON.stringify(user));
  location.reload();
}

function hideButton() {
  var button = document.getElementById('addbutton');
  button.style.display = 'none';
}

function createFriendsTable() {
  // Retrieve the User object from local storage
  const user = JSON.parse(localStorage.getItem("user"));

  // Get the table element by its ID
  const table = document.getElementById("friendsTable");

  // Clear the table body before adding new rows
  

  // Create table header row
  const headerRow = table.insertRow();
  const usernameHeader = headerRow.insertCell();
  const moviesRatedHeader = headerRow.insertCell();
  usernameHeader.textContent = "Username";
  moviesRatedHeader.textContent = "Movies Rated";

  // Create table rows for each friend
  user.friends.forEach((friends) => {
    const row = table.insertRow();
    const usernameCell = row.insertCell();
    const moviesRatedCell = row.insertCell();
    usernameCell.textContent = friends.name;
    moviesRatedCell.textContent = friends.moviesRated;
  });
}

createFriendsTable();


const userName = window.localStorage.get("userName"); 

