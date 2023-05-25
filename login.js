function login() {
    const nameEl = document.querySelector("#name");
    const passwordEl = document.querySelector("#password");
    localStorage.setItem("userName", nameEl.value);
    localStorage.setItem("password", passwordEl.value);
    verifyUser(nameEl, passwordEl);
    window.location.href = "home.html";
  }

  function register() {
    const nameEl = document.querySelector("#name");
    const passwordEl = document.querySelector("#password");
    localStorage.setItem("userName", nameEl.value);
    localStorage.setItem("password", passwordEl.value);
    createUser(nameEl, passwordEl);
    window.location.href = "home.html";
  }