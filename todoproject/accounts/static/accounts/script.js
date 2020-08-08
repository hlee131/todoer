document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementsByTagName("form")[0]
    .setAttribute("action", window.location.href);

  document.getElementById("show-password").checked = false;
});

function onChange() {
  let newAttr =
    document.getElementById("password-again").getAttribute("type") ===
    "password"
      ? "text"
      : "password";
  document.getElementById("password-again").setAttribute("type", newAttr);
}

function onSubmit(e) {
  //   Form validation
  let firstPassword = document.getElementById("password").value;
  let secondPassword = document.getElementById("password-again").value;
  if (firstPassword !== secondPassword) {
    alert("Passwords must match");
    return false;
  }
}
