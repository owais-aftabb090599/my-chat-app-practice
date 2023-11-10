const registerForm = document.getElementById("registerForm");
const alerts = document.getElementById("alerts");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = {
    name: registerForm.name.value,
    email: registerForm.email.value,
    password: registerForm.password.value,
  };
  fetch(`http://localhost:8000/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      if (result.errors) {
        const errors = result.errors;
        let html = "";
        errors.forEach((error) => {
          html += `
            <div class="alert alert-danger" role="alert">
                 ${error.message}
            </div>`;
        });
        alerts.innerHTML = html;
        setTimeout(() => {
          alerts.innerHTML = "";
        }, 3000);
      }
      if (result.success) {
        alerts.innerHTML = `
          <div class="alert alert-success" role="alert">
             ${result.message}
          </div>`;
        registerForm.name.value = "";
        registerForm.email.value = "";
        registerForm.password.value = "";
        setTimeout(() => {
          alerts.innerHTML = "";
          window.location.href = "/login";
        }, 3000);
      }
    })
    .catch((error) => console.log(error));
});
