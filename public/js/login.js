const loginForm = document.getElementById("loginForm");
const alerts = document.getElementById("alerts");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = {
    email: loginForm.email.value,
    password: loginForm.password.value,
  };
  fetch(`http://localhost:8000/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      if (!result.success) {
        alerts.innerHTML = `
      <div class="alert alert-danger" role="alert">
        ${result.message}
      </div>`;
        setTimeout(() => {
          alerts.innerHTML = "";
        }, 3000);
      }
      if (result.success) {
        alerts.innerHTML = `
      <div class="alert alert-success" role="alert">
        ${result.message}
      </div>`;
      loginForm.email.value = "";
      loginForm.password.value = "";
        setTimeout(() => {
          alerts.innerHTML = "";
          window.location.href = "/";
        }, 3000);
      }
    })
    .catch((error) => console.log(error));
});
