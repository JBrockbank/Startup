function myFunction() {
    document.getElementById("stable").style.display = "block";
    searchEl = document.getElementById("search");
    var searchName = searchEl.value;
    document.getElementById("smovie").textContent = searchName;
    console.log(searchName);
  }
  
  function dropFunction(id) {
    if (id == 'mrate') {
      document.getElementById("text").innerHTML = "My Ratings";
    }
    else if (id == 'frate') {
      document.getElementById("text").innerHTML = "Friend Ratings";
    }
    else if (id == 'arate') {
      document.getElementById("text").innerHTML = "All User Ratings";
    }
    document.getElementById("ratings").style.display = "block";
  }

