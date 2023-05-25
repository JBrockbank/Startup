function myFunction() {
    document.getElementById("stable").style.display = "block";
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